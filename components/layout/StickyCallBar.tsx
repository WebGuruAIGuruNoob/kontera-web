"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { PhoneIcon } from "@/components/icons";

/**
 * Sticky mobil-CTA (DESIGNPLAN §3/§7b.1): to soner, mode-aware.
 * - Skjema verifisert: «Få tilbud» visuelt primær + «Ring» sekundær.
 * - Ellers: «Ring» primær (lead-sikkerhetsregelen).
 * Vises etter scroll; ankerer til #kontakt når seksjonen finnes på siden.
 */
export function StickyCallBar({ leadEnabled }: { leadEnabled: boolean }) {
  const [visible, setVisible] = useState(false);
  const [formHref, setFormHref] = useState("/kontakt");

  useEffect(() => {
    const target = document.getElementById("kontakt");
    setFormHref(target ? "#kontakt" : "/kontakt");

    // LØFTEPLAN funn 5: skjul baren når ankermålet (#kontakt) er synlig,
    // så den aldri ligger over selve skjemaknappen den peker til.
    let targetVisible = false;
    const update = () => setVisible(window.scrollY > 520 && !targetVisible);
    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(([entry]) => {
        targetVisible = entry.isIntersecting;
        update();
      });
      io.observe(target);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex gap-px border-t border-navy/10 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      role="region"
      aria-label="Hurtigkontakt"
    >
      {leadEnabled ? (
        <>
          <a
            href={site.phoneHref}
            data-cta="sticky-ring"
            className="flex items-center justify-center gap-2 bg-navy px-5 py-3.5 font-sans text-sm font-bold text-white"
          >
            <PhoneIcon className="h-4 w-4" />
            Ring
          </a>
          <a
            href={formHref}
            data-cta="sticky-tilbud"
            className="flex flex-1 items-center justify-center bg-gul px-4 py-3.5 font-sans text-sm font-bold text-ink"
          >
            Få tilbud
          </a>
        </>
      ) : (
        <>
          <a
            href={site.phoneHref}
            data-cta="sticky-ring"
            className="flex flex-1 items-center justify-center gap-2 bg-gul px-4 py-3.5 font-sans text-sm font-bold text-ink"
          >
            <PhoneIcon className="h-4 w-4" />
            Ring {site.phoneDisplay}
          </a>
          <a
            href={site.emailHref}
            data-cta="sticky-epost"
            className="flex items-center justify-center bg-navy px-5 py-3.5 font-sans text-sm font-bold text-white"
          >
            E-post
          </a>
        </>
      )}
    </div>
  );
}
