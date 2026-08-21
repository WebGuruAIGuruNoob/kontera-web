import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/content-types";

/**
 * FAQ-accordion (details/summary = server-rendret i DOM, SEO-trygt).
 * Longtail-dybden på landingssidene bor her (DESIGNPLAN §4.11).
 */
export function Faq({
  items,
  title = "Ofte stilte spørsmål",
  eyebrow = "Spørsmål og svar",
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <JsonLd data={faqSchema(items)} />
      <div className="mx-auto max-w-3xl">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-surface">
          {items.map((item) => (
            <details key={item.q} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-[0.98rem] font-bold text-navy [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-azure transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              {item.unique ? (
                <p data-unique className="mt-3 max-w-[65ch] leading-relaxed text-slate">
                  {item.a}
                </p>
              ) : (
                <p className="mt-3 max-w-[65ch] leading-relaxed text-slate">{item.a}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
