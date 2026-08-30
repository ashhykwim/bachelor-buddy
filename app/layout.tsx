import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bachelor Buddy | Local Services Marketplace",
  description:
    "A local services marketplace for bachelors in Bengaluru. Search laundry, tiffin, househelp, cleaning, and small repairs in one place."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <main>
            <div className="topbar">
              <Link href="/" className="brand" aria-label="Bachelor Buddy home">
                <span className="brand-badge">BB</span>
                <span>
                  Bachelor Buddy
                  <br />
                  <span className="mini">Bengaluru local services marketplace</span>
                </span>
              </Link>
              <nav className="nav">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
              </nav>
            </div>
            {children}
            <footer className="footer">
              Built for interview demos. Clean, local-first, and deployable on Vercel or Docker.
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}
