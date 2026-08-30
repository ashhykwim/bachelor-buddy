import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bachelor Buddy | Local Services Marketplace",
  description:
    "A local services marketplace for bachelors. Search laundry, tiffin, househelp, cleaning, and small repairs in one place."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell shell-dark">
          <header className="site-header">
            <div className="topbar site-inner">
              <Link href="/" className="brand brand-dark" aria-label="Bachelor Buddy home">
                <span className="brand-badge">BB</span>
                <span>
                  Bachelor Buddy
                  <br />
                  <span className="mini">Trusted local services marketplace</span>
                </span>
              </Link>
              <nav className="nav nav-dark" aria-label="Primary navigation">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <a href="/#how-it-works">How it works</a>
                <a href="/#about-us">About us</a>
              </nav>
              <Link className="button primary header-cta" href="/services#enquiry-form">
                Enquire Now
              </Link>
            </div>
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <div className="site-inner footer-grid">
              <div>
                <Link href="/" className="brand brand-dark footer-brand">
                  <span className="brand-badge">BB</span>
                  <span>
                    Bachelor Buddy
                    <br />
                    <span className="mini">Trusted local services marketplace</span>
                  </span>
                </Link>
                <p className="footer-copy">
                  A focused marketplace for bachelors to find trusted local help fast, compare
                  options clearly, and send a simple enquiry.
                </p>
              </div>
              <div>
                <h3 className="footer-title">Quick links</h3>
                <div className="footer-links">
                  <a href="/">Home</a>
                  <a href="/services">Services</a>
                  <a href="/#how-it-works">How it works</a>
                  <a href="/#about-us">About us</a>
                </div>
              </div>
              <div>
                <h3 className="footer-title">Services</h3>
                <div className="footer-links">
                  <a href="/services?category=Laundry">Laundry</a>
                  <a href="/services?category=Tiffin">Tiffin</a>
                  <a href="/services?category=Cleaning">Cleaning</a>
                  <a href="/services?category=Electrician">Electrician</a>
                  <a href="/services?category=Plumber">Plumber</a>
                  <a href="/services?category=Househelp">Househelp</a>
                </div>
              </div>
              <div>
                <h3 className="footer-title">Vendor links</h3>
                <div className="footer-links">
                  <a href="/services#enquiry-form">List your service</a>
                  <a href="/services#enquiry-form">Vendor enquiry</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
