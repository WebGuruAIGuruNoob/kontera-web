"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobilmeny"
        aria-label={open ? "Lukk meny" : "Åpne meny"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div id="mobilmeny" className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lift">
          <nav aria-label="Mobilmeny" className="mx-auto max-w-6xl px-4 py-4">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 font-semibold text-ink hover:bg-mist"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 border-t border-line pt-3">
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-blue px-3 py-2.5 text-center font-bold text-white"
                >
                  Få et uforpliktende tilbud
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={site.phoneHref}
                  className="block rounded-md border border-line px-3 py-2.5 text-center font-bold text-navy"
                >
                  Ring {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
