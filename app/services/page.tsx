import Link from "next/link";
import type { CSSProperties } from "react";
import { VendorCard } from "@/components/vendor-card";
import { RequestForm } from "@/components/request-form";
import { ServiceFilters } from "@/components/service-filters";
import { categories, categoryMeta } from "@/lib/data";
import { getServiceRequests, getVendorStats, getVendors } from "@/lib/db";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function ServicesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [vendors, stats, requests] = await Promise.all([
    getVendors({ q: params.q, category: params.category }),
    getVendorStats(),
    getServiceRequests()
  ]);

  const activeCategory = params.category?.trim() ?? "";

  return (
    <>
      <section className="section section-dark">
        <div className="services-hero">
          <div>
            <span className="eyebrow">Marketplace search</span>
            <h1 className="section-title">Browse trusted local help.</h1>
            <p className="section-subtitle">
              Search by keyword, category, or locality. Compare vendors by price, rating,
              response time, and service tags before sending an enquiry.
            </p>
          </div>
          <div className="stats-panel">
            <div className="stats-item">
              <strong>{stats.totalVendors}</strong>
              <span>vendors listed</span>
            </div>
            <div className="stats-item">
              <strong>{stats.totalRequests}</strong>
              <span>enquiries saved</span>
            </div>
          </div>
        </div>

        {/* Remount on navigation so the inputs always mirror the active URL filters. */}
        <ServiceFilters key={`${params.q ?? ""}|${params.category ?? ""}`} />

        <div className="category-grid category-grid-services">
          {categories.map((item, index) => (
            <Link
              className={`category-tile category-tile-dark${
                activeCategory === item ? " is-active" : ""
              }`}
              href={`/services?category=${encodeURIComponent(item)}`}
              key={item}
              aria-current={activeCategory === item ? "true" : undefined}
              data-reveal
              style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}
            >
              <span className="category-icon" aria-hidden="true">
                {categoryMeta[item].icon}
              </span>
              <span>
                <strong>{item}</strong>
                <small>{categoryMeta[item].descriptor}</small>
              </span>
            </Link>
          ))}
        </div>

        <p className="results-count" role="status">
          {vendors.length === 0
            ? "No vendors match the current filters."
            : `Showing ${vendors.length} ${vendors.length === 1 ? "vendor" : "vendors"}`}
          {activeCategory ? ` in ${activeCategory}` : ""}
          {params.q?.trim() ? ` for “${params.q.trim()}”` : ""}.
        </p>

        <div className="services-grid">
          {vendors.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon" aria-hidden="true">
                ⌕
              </div>
              <h2>No matches found</h2>
              <p className="mini">
                Try another locality, remove the category filter, or search with a simpler
                keyword.
              </p>
              <Link className="button secondary empty-state-cta" href="/services">
                Reset filters
              </Link>
            </div>
          ) : (
            vendors.map((vendor, index) => (
              <VendorCard key={vendor.slug} vendor={vendor} index={index} />
            ))
          )}
        </div>
      </section>

      <section className="section section-dark split-layout" id="enquiry-form">
        <div className="form-card form-card-dark" data-reveal>
          <h2 className="section-heading">Send an enquiry</h2>
          <p className="section-subtitle">
            Tell us what you need and the right vendor follows up — no account required.
          </p>
          <RequestForm key={params.category ?? ""} defaultCategory={params.category} />
        </div>

        <div className="stat-card stat-card-dark" data-reveal style={{ "--reveal-delay": "90ms" } as CSSProperties}>
          <h2 className="section-heading">Recent requests</h2>
          <p className="section-subtitle">Enquiries saved to the database.</p>
          <div className="stack request-feed">
            {requests.length === 0 ? (
              <div className="notice notice-dark">No enquiries yet. Submit one from the form.</div>
            ) : (
              requests.slice(0, 5).map((request) => (
                <div key={request.id} className="request-item">
                  <strong>{request.name}</strong>
                  <div className="mini">
                    {request.category} · {request.area}
                  </div>
                  <p className="mini">{request.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
