import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fylker, getFylke } from "@/lib/geo";
import { buildFylkeInnhold } from "@/lib/geo-content";
import { fylkeBilde } from "@/lib/geo-bilder";
import { generatedAt, tall } from "@/lib/geo-stats";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { PromiseGrid } from "@/components/sections/PromiseGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return fylker.map((f) => ({ fylke: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fylke: string }>;
}): Promise<Metadata> {
  const { fylke: fylkeSlug } = await params;
  const fylke = getFylke(fylkeSlug);
  if (!fylke) return {};
  const innhold = buildFylkeInnhold(fylke);
  return {
    title: {
      absolute: `Regnskapsfører i ${fylke.visningsnavn} | Kontera Regnskap`,
    },
    description: `Regnskap, lønn og årsoppgjør for bedrifter i ${fylke.visningsnavn} — ${tall(innhold.aggregert.total)} virksomheter i ${fylke.kommuner.length} kommuner. Fast regnskapsfører, digitalt i hele fylket. Ring 960 00 400.`,
    alternates: { canonical: `/regnskapsforer/${fylke.slug}` },
  };
}

export default async function FylkePage({
  params,
}: {
  params: Promise<{ fylke: string }>;
}) {
  const { fylke: fylkeSlug } = await params;
  const fylke = getFylke(fylkeSlug);
  if (!fylke) notFound();

  const innhold = buildFylkeInnhold(fylke);
  const kommunerSortert = [...fylke.kommuner].sort((a, b) =>
    a.visningsnavn.localeCompare(b.visningsnavn, "nb")
  );

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskapsfører i ${fylke.visningsnavn}`,
          description: `Regnskapstjenester for bedrifter i ${fylke.visningsnavn}`,
          url: `${site.url}/regnskapsforer/${fylke.slug}`,
          areaServed: `${fylke.visningsnavn} fylke`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Regnskapsfører", href: "/regnskapsforer" },
          { name: fylke.visningsnavn, href: `/regnskapsforer/${fylke.slug}` },
        ]}
      />
      <Hero
        compact
        eyebrow={`Regnskapsfører i ${fylke.visningsnavn}`}
        title={`Regnskapsfører i ${fylke.visningsnavn} — uten taksameter`}
        subtitle={`Fast regnskapsfører som kjenner bedriften din, alle frister overholdt og ingen faktura for korte spørsmål — digitalt i hele ${fylke.visningsnavn}.`}
        image={fylkeBilde(fylke.slug)}
        proof={[
          `${tall(innhold.aggregert.total)} virksomheter i fylket`,
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
        ]}
      />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <p className="section-eyebrow">Næringslivet i {fylke.visningsnavn}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            Et fylke i tall — og hva det betyr for regnskapet ditt
          </h2>
          {innhold.intro.map((avsnitt, i) => (
            <p key={i} className="mt-4 leading-relaxed text-slate">
              {avsnitt}
            </p>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {innhold.statCards.map((card) => (
            <div key={card.label} className="rounded-lg border border-line bg-mist p-4 text-center">
              <p className="font-display text-2xl font-extrabold tabular-nums text-blue">
                {card.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate">{card.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate">
          Kilder: Brønnøysundregistrene (Enhetsregisteret) og SSB. Sist
          oppdatert {generatedAt}.
        </p>
      </section>

      {/* Kommunevelger — hub-funksjonen: beskrivende ankertekster til alle spokes */}
      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Velg din kommune i {fylke.visningsnavn}
          </h2>
          <p className="mt-3 max-w-2xl text-slate">
            Hver kommuneside gir deg lokale næringstall, bransjeinnsikten som
            er mest relevant der — og svar på det bedrifter i kommunen lurer på.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {kommunerSortert.map((kommune) => (
              <li key={kommune.nr}>
                <Link
                  href={`/regnskapsforer/${fylke.slug}/${kommune.slug}`}
                  className="text-[0.95rem] font-semibold text-navy hover:text-blue hover:underline"
                >
                  Regnskapsfører i {kommune.visningsnavn}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {innhold.blokker.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-3xl space-y-10">
            {innhold.blokker.map((blokk) => (
              <div key={blokk.id}>
                <h2 className="font-display text-2xl font-extrabold text-ink [text-wrap:balance]">
                  {blokk.tittel}
                </h2>
                {blokk.avsnitt.map((avsnitt, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-slate">
                    {avsnitt}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <ServiceCards
        title={`Tjenestene våre i ${fylke.visningsnavn}`}
        intro="Samme faste regnskapsfører tar helheten — du velger hvor mye du vil gjøre selv."
      />
      <PromiseGrid />
      <PricingTeaser />
      <ProcessSteps />
      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${fylke.visningsnavn}`}
      />
      <FinalCta
        title={`Klar for en regnskapsfører som kjenner deg — i ${fylke.visningsnavn}?`}
      />
    </>
  );
}
