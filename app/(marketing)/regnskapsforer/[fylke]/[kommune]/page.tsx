import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleKommuner, getKommune, naboKommuner } from "@/lib/geo";
import { buildKommuneInnhold } from "@/lib/geo-content";
import { kommuneBilde } from "@/lib/geo-bilder";
import { generatedAt, tall } from "@/lib/geo-stats";
import { site } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { Arshjul } from "@/components/sections/Arshjul";
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
  return alleKommuner.map(({ fylke, kommune }) => ({
    fylke: fylke.slug,
    kommune: kommune.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fylke: string; kommune: string }>;
}): Promise<Metadata> {
  const { fylke: fylkeSlug, kommune: kommuneSlug } = await params;
  const treff = getKommune(fylkeSlug, kommuneSlug);
  if (!treff) return {};
  const { fylke, kommune } = treff;
  const innhold = buildKommuneInnhold(fylke, kommune);
  const navn = kommune.visningsnavn;
  return {
    title: { absolute: `Regnskapsfører i ${navn} | Kontera Regnskap` },
    description: `Regnskap, lønn og årsoppgjør for bedrifter i ${navn} — ${tall(innhold?.stats.total ?? 0)} virksomheter er registrert i kommunen. Fast regnskapsfører uten taksameter. Ring 960 00 400.`,
    alternates: {
      canonical: `/regnskapsforer/${fylke.slug}/${kommune.slug}`,
    },
  };
}

export default async function KommunePage({
  params,
}: {
  params: Promise<{ fylke: string; kommune: string }>;
}) {
  const { fylke: fylkeSlug, kommune: kommuneSlug } = await params;
  const treff = getKommune(fylkeSlug, kommuneSlug);
  if (!treff) notFound();
  const { fylke, kommune } = treff;

  const innhold = buildKommuneInnhold(fylke, kommune);
  if (!innhold) notFound();

  const navn = kommune.visningsnavn;
  const naboer = naboKommuner(fylke, kommune, 5);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskapsfører i ${navn}`,
          description: `Regnskapsføring, lønn, mva og årsoppgjør for bedrifter i ${navn} kommune`,
          url: `${site.url}/regnskapsforer/${fylke.slug}/${kommune.slug}`,
          areaServed: `${navn} kommune`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Regnskapsfører", href: "/regnskapsforer" },
          { name: fylke.visningsnavn, href: `/regnskapsforer/${fylke.slug}` },
          { name: navn, href: `/regnskapsforer/${fylke.slug}/${kommune.slug}` },
        ]}
      />
      <Hero
        compact
        eyebrow={`${fylke.visningsnavn} · ${navn}`}
        title={`Regnskapsfører i ${navn} — uten taksameter`}
        subtitle={`Fast regnskapsfører som kjenner bedriften din, alle frister overholdt — og ingen faktura for korte spørsmål. Slik skal et regnskapssamarbeid i ${navn} fungere.`}
        image={kommuneBilde(fylke.slug, kommune.nr)}
        proof={[
          `${tall(innhold.stats.total)} virksomheter i ${navn}`,
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
        ]}
      />
      <TrustBar />

      {/* Unik lokal intro — bygget av kommunens faktiske næringsdata */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <p className="section-eyebrow">Næringslivet i {navn}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            Bedriftene i {navn} — og hva de trenger fra en regnskapsfører
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

      {/* Betingede fagblokker — valgt av kommunens næringsprofil */}
      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
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
        </div>
      </section>

      <ServiceCards
        title={`Regnskapstjenester for bedrifter i ${navn}`}
        intro={`Alt fra løpende bokføring til årsoppgjør — levert digitalt til ${navn}, med én fast regnskapsfører som tar helheten.`}
        geoSuffix={`i ${navn}`}
      />
      <Arshjul stedsnavn={navn} />
      <PromiseGrid />
      <PricingTeaser />
      <ProcessSteps title={`Slik kommer du i gang fra ${navn}`} />

      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${navn}`}
      />

      {/* Intern lenking: naboer + opp til fylkeshub (MASTERPLAN §7.5) */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-lg border border-line bg-white p-6">
          <h2 className="font-display text-lg font-extrabold text-ink">
            Regnskapsfører i nærheten av {navn}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {naboer.map((nabo) => (
              <li key={nabo.nr}>
                <Link
                  href={`/regnskapsforer/${fylke.slug}/${nabo.slug}`}
                  className="text-sm font-semibold text-navy hover:text-blue hover:underline"
                >
                  Regnskapsfører i {nabo.visningsnavn}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/regnskapsforer/${fylke.slug}`}
                className="text-sm font-bold text-blue hover:underline"
              >
                Alle kommuner i {fylke.visningsnavn} →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FinalCta
        title={`Klar for en regnskapsfører som kjenner deg — i ${navn}?`}
        text={`Ta en uforpliktende prat, så finner vi ut om vi er en god match for bedriften din i ${navn}. Eller send oss noen linjer — vi svarer innen én arbeidsdag.`}
      />
    </>
  );
}
