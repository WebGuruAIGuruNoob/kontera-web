import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bransjer, getBransje } from "@/content/bransjer";
import { getTjeneste } from "@/content/tjenester";
import { site } from "@/data/site";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { Icon } from "@/components/Icon";
import { Arrow } from "@/components/icons";
import { FramedImage } from "@/components/FramedImage";
import { EditorialSections } from "@/components/sections/EditorialSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return bransjer.map((b) => ({ slug: b.slug }));
}

/** Rammede, tintede bransjefoto (DESIGNPLAN §2.4 — aldri fullbredde med overlay) */
const bransjeFoto: Record<string, string> = {
  bilforhandlere: "/images/pexels/bilforhandler-1.jpg",
  handverkere: "/images/pexels/handverker-4.jpg", // handverker-1 strøket i bilderevisjonen (BILDEPLAN §2)
  eiendom: "/images/pexels/eiendom-1.jpg",
  netthandel: "/images/pexels/netthandel-1.jpg",
  "borettslag-sameier": "/images/pexels/borettslag-1.jpg",
  tjenesteytende: "/images/pexels/konsulent-1.jpg",
};

/**
 * D-tonet finale per bransje («Inkludert»-stemmen). Kun sanne, tempererte
 * formuleringer — faller tilbake på FinalCta-standarden for ukjente slugs.
 */
const finale: Record<string, { title: string; text: string }> = {
  bilforhandlere: {
    title: "Prøv oss på avansemetoden. Det er jo inkludert.",
    text: "Én uforpliktende samtale om forretningen og bilene dine — så vet du hvordan vi jobber med bilregnskap, og hva det vil koste for deg.",
  },
  handverkere: {
    title: "Du tar byggeplassen. Vi tar tallene.",
    text: "Én samtale om prosjektene og folkene dine — så får du et konkret estimat med tydelige forutsetninger.",
  },
  eiendom: {
    title: "Ti år med justeringsplikt. Vi fører oversikten.",
    text: "Én samtale om porteføljen din — så vet du hva regnskapet vil koste, og hva du får igjen for det.",
  },
  netthandel: {
    title: "Du selger. Vi avstemmer.",
    text: "Én samtale om butikken og systemene dine — så får du et konkret estimat med tydelige forutsetninger.",
  },
  "borettslag-sameier": {
    title: "Styret trenger ikke være økonomer. Det er derfor vi finnes.",
    text: "Én samtale før neste styremøte — så vet dere hva det koster, og hva styret slipper å tenke på.",
  },
  tjenesteytende: {
    title: "Få bilag? Da er dette en kort samtale.",
    text: "Fortell oss hvor lite regnskap du har — så får du en pris som gjenspeiler akkurat det.",
  },
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

  const enabled = leadEnabled();
  const tjenesteLenker = b.relaterteTjenester
    .map((s) => getTjeneste(s))
    .filter((x): x is NonNullable<typeof x> => !!x);
  const bransjeFinale = finale[b.slug];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Regnskap for ${b.omtale}`,
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

      {/* ===== Hero på grønt bånd (bg-mist via HeroSplit) ===== */}
      <HeroSplit
        compact
        eyebrow="Bransje"
        title={b.tittel}
        subtitle={b.heroUndertekst}
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          enabled ? "Svar innen én arbeidsdag" : "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading={`Få pristilbud for ${b.virksomhetsord}`}
            subheading="En kort samtale om driften — så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />

      {/* ===== Paper: bransjens problemstillinger — beskrivelser i du-form,
           aldri fingerte sitater (ekthetsregel §9.1) ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="font-display text-h2 font-semibold text-navy [text-wrap:balance]">
              Dette går igjen hos {b.omtale}. Vi har sett det før.
            </h2>
            <ul data-reveal-group className="mt-6">
              {b.smerter.map((smerte) => (
                <li
                  key={smerte}
                  className="border-t border-navy/10 py-4 font-display text-lg leading-snug text-navy"
                >
                  {smerte}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate">
              Dette er problemstillingene vi jobber med for {b.omtale} til
              daglig. Regelverket er ulikt fra bransje til bransje — og
              kjennskapen til det avgjør hva regnskapet gir deg utover selve
              bokføringen.
            </p>
          </div>
          {bransjeFoto[b.slug] && (
            <FramedImage
              src={bransjeFoto[b.slug]}
              alt={`Regnskap for ${b.omtale} — illustrasjon fra bransjen`}
              className="lg:col-span-5"
            />
          )}
        </div>
      </section>

      {/* ===== Grønt bånd: fagseksjonene (sidens SEO-kjerne) ===== */}
      <section className="section-y bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <EditorialSections blokker={b.seksjoner} />
        </div>
      </section>

      {/* ===== Cream-bånd: hvite leveransekort + tjenestelenker ===== */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Dette gjør vi for {b.omtale}. Helt konkret.
          </h2>
          <div data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {b.slikHjelperVi.map((item) => (
              <div
                key={item.tittel}
                className="rounded-3xl bg-surface p-7 shadow-[0_4px_12px_rgba(28,79,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]"
              >
                <h3 className="font-display text-lg font-semibold text-navy">
                  {item.tittel}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">
                  {item.tekst}
                </p>
              </div>
            ))}
          </div>

          {tjenesteLenker.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-lg font-semibold text-navy">
                Tjenestene {b.omtale} bruker mest
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tjenesteLenker.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tjenester/${t.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-navy/10 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(28,79,45,0.10)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-navy">
                      <Icon name={t.ikon} className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-navy">
                      {t.navn}{" "}
                      <Arrow className="text-navy/50 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== Paper: oppstartsreisen ===== */}
      <NumberedJourney leadEnabled={enabled} />

      {/* ===== Varmt bånd: FAQ (via delt komponent) ===== */}
      <Faq items={b.faq} title="Spørsmål vi ofte får. Svar vi står for." />

      {/* ===== Mørk finale med D-tonet tittel per bransje ===== */}
      {bransjeFinale ? (
        <FinalCta title={bransjeFinale.title} text={bransjeFinale.text} />
      ) : (
        <FinalCta />
      )}
    </>
  );
}
