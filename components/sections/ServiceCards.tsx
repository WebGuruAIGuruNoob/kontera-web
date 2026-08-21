import Link from "next/link";
import { Icon } from "@/components/Icon";
import { tjenester } from "@/content/tjenester";

export function ServiceCards({
  eyebrow = "Tjenester",
  title = "Alt du trenger — fra bilag til årsoppgjør",
  intro,
  geoSuffix,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** F.eks. «i Bærum» — vinkler kortoverskriftene lokalt på geo-sider */
  geoSuffix?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
          {title}
        </h2>
        {intro && <p className="mt-4 leading-relaxed text-slate">{intro}</p>}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tjenester.map((t) => (
          <Link
            key={t.slug}
            href={`/tjenester/${t.slug}`}
            className="group rounded-lg border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
              <Icon name={t.ikon} className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-navy">
              {t.navn}
              {geoSuffix ? ` ${geoSuffix}` : ""}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{t.kortBeskrivelse}</p>
            <span className="mt-4 inline-block text-sm font-bold text-blue group-hover:underline">
              Les mer →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
