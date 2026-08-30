import Link from "next/link";
import { VendorCard } from "@/components/vendor-card";
import {
  categories,
  categoryMeta,
  heroStats,
  howItWorks,
  seedVendors
} from "@/lib/data";

const heroSuggestions = [
  "Find a laundry service",
  "Looking for tiffin?",
  "Need a cleaner?",
  "Home repair near me"
];

const featuredVendors = seedVendors.slice(0, 6).map((vendor, index) => ({
  ...vendor,
  id: index + 1,
  slug: `${vendor.name}-${vendor.category}-${vendor.area}`.toLowerCase()
}));

export default function HomePage() {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-dark">Built for bachelor life</span>
          <h1>
            Life gets
            <span className="accent-line">easier</span>
            when you&apos;ve got the right help.
          </h1>
          <p className="hero-lead">
            From laundry and tiffin to cleaning and quick home repairs — find reliable local
            help without the usual hassle.
          </p>
          <form className="hero-search" action="/services">
            <label className="sr-only" htmlFor="hero-search">
              Search services
            </label>
            <input
              id="hero-search"
              className="field field-dark hero-field"
              name="q"
              type="search"
              placeholder="Search services, vendors, or categories..."
              defaultValue=""
            />
            <button className="button primary button-yellow" type="submit">
              Search services
            </button>
          </form>
          <div className="search-chips" aria-label="Search suggestions">
            {heroSuggestions.map((item) => (
              <Link
                className="chip chip-dark"
                href={`/services?q=${encodeURIComponent(item)}`}
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="trust-row" aria-label="Trust highlights">
            <span className="trust-pill">Verified vendors</span>
            <span className="trust-pill">Quick responses</span>
            <span className="trust-pill">Fair pricing</span>
            <span className="trust-pill">Local support</span>
          </div>
          <div className="hero-metrics">
            {heroStats.map((item) => (
              <div className="metric metric-dark" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-aside">
          <div className="hero-visual">
            <div className="hero-glow hero-glow-one" aria-hidden="true" />
            <div className="hero-glow hero-glow-two" aria-hidden="true" />
            <div className="hero-lifestyle">
              <div className="hero-lifestyle-main">
                <img
                  src="/images/laundry.png"
                  alt="Laundry service illustration"
                  className="hero-lifestyle-image hero-lifestyle-image-large"
                />
              </div>
              <div className="hero-lifestyle-stack">
                <img
                  src="/images/tiffin.png"
                  alt="Tiffin service illustration"
                  className="hero-lifestyle-image"
                />
                <img
                  src="/images/electrician.png"
                  alt="Electrician service illustration"
                  className="hero-lifestyle-image"
                />
              </div>
            </div>
            <div className="hero-floatcard">
              <div>
                <span className="mini">Today at a glance</span>
                <strong>{seedVendors.length} vendors listed</strong>
              </div>
              <div>
                <span className="mini">Average rating</span>
                <strong>4.7/5</strong>
              </div>
            </div>
          </div>
          <div className="hero-mini-grid">
            {categories.map((category) => {
              const meta = categoryMeta[category];

              return (
                <Link className="mini-category-card" href={`/services?category=${category}`} key={category}>
                  <span className="mini-category-icon" aria-hidden="true">
                    {meta.icon}
                  </span>
                  <span>
                    <strong>{category}</strong>
                    <small>{meta.descriptor}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="section section-dark">
        <div className="section-header">
          <div>
            <h2 className="section-title">Popular services near you</h2>
            <p className="section-subtitle">
              Real vendor cards from the marketplace, grouped by the services bachelors ask for
              most often.
            </p>
          </div>
          <Link className="section-link" href="/services">
            View all services
          </Link>
        </div>
        <div className="featured-grid">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.slug} vendor={vendor} ctaLabel="Enquire now" />
          ))}
        </div>
      </section>

      <section className="section section-dark" aria-label="Browse by category">
        <div className="section-header">
          <div>
            <h2 className="section-title">Browse by category</h2>
            <p className="section-subtitle">
              A faster way to jump into the right service filter and narrow down local options.
            </p>
          </div>
        </div>
        <div className="category-grid category-grid-home">
          {categories.map((item) => (
            <Link className="category-tile category-tile-home" href={`/services?category=${item}`} key={item}>
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
      </section>

      <section className="section section-dark" id="how-it-works">
        <div className="section-header section-header-center">
          <div>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Three simple steps from search to enquiry to getting the work done.
            </p>
          </div>
        </div>
        <div className="steps-grid">
          {howItWorks.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark" id="about-us">
        <div className="about-cta">
          <div className="about-copy">
            <span className="eyebrow eyebrow-dark">About us</span>
            <h2>Life gets easier with the right help.</h2>
            <p>
              Bachelor Buddy is built to help bachelors find reliable local help without
              hunting through cluttered listings. It stays focused on trusted vendors,
              transparent pricing, and a quick enquiry flow.
            </p>
          </div>
          <div className="about-art" aria-hidden="true">
            <div className="about-art-card">
              <img src="/images/cleaning.png" alt="" />
              <span>Clean spaces</span>
            </div>
            <div className="about-art-stack">
              <div className="about-art-card">
                <img src="/images/tiffin.png" alt="" />
                <span>Daily meals</span>
              </div>
              <div className="about-art-card">
                <img src="/images/plumber.png" alt="" />
                <span>Quick fixes</span>
              </div>
            </div>
          </div>
          <Link className="button primary button-yellow about-button" href="/services#enquiry-form">
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  );
}
