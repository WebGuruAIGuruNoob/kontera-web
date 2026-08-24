import type { Metadata } from "next";
import { leadEnabled } from "@/lib/lead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
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

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Prismodellen</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
            Dette avgjør hva regnskapet ditt koster
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Prisen avhenger av hvordan bedriften din drives. Fire forhold
            avgjør det meste:
          </p>
        </div>
        <div data-reveal-group className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {prisDrivere.map((driver, i) => (
            <div key={driver.tittel} className="border-t border-navy/10 py-6">
              <p className="font-display text-2xl font-bold tabular-nums text-azure">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 font-sans text-base font-bold text-navy">{driver.tittel}</h3>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-slate">{driver.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-h2 font-bold text-ink [text-wrap:balance]">
            Alltid inkludert i prisen
          </h2>
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
      <Faq items={prisFaq} title="Spørsmål og svar om pris" />
      <FinalCta
        title="Få et konkret tilbud — som regel samme dag"
        text="Ring oss eller send skjemaet, så tar vi en kort samtale om bilagsmengde og behov. Deretter får du et konkret tilbud med tydelige forutsetninger."
      />
    </>
  );
}
