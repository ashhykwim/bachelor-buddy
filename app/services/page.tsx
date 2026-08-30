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

  return (
    <>
      <section className="section section-dark">
        <div className="services-hero">
          <div>
            <span className="eyebrow eyebrow-dark">Marketplace search</span>
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

        <ServiceFilters />

        <div className="category-grid category-grid-services">
          {categories.map((item) => (
            <span className="category-tile category-tile-dark" key={item}>
              <span className="category-icon" aria-hidden="true">
                {categoryMeta[item].icon}
              </span>
              <span>
                <strong>{item}</strong>
                <small>{categoryMeta[item].descriptor}</small>
              </span>
            </span>
          ))}
        </div>

        <div className="services-grid">
          {vendors.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">⌕</div>
              <h3>No matches found</h3>
              <p className="mini">
                Try another locality, remove the category filter, or search with a simpler
                keyword.
              </p>
            </div>
          ) : (
            vendors.map((vendor) => <VendorCard key={vendor.slug} vendor={vendor} />)
          )}
        </div>
      </section>

      <section className="section section-dark split-layout" id="enquiry-form">
        <div className="form-card form-card-dark">
          <h2 className="section-heading">Send an enquiry</h2>
          <p className="section-subtitle">
            Accessible, validated, and persistence-backed without adding account complexity.
          </p>
          <RequestForm defaultCategory={params.category} />
        </div>

        <div className="stat-card stat-card-dark">
          <h2 className="section-heading">Recent requests</h2>
          <p className="section-subtitle">
            Recent enquiries stored in SQLite or Turso.
          </p>
          <div className="stack stack-dark" style={{ marginTop: 16 }}>
            {requests.length === 0 ? (
              <div className="notice notice-dark">No enquiries yet. Submit one from the form.</div>
            ) : (
              requests.slice(0, 5).map((request) => (
                <div key={request.id} className="request-item request-item-dark">
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
