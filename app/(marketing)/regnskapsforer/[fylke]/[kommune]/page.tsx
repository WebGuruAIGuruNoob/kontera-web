import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleKommuner, getKommune, naboKommuner } from "@/lib/geo";
import { buildKommuneInnhold } from "@/lib/geo-content";
import { generatedAt, getStats, tall } from "@/lib/geo-stats";
import { fagblokkBilde, fylkeBilde } from "@/lib/bilder";
import { FramedImage } from "@/components/FramedImage";
import { EditorialSections } from "@/components/sections/EditorialSections";
import { GarantiBand } from "@/components/sections/GarantiBand";
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
  const naboer = naboKommuner(fylke, kommune, 6);
  const regionFoto = fylkeBilde(fylke.slug);

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
            Vi kjenner tallene til næringslivet i {navn}
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
        title={`Regnskapstjenester i ${navn} — alt fra én fast fører`}
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
        variant="surface"
        text={`Usikker på hva din bedrift i ${navn} trenger? Fem minutter på telefonen — så vet du det.`}
      />

      {/* 6. Betingede fagblokker — redaksjonell 4/8 med datavalgte fagbilder */}
      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-4">
          <EditorialSections
            blokker={innhold.blokker}
            bilder={(blokk, i) => (i < 2 && blokk.id ? fagblokkBilde(blokk.id) : null)}
          />
        </div>
      </section>

      {/* 7. Pris (CTA #2 — høyest intent) */}
      <PricingSection leadEnabled={enabled} stedsnavn={navn} />

      {/* 8–9. Prosess + sammenligning */}
      <NumberedJourney
        leadEnabled={enabled}
        title={`Slik kommer du i gang fra ${navn} — det meste gjør vi`}
      />
      <ComparisonTable />

      {/* 10. Garantiband — typografisk brudd med egne løfter */}
      <GarantiBand seed={kommune.nr} />

      {/* 11–12. Samarbeidsmodellen + årshjulet (ordgulv + differensiatorer) */}
      <PromiseSplit />
      <Arshjul stedsnavn={navn} />

      {/* 13. Dekning + intern lenking: fylkeslandemerke + nabokort med tall */}
      <section className="border-y border-navy/10 bg-mist py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="section-eyebrow">Dekning</p>
            <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
              Vi hjelper bedrifter i hele {fylke.visningsnavn}
            </h2>
            <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-slate">
              Heldigitalt samarbeid gir like tett oppfølging enten du driver i{" "}
              {navn} eller i nabokommunen.
            </p>
            {regionFoto && (
              <FramedImage
                src={regionFoto.src}
                alt={regionFoto.alt}
                caption={regionFoto.caption}
                className="mt-6"
                sizes="(min-width: 1024px) 26rem, 100vw"
              />
            )}
            <Link
              href={`/regnskapsforer/${fylke.slug}`}
              className="mt-5 inline-block text-sm font-bold text-blue hover:underline"
            >
              Alle kommuner i {fylke.visningsnavn} →
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {naboer.map((nabo) => {
                const naboStats = getStats(nabo.nr);
                return (
                  <Link
                    key={nabo.nr}
                    href={`/regnskapsforer/${fylke.slug}/${nabo.slug}`}
                    className="group card-line card-line-hover flex items-baseline justify-between gap-3 px-4 py-3.5"
                  >
                    <span className="font-sans text-sm font-bold text-navy group-hover:text-blue">
                      Regnskapsfører i {nabo.visningsnavn}
                    </span>
                    {naboStats && (
                      <span className="shrink-0 text-xs tabular-nums text-slate">
                        {tall(naboStats.total)} virks.
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${navn}`}
      />

      <FinalCta
        title={`Klar for en regnskapsfører som kjenner deg — i ${navn}?`}
        text={`Ta en uforpliktende prat, så finner vi ut om vi er en god match for bedriften din i ${navn}.`}
      />
    </>
  );
}
