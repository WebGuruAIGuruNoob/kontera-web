import type { Metadata } from "next";
import { leadEnabled } from "@/lib/lead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Priser – slik settes prisen på regnskapsføring",
  description:
    "Se hva som påvirker prisen på regnskapsfører, og få et konkret tilbud tilpasset din bedrift etter en kort gjennomgang. Ring 960 00 400.",
  alternates: { canonical: "/priser" },
};

/**
 * MERK (MASTERPLAN §14.7): Konkrete kronebeløp publiseres først når Henrik har
 * godkjent reelle priser. Siden forklarer prismodellen uten oppdiktede tall.
 */

const prisDrivere = [
  {
    tittel: "Bilagsmengde",
    tekst: "Antall inn- og utgående fakturaer, kvitteringer og transaksjoner er den største prisdriveren. Ryddige, digitale bilag gir lavere pris.",
  },
  {
    tittel: "Antall ansatte",
    tekst: "Lønnskjøring prises vanligvis per lønnsslipp. Med få ansatte blir kostnaden lav; mange ansatte med variable timer krever mer arbeid.",
  },
  {
    tittel: "Hvor mye du gjør selv",
    tekst: "Fakturerer du selv og attesterer i appen, faller timene hos oss. Vil du overlate hele jobben til oss, gjør vi det. Du velger arbeidsdelingen.",
  },
  {
    tittel: "Kompleksitet",
    tekst: "Bransje, mva-situasjon, prosjektregnskap, lager og antall selskaper påvirker arbeidsmengden — og dermed prisen.",
  },
];

const inkludert = [
  "Fast regnskapsfører som kjenner bedriften din",
  "Fast stedfortreder som kjenner bedriften like godt",
  "Korte spørsmål og småavklaringer inkludert i honoraret",
  "Oversikt over mva, a-melding, skattemelding og årsregnskap",
  "Rapporter du får gjennomgått og forklart",
  "En faktura som viser det dere har avtalt på forhånd",
];

const prisFaq = [
  {
    q: "Hvorfor oppgir dere ikke faste priser på nettsiden?",
    a: "Fordi riktig pris avhenger av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. En fra-pris på nettsiden ville sjelden truffet din bedrift. Derfor får du et konkret tilbud med tydelige forutsetninger etter en kort gjennomgang — som regel samme dag.",
  },
  {
    q: "Er dere billige eller dyre?",
    a: "Vi ligger i midtsjiktet på pris. Vi konkurrerer ikke på laveste timepris, men på at du får en erfaren, fast regnskapsfører som kjenner bedriften din i et autorisert regnskapsforetak med statsautoriserte regnskapsførere.",
  },
  {
    q: "Fakturerer dere per time eller fast?",
    a: "Begge deler er mulig. Mange samarbeidspartnere foretrekker en fast månedspris for forutsigbarhet; andre betaler for medgått tid. Vi anbefaler modellen som passer din situasjon, og sier fra dersom den andre modellen ville lønnet seg bedre for deg.",
  },
  {
    q: "Koster det noe å ringe dere med et spørsmål?",
    a: "Nei. Korte spørsmål og småavklaringer er inkludert i honoraret. Vi fakturerer ikke per henvendelse, og du kan ta kontakt om en avklaring uten å tenke på hva den koster.",
  },
  {
    q: "Hva koster det å bytte til dere?",
    a: "Selve byttet hjelper vi deg med uten ekstra kostnad. Vi henter saldobalanse, historikk og tilganger fra dagens byrå, så du slipper å håndtere overgangen selv.",
  },
];

export default function PriserPage() {
  const enabled = leadEnabled();
  return (
    <>
      <Breadcrumbs items={[{ name: "Priser", href: "/priser" }]} />
      <HeroSplit
        compact
        eyebrow="Priser"
        title={
          <>
            Forutsigbar pris. <span className="hl-serif-italic">Ingen</span> overraskelser.
          </>
        }
        subtitle="Vi ligger i midtsjiktet på pris, og gir deg et konkret tilbud tilpasset bedriften din etter en kort gjennomgang av behovet ditt."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få prisen for din bedrift"
            subheading="En kort samtale om bilagsmengde og behov — som regel har du tilbudet samme dag."
          />
        }
      />

      {/* ===== Prisdriverne: fire hvite kort med gule tall ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Prismodellen"
          title="Hva koster det? Fire ting avgjør."
          intro="Ingen beløp før vi mener dem. Prisen settes etter hvordan bedriften din drives — og forklares så du skjønner hva du betaler for."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {prisDrivere.map((driver, i) => (
            <div
              key={driver.tittel}
              className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]"
            >
              <p className="font-display text-4xl font-semibold text-gul [text-shadow:0_1px_0_rgba(28,79,45,0.25)] tabular-nums">
                {i + 1}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                {driver.tittel}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{driver.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Inkludert-listen på cream-bånd ===== */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Inkludert"
            title="Honoraret dekker mer enn bokføringen."
          />
          <ul data-reveal-group className="mt-8 grid gap-3 md:grid-cols-2">
            {inkludert.map((punkt) => (
              <li key={punkt} className="card-line flex items-start gap-3 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-navy">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="leading-relaxed text-ink">{punkt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ComparisonTable />
      <Faq items={prisFaq} title="Vanlige spørsmål om pris" />
      <FinalCta
        title="Én samtale. Ett konkret tilbud."
        text="Vi går gjennom bilagsmengde, ansatte og hva du vil gjøre selv — så får du et tilbud med tydelige forutsetninger. Som regel samme dag."
      />
    </>
  );
}
