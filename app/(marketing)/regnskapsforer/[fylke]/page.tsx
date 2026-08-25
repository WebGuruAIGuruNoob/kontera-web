import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fylker, getFylke } from "@/lib/geo";
import { buildFylkeInnhold } from "@/lib/geo-content";
import { generatedAt, tall } from "@/lib/geo-stats";
import { fagblokkBilde } from "@/lib/bilder";
import { EditorialSections } from "@/components/sections/EditorialSections";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { StatBand } from "@/components/sections/StatBand";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { PricingSection } from "@/components/sections/PricingSection";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { TrustRad } from "@/components/sections/TrustRad";
import { SectionHeading } from "@/components/SectionHeading";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { FramedImage } from "@/components/FramedImage";
import { fylkeBilde } from "@/lib/bilder";

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
    description: `Regnskap, lønn og årsoppgjør i ${fylke.visningsnavn} — ${tall(innhold.aggregert.total)} virksomheter i ${fylke.kommuner.length} kommuner. Fast kontaktperson, korte spørsmål inkludert. Ring 960 00 400.`,
    alternates: { canonical: `/regnskapsforer/${fylke.slug}` },
  };
}

/**
 * FYLKESSIDE — CRO-rekkefølge (Henriks ordre 2026-08-25): selg Kontera FØRST
 * (USP-hero, trustrad, tjenester, pris, fag, prosess, FAQ) — næringstall og
 * kommunevelger flyttet NEDERST som dokumentasjon og intern lenking.
 */
export default async function FylkePage({
  params,
}: {
  params: Promise<{ fylke: string }>;
}) {
  const { fylke: fylkeSlug } = await params;
  const fylke = getFylke(fylkeSlug);
  if (!fylke) notFound();

  const innhold = buildFylkeInnhold(fylke);
  const enabled = leadEnabled();
  const navn = fylke.visningsnavn;
  const regionFoto = fylkeBilde(fylke.slug);
  const kommunerSortert = [...fylke.kommuner].sort((a, b) =>
    a.visningsnavn.localeCompare(b.visningsnavn, "nb")
  );

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskapsfører i ${navn}`,
          description: `Regnskapstjenester for bedrifter i ${navn}`,
          url: `${site.url}/regnskapsforer/${fylke.slug}`,
          areaServed: `${navn} fylke`,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Regnskapsfører", href: "/regnskapsforer" },
          { name: navn, href: `/regnskapsforer/${fylke.slug}` },
        ]}
      />

      {/* 1. Hero: selgende H1 + tre Kontera-USP-er (aldri stedsdata i chips) */}
      <HeroSplit
        compact
        eyebrow={`Regnskapsfører i ${navn}`}
        title={`Regnskapsfører i ${navn} — hvorfor velge Kontera?`}
        subtitle={`Én fast regnskapsfører som kjenner bedriften din, en fast stedfortreder som kan tre inn, og korte spørsmål inkludert i honoraret — levert digitalt i hele ${navn}.`}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast regnskapsfører og stedfortreder",
          "Korte spørsmål inkludert i honoraret",
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

      {/* 3. Tjenestene (selger bredden) */}
      <ServicesBento
        title={`Alt bedriften i ${navn} trenger. Ingenting den ikke trenger.`}
        intro="Samme faste regnskapsfører tar helheten — du velger hvor mye du vil gjøre selv."
        geoSuffix={`i ${navn}`}
      />

      {/* 4. Pris-ærligheten (høyest intent) */}
      <PricingSection leadEnabled={enabled} stedsnavn={navn} />

      {/* 5. Fagblokker for fylkets største næringer */}
      {innhold.blokker.length > 0 && (
        <section className="section-y bg-cream">
          <div className="mx-auto max-w-6xl px-4">
            <EditorialSections
              blokker={innhold.blokker}
              bilder={(blokk, i) => (i < 2 && blokk.id ? fagblokkBilde(blokk.id) : null)}
            />
          </div>
        </section>
      )}

      {/* 6. Slik kommer du i gang */}
      <NumberedJourney leadEnabled={enabled} />

      {/* 7. FAQ */}
      <Faq
        items={innhold.faq}
        title={`Spørsmål og svar — regnskapsfører i ${navn}`}
      />

      {/* 8. NEDERST: næringslivet i tall (dokumentasjon, ikke salgsargument) */}
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
          {regionFoto && (
            <FramedImage
              src={regionFoto.src}
              alt={regionFoto.alt}
              caption={regionFoto.caption}
              className="lg:col-span-5 lg:mt-10"
            />
          )}
        </div>
      </section>

      <StatBand
        items={innhold.statCards.map((card, i) => ({
          label: card.label,
          value: card.value,
          numeric:
            i < 5 && /^[\d\s]+$/.test(card.value)
              ? Number(card.value.replace(/\s/g, ""))
              : undefined,
        }))}
        source={`Kilder: Brønnøysundregistrene (Enhetsregisteret) og SSB. Sist oppdatert ${generatedAt}.`}
      />

      {/* 9. NEDERST: kommunevelger i to nivåer (intern lenking) */}
      <section className="section-y">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Velg område"
            title={`Finn kommunen din — vi dekker hele ${navn}`}
            intro="Hver kommuneside gir deg lokale næringstall, den bransjeinnsikten som er mest relevant der, og svar på spørsmålene bedrifter i kommunen stiller oftest."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {innhold.toppKommuner.map(({ kommune, total }) => (
              <Link
                key={kommune.nr}
                href={`/regnskapsforer/${fylke.slug}/${kommune.slug}`}
                className="group card-line card-line-hover px-4 py-3.5"
              >
                <span className="block font-sans text-sm font-bold text-navy group-hover:text-blue">
                  Regnskapsfører i {kommune.visningsnavn}
                </span>
                <span className="mt-0.5 block text-xs tabular-nums text-slate">
                  {tall(total)} virksomheter
                </span>
              </Link>
            ))}
          </div>
          <ul className="mt-8 columns-2 gap-8 text-sm sm:columns-3 lg:columns-4 [&>li]:break-inside-avoid">
            {kommunerSortert
              .filter((k) => !innhold.toppKommuner.some((t) => t.kommune.nr === k.nr))
              .map((kommune) => (
                <li key={kommune.nr} className="py-1">
                  <Link
                    href={`/regnskapsforer/${fylke.slug}/${kommune.slug}`}
                    className="font-semibold text-navy hover:text-blue hover:underline"
                  >
                    Regnskapsfører i {kommune.visningsnavn}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title="Prøv oss på et spørsmål. Det er jo inkludert."
        text={`Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil koste for din bedrift i ${navn}, og om vi passer sammen.`}
      />
    </>
  );
}
