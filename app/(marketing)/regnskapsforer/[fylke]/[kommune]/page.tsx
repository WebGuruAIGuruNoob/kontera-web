import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alleKommuner, getKommune, naboKommuner } from "@/lib/geo";
import { buildKommuneInnhold } from "@/lib/geo-content";
import { generatedAt, getStats, tall } from "@/lib/geo-stats";
import { fagblokkBilde, fylkeBilde } from "@/lib/bilder";
import { FramedImage } from "@/components/FramedImage";
import { EditorialSections } from "@/components/sections/EditorialSections";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { StatBand } from "@/components/sections/StatBand";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { NaeringsProfil } from "@/components/sections/NaeringsProfil";
import { PricingSection } from "@/components/sections/PricingSection";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { TrustRad } from "@/components/sections/TrustRad";
import { SectionHeading } from "@/components/SectionHeading";
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

/**
 * KOMMUNESIDE — CRO-rekkefølge (Henriks ordre 2026-08-25): selg Kontera FØRST
 * (USP-hero, trustrad, tjenester, pris, fag, prosess, sammenligning, FAQ) —
 * næringstall, statistikk og nabolenking flyttet NEDERST som dokumentasjon.
 */
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

      {/* 1. Hero: selgende H1 + tre Kontera-USP-er (aldri stedsdata i chips) */}
      <HeroSplit
        compact
        eyebrow={`${fylke.visningsnavn} · ${navn}`}
        title={innhold.h1}
        subtitle={`Én fast regnskapsfører tar helheten, en fast stedfortreder kjenner bedriften like godt — og korte spørsmål er inkludert i honoraret. Levert digitalt til bedrifter i ${navn}.`}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast regnskapsfører og stedfortreder",
          enabled ? "Svar innen én arbeidsdag" : "Korte spørsmål inkludert i honoraret",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud for din bedrift i ${navn}`}
            subheading="En kort samtale om behovet ditt — så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />

      {/* 2. Hvorfor velge Kontera — USP-raden fra forsiden */}
      <TrustRad />

      {/* 3. Tjenestebento — bransjesortert med lokaliserte setninger */}
      <ServicesBento
        title={`Alt bedriften i ${navn} trenger. Ingenting den ikke trenger.`}
        intro={`Fra løpende bokføring til årsoppgjør — levert digitalt til ${navn}, med én fast regnskapsfører som tar helheten.`}
        order={innhold.tjenesteRekkefolge}
        localSentences={innhold.tjenesteSetninger}
        geoSuffix={`i ${navn}`}
      />

      {/* 4. Pris (høyest intent) */}
      <PricingSection leadEnabled={enabled} stedsnavn={navn} />

      {/* 5. Betingede fagblokker — redaksjonell 4/8 med datavalgte fagbilder */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <EditorialSections
            blokker={innhold.blokker}
            bilder={(blokk, i) => (i < 2 && blokk.id ? fagblokkBilde(blokk.id) : null)}
          />
        </div>
      </section>

      {/* 6–7. Prosess + sammenligning (konverterer byttere) */}
      <NumberedJourney
        leadEnabled={enabled}
        title={`Slik kommer du i gang fra ${navn} — vi tar det meste av jobben`}
      />
      <ComparisonTable />

      {/* 8. FAQ */}
      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${navn}`}
      />

      {/* 9. NEDERST: unik lokal innsikt (SEO-payload) + næringsprofil (R5) */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={`Næringslivet i ${navn}`}
              title={`Vi kjenner næringslivet i ${navn}. Her er tallene.`}
            />
            <div data-unique>
              {innhold.intro.map((avsnitt, i) => (
                <p key={i} className="mt-4 max-w-[70ch] leading-relaxed text-slate">
                  {avsnitt}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 lg:mt-10">
            <NaeringsProfil
              navn={navn}
              næringer={innhold.topNæringer}
              total={innhold.stats.total}
            />
          </div>
        </div>
      </section>

      {/* 10. Kommunens tall som mørkt stat-panel (ferske Brreg/SSB-tall) */}
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

      {/* 11. NEDERST: dekning + intern lenking (fylkeslandemerke + nabokort) */}
      <section className="section-y-sm">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Dekning"
              title={`Vi hjelper bedrifter i hele ${fylke.visningsnavn}`}
              intro={`Heldigitalt samarbeid gir like tett oppfølging enten du driver i ${navn} eller i nabokommunen.`}
            />
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
                        {tall(naboStats.total)} virksomheter
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FinalCta
        title="Prøv oss på et spørsmål. Det er jo inkludert."
        text={`Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil koste for din bedrift i ${navn}, og om vi passer sammen.`}
      />
    </>
  );
}
