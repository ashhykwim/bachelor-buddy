import { createClient, type Client } from "@libsql/client";
import { categories, seedVendors, type ServiceRequest, type Vendor } from "./data";

let client: Client | null = null;
let schemaReady = false;

function getDatabaseUrl() {
  return (
    process.env.TURSO_DATABASE_URL ??
    process.env.DATABASE_URL ??
    "file:./data/bachelor-buddy.sqlite"
  );
}

function getDatabaseToken() {
  return process.env.TURSO_AUTH_TOKEN ?? process.env.DATABASE_AUTH_TOKEN ?? undefined;
}

function normalizeCategory(value: string) {
  const trimmed = value.trim().toLowerCase();
  const match = categories.find((category) => category.toLowerCase() === trimmed);
  return match ?? value.trim();
}

function createVendorSlug(input: { name: string; category: string; area: string }) {
  return [input.name, input.category, input.area]
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join("-");
}

function parseTags(value: unknown) {
  if (typeof value !== "string" || value.trim() === "") {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === "string") : [];
  } catch {
    return [];
  }
}

function getClient() {
  if (!client) {
    client = createClient({
      url: getDatabaseUrl(),
      authToken: getDatabaseToken()
    });
  }

  return client;
}

async function ensureSchema() {
  if (schemaReady) {
    return;
  }

  const db = getClient();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      area TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      rating REAL NOT NULL,
      response_time TEXT NOT NULL,
      tags TEXT NOT NULL
    )
  `);

  const vendorColumns = await db.execute(`PRAGMA table_info(vendors)`);
  const hasSlugColumn = vendorColumns.rows.some((row) => String(row.name) === "slug");

  if (!hasSlugColumn) {
    await db.execute(`ALTER TABLE vendors ADD COLUMN slug TEXT`);
  }

  await db.execute(`
    UPDATE vendors
    SET slug = LOWER(
      REPLACE(
        REPLACE(
          REPLACE(TRIM(name) || '-' || TRIM(category) || '-' || TRIM(area), ' ', '-'),
          '/',
          '-'
        ),
        ',',
        ''
      )
    )
    WHERE slug IS NULL OR TRIM(slug) = ''
  `);

  await db.execute(`
    DELETE FROM vendors
    WHERE id NOT IN (
      SELECT MIN(id)
      FROM vendors
      GROUP BY slug
    )
  `);

  await db.execute(`CREATE UNIQUE INDEX IF NOT EXISTS idx_vendors_slug ON vendors(slug)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_vendors_area ON vendors(area)`);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT NOT NULL,
      area TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  for (const vendor of seedVendors) {
    const category = normalizeCategory(vendor.category);
    const slug = createVendorSlug({
      name: vendor.name,
      category,
      area: vendor.area
    });

    await db.execute({
      sql: `
        INSERT OR IGNORE INTO vendors (slug, name, category, area, description, price, rating, response_time, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        slug,
        vendor.name,
        category,
        vendor.area,
        vendor.description,
        vendor.price,
        vendor.rating,
        vendor.responseTime,
        JSON.stringify(vendor.tags)
      ]
    });
  }

  schemaReady = true;
}

export async function getVendors(options?: { q?: string; category?: string }) {
  await ensureSchema();
  const db = getClient();
  const conditions: string[] = [];
  const args: Array<string | number> = [];

  if (options?.category) {
    conditions.push("category = ?");
    args.push(normalizeCategory(options.category));
  }

  if (options?.q?.trim()) {
    const query = `%${options.q.trim().toLowerCase()}%`;
    conditions.push(
      "(LOWER(name) LIKE ? OR LOWER(area) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)"
    );
    args.push(query, query, query, query);
  }

  const sql = `
    SELECT id, slug, name, category, area, description, price, rating, response_time, tags
    FROM vendors
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""}
    ORDER BY rating DESC, response_time ASC, name ASC
  `;

  const result = await db.execute({ sql, args });

  return result.rows
    .map((row) => ({
      id: Number(row.id),
      slug: String(row.slug ?? createVendorSlug({
        name: String(row.name),
        category: String(row.category),
        area: String(row.area)
      })),
      name: String(row.name),
      category: normalizeCategory(String(row.category)) as Vendor["category"],
      area: String(row.area),
      description: String(row.description),
      price: String(row.price),
      rating: Number(row.rating),
      responseTime: String(row.response_time),
      tags: parseTags(row.tags)
    }))
    .filter((vendor): vendor is Vendor => Boolean(vendor.name && vendor.category && vendor.area));
}

export async function getVendorStats() {
  await ensureSchema();
  const db = getClient();

  const [vendorCountResult, requestCountResult, categoryRowsResult] = await Promise.all([
    db.execute("SELECT COUNT(*) AS count FROM vendors"),
    db.execute("SELECT COUNT(*) AS count FROM service_requests"),
    db.execute(`
      SELECT category, COUNT(*) as count
      FROM vendors
      GROUP BY category
      ORDER BY category ASC
    `)
  ]);

  return {
    totalVendors: Number(vendorCountResult.rows[0]?.count ?? 0),
    totalRequests: Number(requestCountResult.rows[0]?.count ?? 0),
    categoryCounts: categoryRowsResult.rows.map((row) => ({
      category: String(row.category),
      count: Number(row.count)
    }))
  };
}

export async function createServiceRequest(input: {
  name: string;
  phone: string;
  category: string;
  area: string;
  message: string;
}) {
  await ensureSchema();
  const db = getClient();
  const category = normalizeCategory(input.category);

  try {
    const result = await db.execute({
      sql: `
        INSERT INTO service_requests (name, phone, category, area, message)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [input.name, input.phone, category, input.area, input.message]
    });

    return {
      id: Number(result.lastInsertRowid ?? 0),
      name: input.name,
      phone: input.phone,
      category,
      area: input.area,
      message: input.message,
      createdAt: new Date().toISOString()
    } satisfies ServiceRequest;
  } catch (error) {
    console.error("Failed to create service request", error);
    throw new Error("Unable to save enquiry right now.");
  }
}

export async function getServiceRequests() {
  await ensureSchema();
  const db = getClient();
  const result = await db.execute(`
    SELECT id, name, phone, category, area, message, created_at
    FROM service_requests
    ORDER BY id DESC
  `);

  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    phone: String(row.phone),
    category: String(row.category),
    area: String(row.area),
    message: String(row.message),
    createdAt: String(row.created_at)
  })) satisfies ServiceRequest[];
}

export function getCategories() {
  return categories;
}
