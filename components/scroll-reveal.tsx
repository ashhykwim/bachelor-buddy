"use client";

import { useEffect } from "react";

/**
 * Mounted once in the root layout. A single IntersectionObserver drives every
 * `[data-reveal]` element on the page — no per-section client component and no
 * scroll event handlers.
 *
 * A MutationObserver picks up elements added by client-side navigation (e.g.
 * filtering on /services), so reveals keep working without re-running on every
 * route change.
 *
 * Elements are hidden by CSS only while `data-reveal-active` is set on <html>,
 * which happens here. Without JS — or with reduced motion — nothing is hidden.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    root.dataset.revealActive = "true";

    const tracked = new WeakSet<Element>();

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            intersectionObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    function scan() {
      for (const element of document.querySelectorAll("[data-reveal]")) {
        if (tracked.has(element)) {
          continue;
        }

        tracked.add(element);

        // Anything already on screen reveals right away, so the first viewport
        // never waits on a scroll that may never happen.
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
          element.classList.add("is-revealed");
        } else {
          intersectionObserver.observe(element);
        }
      }
    }

    scan();

    let frame = 0;
    const mutationObserver = new MutationObserver(() => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
      delete root.dataset.revealActive;
    };
  }, []);

  return null;
}
