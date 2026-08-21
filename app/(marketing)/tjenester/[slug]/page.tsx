import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tjenester, getTjeneste } from "@/content/tjenester";
import { site } from "@/data/site";
import { Hero, CheckIcon } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { Icon } from "@/components/Icon";

export const dynamicParams = false;

export function generateStaticParams() {
  return tjenester.map((t) => ({ slug: t.slug }));
}

const heroBilder: Record<string, string> = {
  regnskapsforing: "/images/pexels/tall-1.jpg",
  lonn: "/images/pexels/samarbeid-2.jpg",
  arsoppgjor: "/images/pexels/tall-2.jpg",
  mva: "/images/pexels/tall-3.jpg",
  radgivning: "/images/pexels/radgivning-1.jpg",
  "starte-selskap": "/images/pexels/konsulent-2.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) return {};
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: `/tjenester/${t.slug}` },
  };
}

export default async function TjenestePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) notFound();

  const relaterte = t.relaterte
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: t.navn,
          description: t.metaDescription,
          url: `${site.url}/tjenester/${t.slug}`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Tjenester", href: "/tjenester" },
          { name: t.navn, href: `/tjenester/${t.slug}` },
        ]}
      />
      <Hero
        compact
        eyebrow={t.navn}
        title={t.tittel}
        subtitle={t.heroUndertekst}
        image={heroBilder[t.slug]}
      />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-extrabold text-ink">
          Passer for deg som …
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {t.passerFor.map((punkt) => (
            <li
              key={punkt}
              className="flex items-start gap-3 rounded-lg border border-line bg-white p-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span className="leading-relaxed text-ink">{punkt}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Dette inngår
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.hvaInngar.map((item) => (
              <div
                key={item.tittel}
                className="rounded-lg border border-line bg-white p-6 shadow-card"
              >
                <h3 className="font-display text-base font-bold text-navy">
                  {item.tittel}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          {t.seksjoner.map((seksjon) => (
            <div key={seksjon.tittel}>
              <h2 className="font-display text-2xl font-extrabold text-ink [text-wrap:balance]">
                {seksjon.tittel}
              </h2>
              {seksjon.avsnitt.map((avsnitt, i) => (
                <p key={i} className="mt-4 leading-relaxed text-slate">
                  {avsnitt}
                </p>
              ))}
            </div>
          ))}
          <p className="rounded-lg border border-azure/40 bg-mist p-5 text-sm leading-relaxed text-navy">
            <strong>Lurer du på noe om {t.navn.toLowerCase()}?</strong> Ring oss
            på{" "}
            <a href={site.phoneHref} className="font-bold text-blue">
              {site.phoneDisplay}
            </a>{" "}
            for en uforpliktende prat — korte spørsmål koster aldri noe.
          </p>
        </div>
      </section>

      {relaterte.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="font-display text-xl font-extrabold text-ink">
            Relaterte tjenester
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relaterte.map((rel) => (
              <Link
                key={rel.slug}
                href={`/tjenester/${rel.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                  <Icon name={rel.ikon} className="h-5 w-5" />
                </span>
                <span className="font-display font-bold text-navy group-hover:text-blue">
                  {rel.navn}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Faq items={t.faq} title={`Spørsmål og svar om ${t.navn.toLowerCase()}`} />
      <FinalCta />
    </>
  );
}
