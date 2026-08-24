import type { Metadata } from "next";
import Link from "next/link";
import { leadEnabled } from "@/lib/lead";
import { bransjer } from "@/content/bransjer";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Regnskap for din bransje – bil, bygg, eiendom og netthandel",
  description:
    "Regnskap for bilforhandlere, håndverkere, eiendom og netthandel – og bred erfaring fra de fleste andre bransjer. Fast regnskapsfører. Ring 960 00 400.",
  alternates: { canonical: "/bransjer" },
};

/** Tint-rotasjon for bransjekortene («Inkludert»-designet: mist → cream → varm) */
const tinter = ["bg-mist", "bg-cream", "bg-varm", "bg-mist", "bg-cream"];

export default function BransjerPage() {
  const enabled = leadEnabled();
  const [feature, ...rest] = bransjer;
  return (
    <>
      <Breadcrumbs items={[{ name: "Bransjer", href: "/bransjer" }]} />

      {/* ===== Hero på grønt bånd ===== */}
      <HeroSplit
        compact
        eyebrow="Bransjer"
        title={
          <>
            Din bransje har sine{" "}
            <span className="hl-serif-italic">særregler</span>. Vi kan dem.
          </>
        }
        subtitle="Avansemetoden for bilforhandlere. Prosjektregnskap for byggmestere. Betalingsavstemming for nettbutikker. Særreglene er forskjellige — rutinen med å kunne dem er den samme."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bransje"
            subheading="Fortell oss kort om driften din, så får du et tilbud fra en regnskapsfører med erfaring fra bransjen."
          />
        }
      />

      {/* ===== Cream-bånd: bransjebento med tint-rotasjon ===== */}
      <section className="section-y-lg bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Bransjene vi kan i dybden. Bilbransjen først.
          </h2>
          <p className="mt-4 max-w-[38rem] leading-relaxed text-slate">
            Vi har spesialisert oss der regelverket er mest krevende — og har
            bred erfaring fra de fleste andre bransjer.
          </p>

          <div data-reveal-group className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-12">
            {/* Featurekort: flaggskipbransjen */}
            <Link
              href={`/bransjer/${feature.slug}`}
              className={`group rounded-3xl ${tinter[0]} border border-navy/10 p-7 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)] sm:col-span-12 lg:col-span-6 lg:row-span-2 lg:p-8`}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-navy shadow-[0_2px_8px_rgba(28,79,45,0.08)]">
                    <Icon name={feature.ikon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Spisskompetanse
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-navy">
                  {feature.navn}
                </h3>
                <p className="mt-2 max-w-[46ch] flex-1 leading-relaxed text-slate">
                  {feature.kortBeskrivelse} Avansemetoden brukt riktig er
                  forskjellen på god og svak margin per bil — og den krever
                  presis dokumentasjon på hvert eneste kjøretøy.
                </p>
                <span className="mt-5 text-sm font-semibold text-navy group-hover:underline">
                  Les mer{" "}
                  <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {rest.map((b, i) => (
              <Link
                key={b.slug}
                href={`/bransjer/${b.slug}`}
                className={`group rounded-3xl ${tinter[(i + 1) % tinter.length]} border border-navy/10 p-6 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)] ${
                  i === rest.length - 1
                    ? "sm:col-span-12 lg:col-span-6"
                    : "sm:col-span-6 lg:col-span-3"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-navy shadow-[0_2px_8px_rgba(28,79,45,0.08)]">
                  <Icon name={b.ikon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {b.navn}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">
                  {b.kortBeskrivelse}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-navy group-hover:underline">
                  Les mer{" "}
                  <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate">
            Driver du med noe annet? Vi fører regnskap for de fleste bransjer —{" "}
            <Link href="/kontakt" className="font-semibold text-navy hover:underline">
              ta kontakt
            </Link>
            , så avklarer vi det i én samtale.
          </p>
        </div>
      </section>

      {/* ===== Paper: oppstartsreisen ===== */}
      <NumberedJourney leadEnabled={enabled} />

      {/* ===== Mørk finale ===== */}
      <FinalCta
        title="Prøv oss på en særregel. Det er jo inkludert."
        text="Én uforpliktende samtale om bransjen din — så vet du hvordan vi jobber, og hva det vil koste for din bedrift."
      />
    </>
  );
}
