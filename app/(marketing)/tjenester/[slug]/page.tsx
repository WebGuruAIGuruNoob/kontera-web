import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tjenester, getTjeneste } from "@/content/tjenester";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { SectionHeading } from "@/components/SectionHeading";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { CheckIcon, Arrow } from "@/components/icons";
import { FramedImage } from "@/components/FramedImage";
import { tjenesteBilde, tjeneste2Bilde } from "@/lib/bilder";
import { EditorialSections } from "@/components/sections/EditorialSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return tjenester.map((t) => ({ slug: t.slug }));
}

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

/**
 * D-tonede finaler per tjeneste («Inkludert»-stemmen) — FinalCta-komponenten
 * er delt, bare title/text varierer. Slugs matcher content/tjenester.
 */
const finaleVarianter: Record<string, { title: string; text: string }> = {
  regnskapsforing: {
    title: "Én samtale. Så vet du hva regnskapet ditt vil koste.",
    text: "Ring oss og fortell om bedriften din — du får et konkret estimat med tydelige forutsetninger, som regel samme dag.",
  },
  lonn: {
    title: "Neste lønnskjøring kan bli den siste du gjør selv.",
    text: "Ring oss før neste a-melding, så forteller vi hva det vil koste å la noen som gjør dette hver dag, ta det for deg.",
  },
  arsoppgjor: {
    title: "Årsoppgjøret kommer uansett. I år kan det komme i god tid.",
    text: "Ring oss, så får du et konkret tilbud på årsoppgjøret — enten vi fører regnskapet ditt eller du fører selv.",
  },
  mva: {
    title: "Neste mva-frist kommer. Den kan bli vårt ansvar.",
    text: "Ring oss om terminene, fradragene eller en tvangsmulkt du vil ha ryddet opp i. Samtalen forplikter deg ikke.",
  },
  radgivning: {
    title: "Korte spørsmål koster ikke ekstra. Begynn med et.",
    text: "Ring oss og legg frem det du grubler på — utbytte, likviditet eller holding. Så ser vi på tallene sammen.",
  },
  "starte-selskap": {
    title: "Start riktig. Det er enklere enn å rydde opp.",
    text: "Ring oss før du stifter, så går vi gjennom selskapsform, holdingspørsmålet og hva som må på plass det første året.",
  },
};

export default async function TjenestePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTjeneste(slug);
  if (!t) notFound();

  const enabled = leadEnabled();
  const tjenesteFoto = tjenesteBilde(t.slug);
  const tjenesteFoto2 = tjeneste2Bilde(t.slug);
  const finale = finaleVarianter[t.slug];
  const relaterte = t.relaterte
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  // Bento-spans for «hva inngår» — varierte celler, aldri uniform grid
  const spans = [
    "sm:col-span-6 lg:col-span-6",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-6 lg:col-span-3",
    "sm:col-span-12 lg:col-span-6",
    "sm:col-span-6 lg:col-span-6",
  ];

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
      {/* ===== Hero på grønt bånd (bg-mist ligger i HeroSplit) ===== */}
      <HeroSplit
        compact
        eyebrow={t.navn}
        title={t.tittel}
        subtitle={t.heroUndertekst}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          enabled ? "Svar innen én arbeidsdag" : "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud på ${t.navn.toLowerCase()}`}
            subheading="En kort samtale om behovet ditt — så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />

      {/* ===== Paper: passer for deg ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Hvem det passer for"
              title="Dette passer for deg"
            />
            <ul data-reveal-group className="mt-6">
              {t.passerFor.map((punkt) => (
                <li key={punkt} className="flex items-start gap-3 border-t border-navy/10 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed text-ink">{punkt}</span>
                </li>
              ))}
            </ul>
          </div>
          {tjenesteFoto && (
            <FramedImage
              src={tjenesteFoto.src}
              alt={tjenesteFoto.alt}
              className="lg:col-span-5 lg:mt-14"
            />
          )}
        </div>
      </section>

      {/* ===== Grønt bånd: hva som inngår (hvite kort på mist) ===== */}
      <section className="section-y bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Inkludert"
            title="Dette inngår i honoraret"
          />
          <div data-reveal-group className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12">
            {t.hvaInngar.map((item, i) => (
              <div
                key={item.tittel}
                className={`rounded-3xl bg-surface p-6 shadow-[0_4px_12px_rgba(28,79,45,0.06)] ${spans[i % spans.length]}`}
              >
                <h3 className="font-display text-lg font-semibold text-navy">{item.tittel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Cream-bånd: fagseksjonene (dybden bak løftene) ===== */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <EditorialSections
            blokker={t.seksjoner}
            bilder={(_, i) => (i === 1 ? tjenesteFoto2 : null)}
          />
          {relaterte.length > 0 && (
            // R-B: relaterte tjenester som lenkerad i fagseksjonen — ikke egen seksjon
            <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-navy/10 pt-6 text-sm">
              <span className="font-semibold text-slate">Relaterte tjenester:</span>
              {relaterte.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/tjenester/${rel.slug}`}
                  className="font-semibold text-navy underline-offset-4 hover:underline"
                >
                  {rel.navn} <Arrow />
                </Link>
              ))}
            </p>
          )}
        </div>
      </section>

      {/* ===== Paper: kom i gang ===== */}
      <NumberedJourney leadEnabled={enabled} />
      {/* ===== Varm-bånd: FAQ ===== */}
      <Faq items={t.faq} title={`Spørsmål og svar om ${t.navn.toLowerCase()}`} />
      {/* ===== Mørk finale med D-tonet variant per tjeneste ===== */}
      <FinalCta title={finale?.title} text={finale?.text} />
    </>
  );
}
