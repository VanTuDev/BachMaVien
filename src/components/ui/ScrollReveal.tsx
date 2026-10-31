"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/** Elements that fade up when they scroll into view. Children of <Section> and grids marked reveal-stagger qualify. */
const selector = ".reveal, .reveal-line, .reveal-children > :not(.reveal-stagger):not(.sr-only), .reveal-stagger > *";

/**
 * Cross-browser scroll reveal. Anything already on screen is left alone; the rest is hidden and
 * revealed by an IntersectionObserver, with a short stagger across each row of a grid.
 * Renders nothing. With reduced motion the CSS turns the slide-up into a plain fade, and the page stays
 * fully visible if JavaScript never runs.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    for (const element of document.querySelectorAll<HTMLElement>(selector)) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) continue;

      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const column = element.matches(".reveal-stagger > *") ? siblings.indexOf(element) % 3 : 0;
      element.style.transitionDelay = `${column * 110}ms`;
      element.classList.add("will-reveal");
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
