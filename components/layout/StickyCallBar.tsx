"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Sticky ringelinje på mobil — primærkonverteringen (MASTERPLAN §9).
 * Vises etter litt scroll så den ikke ligger oppå hero-CTA-en.
 */
export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex gap-px border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgb(8_70_102_/_0.12)] lg:hidden"
      role="region"
      aria-label="Hurtigkontakt"
    >
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-blue px-4 py-3.5 font-display text-sm font-bold text-white"
        data-cta="sticky-ring"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Ring {site.phoneDisplay}
      </a>
      <a
        href="/kontakt"
        className="flex items-center justify-center bg-navy px-5 py-3.5 text-sm font-bold text-white"
        data-cta="sticky-skjema"
      >
        Send melding
      </a>
    </div>
  );
}
