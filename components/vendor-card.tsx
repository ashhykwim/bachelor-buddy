import Link from "next/link";
import type { Vendor } from "@/lib/data";
import { categoryMeta } from "@/lib/data";

type VendorCardProps = {
  vendor: Vendor;
  ctaLabel?: string;
};

export function VendorCard({ vendor, ctaLabel = "Enquire now" }: VendorCardProps) {
  const meta = categoryMeta[vendor.category];

  return (
    <article className="listing-card">
      <div className="listing-media">
        <img
          src={meta.image}
          alt={`${vendor.category} service illustration for ${vendor.name}`}
          className="listing-image"
          loading="lazy"
        />
        <div className="listing-media-chip">
          <span className="listing-emoji" aria-hidden="true">
            {meta.icon}
          </span>
          <span>{vendor.category}</span>
        </div>
      </div>

      <div className="listing-content">
        <div className="listing-top">
          <div>
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
        </Link>
      </div>
    </article>
  );
}
