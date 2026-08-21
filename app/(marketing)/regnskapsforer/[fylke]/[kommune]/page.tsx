import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleKommuner, getKommune, naboKommuner } from "@/lib/geo";
import { buildKommuneInnhold } from "@/lib/geo-content";
import { generatedAt, tall } from "@/lib/geo-stats";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { StatBand } from "@/components/sections/StatBand";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { NaeringsProfil } from "@/components/sections/NaeringsProfil";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PricingSection } from "@/components/sections/PricingSection";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PromiseSplit } from "@/components/sections/PromiseSplit";
import { Arshjul } from "@/components/sections/Arshjul";
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
  return {
    title: {
      absolute: `Regnskapsfører i ${kommune.visningsnavn} | Kontera Regnskap`,
    },
    description: innhold?.metaDescription,
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

  const enabled = leadEnabled();
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

      {/* 1. Split-hero med lead-kort (DESIGNPLAN §4.1) */}
      <HeroSplit
        compact
        eyebrow={`${fylke.visningsnavn} · ${navn}`}
        title={innhold.h1}
        subtitle={`Heldigital regnskapsføring — like nær deg i ${navn} som et lokalt kontor. Én fast regnskapsfører tar helheten, en fast backup kjenner deg også, og alle frister er vårt ansvar.`}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
          enabled ? "Svar innen én arbeidsdag" : "Ingen faktura for korte spørsmål",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud for din bedrift i ${navn}`}
            subheading="En kort prat om behovet ditt — så får du et ærlig, konkret tilbud."
          />
        }
      />
      <ProofStrip />

      {/* 3. Unik lokal innsikt — sidens SEO-payload og relevansbevis */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl" data-unique>
          <p className="section-eyebrow">Næringslivet i {navn}</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
            Bedriftene i {navn} — og hva de trenger fra en regnskapsfører
          </h2>
          {innhold.intro.map((avsnitt, i) => (
            <p key={i} className="mt-4 max-w-[70ch] leading-relaxed text-slate">
              {avsnitt}
            </p>
          ))}
        </div>
      </section>

      {/* 4. Kommunens tall som mørkt stat-bånd */}
      <StatBand
        items={[
          { label: "Registrerte virksomheter", value: tall(innhold.stats.total), numeric: innhold.stats.total },
          { label: "Aksjeselskaper", value: tall(innhold.stats.as), numeric: innhold.stats.as },
          { label: "Enkeltpersonforetak", value: tall(innhold.stats.enk), numeric: innhold.stats.enk },
          { label: "Nye siste 12 mnd", value: tall(innhold.stats.nyreg), numeric: innhold.stats.nyreg },
          { label: "Innbyggere", value: tall(innhold.stats.pop), numeric: innhold.stats.pop ?? undefined },
          { label: "Regnskapsvirksomheter", value: tall(innhold.stats.regnskap), numeric: innhold.stats.regnskap },
        ]}
        source={`Kilder: Brønnøysundregistrene (Enhetsregisteret) og SSB. Sist oppdatert ${generatedAt}.`}
      />

      {/* 5. Tjenestebento — bransjesortert med lokaliserte setninger */}
      <ServicesBento
        title={`Regnskapstjenester for bedrifter i ${navn}`}
        intro={`Alt fra løpende bokføring til årsoppgjør — levert digitalt til ${navn}, med én fast regnskapsfører som tar helheten.`}
        order={innhold.tjenesteRekkefolge}
        localSentences={innhold.tjenesteSetninger}
        geoSuffix={`i ${navn}`}
        featureExtra={
          <NaeringsProfil
            navn={navn}
            næringer={innhold.topNæringer}
            total={innhold.stats.total}
          />
        }
      />

      <CtaBanner
        leadEnabled={enabled}
        text={`Usikker på hva din bedrift i ${navn} trenger? Ta en uforpliktende prat, så finner vi ut av det sammen.`}
      />

      {/* 6. Betingede fagblokker — valgt av kommunens næringsprofil */}
      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl space-y-10">
            {innhold.blokker.map((blokk) => (
              <div key={blokk.id}>
                <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink [text-wrap:balance]">
                  {blokk.tittel}
                </h2>
                {blokk.avsnitt.map((avsnitt, i) => (
                  <p key={i} className="mt-4 max-w-[70ch] leading-relaxed text-slate">
                    {avsnitt}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pris (CTA #2 — høyest intent) */}
      <PricingSection leadEnabled={enabled} stedsnavn={navn} />

      {/* 8–9. Prosess + sammenligning */}
      <NumberedJourney leadEnabled={enabled} title={`Slik kommer du i gang fra ${navn}`} />
      <ComparisonTable />

      {/* 10–11. Samarbeidsmodellen + årshjulet (ordgulv + differensiatorer) */}
      <PromiseSplit />
      <Arshjul stedsnavn={navn} />

      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${navn}`}
      />

      {/* Dekning + intern lenking (ærlighet, aldri falsk kart-pin) */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-navy/10 bg-surface p-6">
          <h2 className="font-sans text-lg font-bold text-ink">
            Vi hjelper bedrifter i hele {fylke.visningsnavn}
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
        text={`Ta en uforpliktende prat, så finner vi ut om vi er en god match for bedriften din i ${navn}.`}
      />
    </>
  );
}
