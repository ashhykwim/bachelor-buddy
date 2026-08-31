import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bachelor Buddy | Local Services Marketplace",
  description:
    "A local services marketplace for bachelors. Search laundry, tiffin, househelp, cleaning, and small repairs in one place."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070b18"
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#about-us", label: "About us" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="shell shell-dark">
          <header className="site-header">
            <div className="topbar site-inner">
              <Link href="/" className="brand brand-dark" aria-label="Bachelor Buddy home">
                <span className="brand-badge" aria-hidden="true">
                  BB
                </span>
                <span className="brand-text">
                  Bachelor Buddy
                  <span className="mini brand-tagline">Trusted local services marketplace</span>
                </span>
              </Link>
              <nav className="nav" aria-label="Primary">
                {navLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link className="button primary header-cta" href="/services#enquiry-form">
                Enquire Now
              </Link>
            </div>
          </header>
          <main className="site-main" id="main-content">
            {children}
          </main>
          <footer className="site-footer">
            <div className="site-inner footer-grid">
              <div>
                <Link href="/" className="brand brand-dark footer-brand">
                  <span className="brand-badge" aria-hidden="true">
                    BB
                  </span>
                  <span className="brand-text">
                    Bachelor Buddy
                    <span className="mini brand-tagline">Trusted local services marketplace</span>
                  </span>
                </Link>
                <p className="footer-copy">
                  A focused marketplace for bachelors to find trusted local help fast, compare
                  options clearly, and send a simple enquiry.
                </p>
              </div>
              <div>
                <h2 className="footer-title">Quick links</h2>
                <nav className="footer-links" aria-label="Footer">
                  {navLinks.map((link) => (
                    <Link href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <h2 className="footer-title">Services</h2>
                <nav className="footer-links" aria-label="Service categories">
                  <Link href="/services?category=Laundry">Laundry</Link>
                  <Link href="/services?category=Tiffin">Tiffin</Link>
                  <Link href="/services?category=Cleaning">Cleaning</Link>
                  <Link href="/services?category=Electrician">Electrician</Link>
                  <Link href="/services?category=Plumber">Plumber</Link>
                  <Link href="/services?category=Househelp">Househelp</Link>
                </nav>
              </div>
              <div>
                <h2 className="footer-title">Vendor links</h2>
                <nav className="footer-links" aria-label="Vendor">
                  <Link href="/services#enquiry-form">List your service</Link>
                  <Link href="/services#enquiry-form">Vendor enquiry</Link>
                </nav>
              </div>
            </div>
          </footer>
        </div>
        <ScrollReveal />
      </body>
    </html>
  );
}
