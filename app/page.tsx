import Link from "next/link";
import type { CSSProperties } from "react";
import { VendorCard } from "@/components/vendor-card";
import {
  categories,
  categoryImageSize,
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

/**
 * Each hero image plays a distinct role: one wide anchor shot plus two
 * supporting tiles, all from different categories.
 */
const heroImages = [
  { category: "Laundry", className: "hero-tile hero-tile-wide", priority: true },
  { category: "Tiffin", className: "hero-tile", priority: false },
  { category: "Electrician", className: "hero-tile", priority: false }
] as const;

const featuredVendors = seedVendors.slice(0, 6).map((vendor, index) => ({
  ...vendor,
  id: index + 1,
  slug: `${vendor.name}-${vendor.category}-${vendor.area}`.toLowerCase()
}));

function delay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}

export default function HomePage() {
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-copy">
          <span className="eyebrow hero-enter" style={delay(0)}>
            Built for bachelor life
          </span>
          <h1 className="hero-enter" style={delay(60)}>
            Life gets
            <span className="accent-line">easier</span>
            when you&apos;ve got the right help.
          </h1>
          <p className="hero-lead hero-enter" style={delay(120)}>
            From laundry and tiffin to cleaning and quick home repairs — find reliable local
            help without the usual hassle.
          </p>
          <form className="hero-search hero-enter" action="/services" style={delay(180)}>
            <label className="sr-only" htmlFor="hero-search">
              Search services
            </label>
            <input
              id="hero-search"
              className="field field-dark"
              name="q"
              type="search"
              placeholder="Search services, vendors, or categories..."
              defaultValue=""
            />
            <button className="button primary" type="submit">
              Search services
            </button>
          </form>
          <div className="search-chips hero-enter" aria-label="Search suggestions" style={delay(240)}>
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
          <div className="trust-row hero-enter" aria-label="Trust highlights" style={delay(300)}>
            <span className="trust-pill">Verified vendors</span>
            <span className="trust-pill">Quick responses</span>
            <span className="trust-pill">Fair pricing</span>
            <span className="trust-pill">Local support</span>
          </div>
          <div className="hero-metrics hero-enter" style={delay(360)}>
            {heroStats.map((item) => (
              <div className="metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero-aside">
          <div className="hero-visual hero-enter" style={delay(220)}>
            <div className="hero-glow hero-glow-one" aria-hidden="true" />
            <div className="hero-glow hero-glow-two" aria-hidden="true" />
            <div className="hero-mosaic">
              {heroImages.map(({ category, className, priority }) => {
                const meta = categoryMeta[category];

                return (
                  <figure className={className} key={category}>
                    <img
                      src={meta.image}
                      alt={meta.imageAlt}
                      className="hero-tile-image"
                      width={categoryImageSize.width}
                      height={categoryImageSize.height}
                      decoding="async"
                      {...(priority
                        ? { fetchPriority: "high" as const }
                        : { loading: "lazy" as const })}
                    />
                    <figcaption className="hero-tile-label">
                      <span aria-hidden="true">{meta.icon}</span>
                      {category}
                    </figcaption>
                  </figure>
                );
              })}
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
          <div className="hero-mini-grid hero-enter" style={delay(300)}>
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
        <div className="section-header" data-reveal>
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
          {featuredVendors.map((vendor, index) => (
            <VendorCard key={vendor.slug} vendor={vendor} index={index} ctaLabel="Enquire now" />
          ))}
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="browse-heading">
        <div className="section-header" data-reveal>
          <div>
            <h2 className="section-title" id="browse-heading">
              Browse by category
            </h2>
            <p className="section-subtitle">
              A faster way to jump into the right service filter and narrow down local options.
            </p>
          </div>
        </div>
        <div className="category-grid category-grid-home">
          {categories.map((item, index) => (
            <Link
              className="category-tile category-tile-dark"
              href={`/services?category=${item}`}
              key={item}
              data-reveal
              style={delay(index * 60)}
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
      </section>

      <section className="section section-dark" id="how-it-works">
        <div className="section-header section-header-center" data-reveal>
          <div>
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Three simple steps from search to enquiry to getting the work done.
            </p>
          </div>
        </div>
        <div className="steps-grid">
          {howItWorks.map((step, index) => (
            <div className="step-card" key={step.title} data-reveal style={delay(index * 110)}>
              <span className="step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark" id="about-us">
        <div className="about-cta" data-reveal>
          <div className="about-copy">
            <span className="eyebrow">About us</span>
            <h2>Life gets easier with the right help.</h2>
            <p>
              Bachelor Buddy is built to help bachelors find reliable local help without
              hunting through cluttered listings. It stays focused on trusted vendors,
              transparent pricing, and a quick enquiry flow.
            </p>
            <Link className="button primary about-button" href="/services#enquiry-form">
              Enquire Now
            </Link>
          </div>
          <div className="about-art">
            <figure className="about-art-card">
              <img
                src={categoryMeta.Cleaning.image}
                alt={categoryMeta.Cleaning.imageAlt}
                width={categoryImageSize.width}
                height={categoryImageSize.height}
                loading="lazy"
                decoding="async"
              />
              <figcaption>Clean spaces</figcaption>
            </figure>
            <div className="about-art-stack">
              <figure className="about-art-card">
                <img
                  src={categoryMeta.Tiffin.image}
                  alt={categoryMeta.Tiffin.imageAlt}
                  width={categoryImageSize.width}
                  height={categoryImageSize.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Daily meals</figcaption>
              </figure>
              <figure className="about-art-card">
                <img
                  src={categoryMeta.Plumber.image}
                  alt={categoryMeta.Plumber.imageAlt}
                  width={categoryImageSize.width}
                  height={categoryImageSize.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Quick fixes</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
