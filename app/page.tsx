import Link from "next/link";
import { VendorCard } from "@/components/vendor-card";
import {
  categories,
  categoryMeta,
  heroStats,
  howItWorks,
  popularSearches,
  seedVendors
} from "@/lib/data";

const featuredVendors = seedVendors.slice(0, 6).map((vendor, index) => ({
  ...vendor,
  id: index + 1,
  slug: `${vendor.name}-${vendor.category}-${vendor.area}`.toLowerCase()
}));

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="card hero-copy">
          <span className="eyebrow">Bengaluru local services marketplace</span>
          <h1>Find trusted local help, without the hassle.</h1>
          <p>
            Compare nearby vendors for laundry, tiffin, cleaning, and home repairs. Built
            for bachelors moving into a new city and for small vendors who want direct
            enquiries.
          </p>
          <form className="hero-search" action="/services">
            <label className="sr-only" htmlFor="hero-search">
              Search services
            </label>
            <input
              id="hero-search"
              className="field hero-field"
              name="q"
              type="search"
              placeholder="Search laundry, tiffin, electrician..."
              defaultValue=""
            />
            <button className="button primary" type="submit">
              Search services
            </button>
          </form>
          <div className="search-chips" aria-label="Popular searches">
            {popularSearches.map((item) => (
              <Link className="chip" href={`/services?q=${encodeURIComponent(item)}`} key={item}>
                {item}
              </Link>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="button primary" href="/services">
              Browse marketplace
            </Link>
            <a className="button secondary" href="#vendor-cta">
              List your service
            </a>
          </div>
          <div className="hero-metrics">
            {heroStats.map((item) => (
              <div className="metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-aside">
          <div className="hero-gallery">
            <div className="hero-gallery-main">
              <img
                src="/images/cleaning.svg"
                alt="Cleaning service illustration"
                className="hero-gallery-image"
              />
            </div>
            <div className="hero-gallery-stack">
              <img
                src="/images/tiffin.svg"
                alt="Tiffin service illustration"
                className="hero-gallery-image"
              />
              <img
                src="/images/laundry.svg"
                alt="Laundry service illustration"
                className="hero-gallery-image"
              />
            </div>
          </div>
          <div className="panel hero-note">
            <h3>Popular near you</h3>
            <p>
              Shortlist common residential services in Koramangala, HSR Layout, Indiranagar,
              Whitefield, and Bellandur.
            </p>
            <div className="hero-category-strip">
              {categories.map((category) => {
                const meta = categoryMeta[category];

                return (
                  <Link className="hero-category-pill" href="/services" key={category}>
                    <span aria-hidden="true">{meta.icon}</span>
                    <span>
                      <strong>{category}</strong>
                      <small>{meta.descriptor}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Popular near you.</h2>
            <p className="section-subtitle">
              Real vendor cards from the marketplace data, shown with category imagery.
            </p>
          </div>
        </div>
        <div className="featured-grid">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.slug} vendor={vendor} ctaLabel="View in services" />
          ))}
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="section-header">
          <div>
            <h2 className="section-title">How it works.</h2>
            <p className="section-subtitle">
              The flow stays short so the app reads like a real marketplace instead of a
              product demo.
            </p>
          </div>
        </div>
        <div className="grid features">
          {howItWorks.map((step, index) => (
            <div className="feature-card" key={step.title}>
              <span className="badge">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="vendor-cta">
        <div className="section-header">
          <div>
            <h2 className="section-title">For vendors too.</h2>
            <p className="section-subtitle">
              Small businesses get a clean listing surface and direct enquiries from people
              already looking for the service.
            </p>
          </div>
          <Link className="button secondary" href="/services">
            See listings
          </Link>
        </div>
        <div className="callout">
          <div>
            <h3>List a local service, get found faster.</h3>
            <p>
              The design is intentionally simple: one marketplace, one enquiry flow, one
              reliable data layer.
            </p>
          </div>
          <Link className="button primary" href="/services">
            Open services
          </Link>
        </div>
      </section>
    </>
  );
}
