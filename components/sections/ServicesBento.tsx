import Link from "next/link";
import { Icon } from "@/components/Icon";
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
  featureExtra,
  geoSuffix,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Tjeneste-slugs i ønsket rekkefølge (bransjebetinget på geo-sider) */
  order?: string[];
  /** Lokalisert setning per tjeneste-slug (data-parameterisert, unik per side) */
  localSentences?: Record<string, string>;
  /** Ekstra innhold i featurecellen, f.eks. næringsprofil-viz */
  featureExtra?: React.ReactNode;
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

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
          {title}
        </h2>
        {intro && <p className="mt-4 leading-relaxed text-slate">{intro}</p>}
      </div>

      <div data-reveal-group className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-12">
        {/* Featurecelle */}
        <Link
          href={`/tjenester/${feature.slug}`}
          className="group sm:col-span-12 lg:col-span-6 lg:row-span-2 card-line card-line-hover rounded-2xl p-7 lg:p-8"
        >
          <div className="flex h-full flex-col">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
              <Icon name={feature.ikon} className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-navy">
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
            {featureExtra && <div className="mt-6 flex-1">{featureExtra}</div>}
            <span className="mt-6 text-sm font-bold text-blue group-hover:underline">
              Les mer <Arrow />
            </span>
          </div>
        </Link>

        {rest.map((t, i) => (
          <Link
            key={t.slug}
            href={`/tjenester/${t.slug}`}
            className={`group ${spans[i]} card-line card-line-hover p-6`}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                <Icon name={t.ikon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-sans text-base font-bold text-navy">
                  {t.navn}
                  {geoSuffix ? ` ${geoSuffix}` : ""}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {t.kortBeskrivelse}
                </p>
                {localSentences?.[t.slug] && (
                  <p data-local-service data-unique className="mt-2 text-sm font-semibold text-navy">
                    {localSentences[t.slug]}
                  </p>
                )}
                <span className="mt-2 inline-block text-sm font-bold text-blue group-hover:underline">
                  Les mer <Arrow />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
