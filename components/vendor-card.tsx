import Link from "next/link";
import type { CSSProperties } from "react";
import type { Vendor } from "@/lib/data";
import { categoryImageSize, categoryMeta } from "@/lib/data";

type VendorCardProps = {
  vendor: Vendor;
  ctaLabel?: string;
  /** Position in its grid, used only to stagger the scroll-reveal animation. */
  index?: number;
};

export function VendorCard({ vendor, ctaLabel = "Enquire now", index = 0 }: VendorCardProps) {
  const meta = categoryMeta[vendor.category];

  return (
    <article
      className="listing-card"
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index, 5) * 70}ms` } as CSSProperties}
    >
      <div className="listing-media">
        <img
          src={meta.image}
          alt={meta.imageAlt}
          className="listing-image"
          width={categoryImageSize.width}
          height={categoryImageSize.height}
          loading="lazy"
          decoding="async"
        />
        <div className="listing-media-chip">
          <span  aria-hidden="true">
            {meta.icon}
          </span>
          <span>{vendor.category}</span>
        </div>
      </div>

      <div className="listing-content">
        <div className="listing-top">
          <div className="listing-identity">
            <strong>{vendor.name}</strong>
            <div className="mini vendor-subtitle">
              {vendor.category} · {vendor.area}
            </div>
          </div>
          <div className="price">{vendor.price}</div>
        </div>

        <p className="mini listing-description">{vendor.description}</p>

        <div className="vendor-metrics">
          <span>Rating {vendor.rating.toFixed(1)}</span>
          <span>Reply in {vendor.responseTime}</span>
          <span>{vendor.area}</span>
        </div>

        <div className="tag-list">
          {vendor.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <Link
          className="button primary listing-cta"
          href={`/services?category=${encodeURIComponent(vendor.category)}#enquiry-form`}
        >
          {ctaLabel}
          <span className="sr-only"> about {vendor.name}</span>
        </Link>
      </div>
    </article>
  );
}
