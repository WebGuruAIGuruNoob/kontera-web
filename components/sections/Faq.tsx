import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/content-types";

export function Faq({
  items,
  title = "Ofte stilte spørsmål",
  eyebrow = "FAQ",
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
        <p className="section-eyebrow text-center">{eyebrow}</p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
          {title}
        </h2>
        <div className="mt-8 divide-y divide-line rounded-lg border border-line bg-white">
          {items.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[0.98rem] font-bold text-navy [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-blue transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] leading-relaxed text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
