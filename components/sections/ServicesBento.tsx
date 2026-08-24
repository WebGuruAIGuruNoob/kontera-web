import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { tjenester } from "@/content/tjenester";
import { Arrow } from "@/components/icons";

/**
 * Tjenestebento (DESIGNPLAN §3): 12-kol. grid med VARIERTE spans — aldri seks
 * like celler. Featurecellen (2 kolonners bredde, dobbel høyde) kan bære en
 * datavisualisering (geo: næringsprofil). Hairlines, ingen skygger.
 */
export function ServicesBento({
  eyebrow = "Tjenester",
  title,
  intro,
  order,
  localSentences,
  geoSuffix,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Tjeneste-slugs i ønsket rekkefølge (bransjebetinget på geo-sider) */
  order?: string[];
  /** Lokalisert setning per tjeneste-slug (data-parameterisert, unik per side) */
  localSentences?: Record<string, string>;
  geoSuffix?: string;
}) {
  const sorted = order
    ? [...tjenester].sort(
        (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
      )
    : tjenester;
  const [feature, ...rest] = sorted;

  const spans = [
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-12 lg:col-span-6",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
  ];
  // «Inkludert»-pastellrotasjonen (Drivly-grepet) — featurecellen er mist
  const tinter = ["bg-cream", "bg-varm", "bg-cream", "bg-varm", "bg-cream"];

  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

      <div data-reveal-group className="mt-10 grid grid-cols-1 gap-4 max-sm:gap-0 sm:grid-cols-12">
        {/* Featurecelle */}
        <Link
          href={`/tjenester/${feature.slug}`}
          className="group sm:col-span-12 lg:col-span-6 lg:row-span-2 rounded-3xl border border-navy/10 bg-mist p-7 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)] lg:p-8"
        >
          <div className="flex h-full flex-col">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-navy transition-colors group-hover:bg-navy group-hover:text-white">
              <Icon name={feature.ikon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-navy">
              {feature.navn}
              {geoSuffix ? ` ${geoSuffix}` : ""}
            </h3>
            <p className="mt-2 max-w-[44ch] leading-relaxed text-slate">
              {feature.kortBeskrivelse}
            </p>
            {localSentences?.[feature.slug] && (
              <p data-local-service data-unique className="mt-3 text-sm font-semibold text-navy">
                {localSentences[feature.slug]}
              </p>
            )}
            <span className="mt-6 flex-1 content-end text-sm font-bold text-blue group-hover:underline">
              Les mer <Arrow />
            </span>
          </div>
        </Link>

        {rest.map((t, i) => (
          <Link
            key={t.slug}
            href={`/tjenester/${t.slug}`}
            className={`group ${spans[i]} ${tinter[i]} rounded-3xl border border-navy/10 p-6 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)] max-sm:rounded-none max-sm:border-x-0 max-sm:border-b-0 max-sm:border-t max-sm:bg-transparent max-sm:px-0 max-sm:py-4 max-sm:shadow-none max-sm:hover:translate-y-0 max-sm:hover:shadow-none`}
          >
            <h3 className="flex items-baseline justify-between gap-3 font-sans text-base font-bold text-navy">
              <span>
                <Icon name={t.ikon} className="mr-2 inline h-5 w-5 align-[-0.2em] text-azure" />
                {t.navn}
                {geoSuffix ? ` ${geoSuffix}` : ""}
              </span>
              <Arrow className="text-blue transition-transform group-hover:translate-x-0.5" />
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate">
              {t.kortBeskrivelse}
            </p>
            {localSentences?.[t.slug] && (
              <p data-local-service data-unique className="mt-2 text-sm font-semibold text-navy">
                {localSentences[t.slug]}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
