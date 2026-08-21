import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bransjer, getBransje } from "@/content/bransjer";
import { getTjeneste } from "@/content/tjenester";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { Icon } from "@/components/Icon";

export const dynamicParams = false;

export function generateStaticParams() {
  return bransjer.map((b) => ({ slug: b.slug }));
}

const heroBilder: Record<string, string> = {
  bilforhandlere: "/images/pexels/bilforhandler-1.jpg",
  handverkere: "/images/pexels/handverker-1.jpg",
  eiendom: "/images/pexels/eiendom-1.jpg",
  netthandel: "/images/pexels/netthandel-1.jpg",
  "borettslag-sameier": "/images/pexels/borettslag-1.jpg",
  tjenesteytende: "/images/pexels/konsulent-1.jpg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBransje(slug);
  if (!b) return {};
  return {
    title: { absolute: b.metaTitle },
    description: b.metaDescription,
    alternates: { canonical: `/bransjer/${b.slug}` },
  };
}

export default async function BransjePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBransje(slug);
  if (!b) notFound();

  const tjenesteLenker = b.relaterteTjenester
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskap for ${b.navn.toLowerCase()}`,
          description: b.metaDescription,
          url: `${site.url}/bransjer/${b.slug}`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Bransjer", href: "/bransjer" },
          { name: b.navn, href: `/bransjer/${b.slug}` },
        ]}
      />
      <Hero
        compact
        eyebrow={`Regnskap for ${b.navn.toLowerCase()}`}
        title={b.tittel}
        subtitle={b.heroUndertekst}
        image={heroBilder[b.slug]}
      />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-extrabold text-ink">
          Kjenner du deg igjen?
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {b.smerter.map((smerte) => (
            <li
              key={smerte}
              className="rounded-lg border border-line bg-white p-5 italic leading-relaxed text-slate shadow-card"
            >
              «{smerte.replace(/^«|»$/g, "")}»
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl leading-relaxed text-slate">
          Dette er hverdagen vi hjelper {b.navn.toLowerCase()} med — og grunnen
          til at bransjekunnskap er forskjellen på et regnskap som bare er
          «ført», og et regnskap som er ført <em>riktig</em>.
        </p>
      </section>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl space-y-10">
            {b.seksjoner.map((seksjon) => (
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
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-extrabold text-ink">
          Slik hjelper vi {b.navn.toLowerCase()}
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {b.slikHjelperVi.map((item) => (
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

        {tjenesteLenker.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-lg font-bold text-ink">
              Mest relevante tjenester for {b.navn.toLowerCase()}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tjenesteLenker.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tjenester/${t.slug}`}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
                    <Icon name={t.ikon} className="h-5 w-5" />
                  </span>
                  <span className="font-display font-bold text-navy group-hover:text-blue">
                    {t.navn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Faq items={b.faq} title={`Spørsmål og svar — regnskap for ${b.navn.toLowerCase()}`} />
      <FinalCta
        title={`Klar for en regnskapsfører som kan ${b.navn.toLowerCase()}?`}
      />
    </>
  );
}
