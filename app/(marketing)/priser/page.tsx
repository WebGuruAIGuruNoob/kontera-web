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
    "Middels prisnivå, høy kvalitet og ingen skjulte gebyrer. Se hva som påvirker prisen på regnskapsfører, og få et konkret tilbud tilpasset din bedrift. Ring 960 00 400.",
  alternates: { canonical: "/priser" },
};

/**
 * MERK (MASTERPLAN §14.7): Konkrete kronebeløp publiseres først når Henrik har
 * godkjent reelle priser. Siden forklarer prismodellen ærlig uten oppdiktede tall.
 */

const prisDrivere = [
  {
    tittel: "Bilagsmengde",
    tekst: "Antall inn- og utgående fakturaer, kvitteringer og transaksjoner er den største prisdriveren. Ryddige, digitale bilag gir lavere pris.",
  },
  {
    tittel: "Antall ansatte",
    tekst: "Lønnskjøring prises vanligvis per lønnsslipp. Få ansatte = lav kostnad; mange ansatte med variable timer krever mer.",
  },
  {
    tittel: "Hvor mye du gjør selv",
    tekst: "Fakturerer du selv og attesterer i appen, faller timene hos oss. Vil du slippe alt, tar vi alt — du velger arbeidsdelingen.",
  },
  {
    tittel: "Kompleksitet",
    tekst: "Bransje, mva-situasjon, prosjektregnskap, lager og antall selskaper påvirker arbeidsmengden — og dermed prisen.",
  },
];

const inkludert = [
  "Fast regnskapsfører som kjenner bedriften din",
  "Fast backup som også kjenner deg",
  "Korte spørsmål og små avklaringer — alltid inkludert",
  "Alle offentlige frister overvåket og overholdt",
  "Rapporter forklart på vanlig norsk",
  "Ingen skjulte gebyrer eller overraskelser på fakturaen",
];

const prisFaq = [
  {
    q: "Hvorfor oppgir dere ikke faste priser på nettsiden?",
    a: "Fordi riktig pris avhenger av bilagsmengde, ansatte og hvor mye du vil gjøre selv. I stedet for å lokke med en lav fra-pris som ikke gjelder deg, gir vi deg et konkret, ærlig tilbud etter en kort prat — som regel samme dag.",
  },
  {
    q: "Er dere billige eller dyre?",
    a: "Midt på treet — med kvalitet og oppfølging i toppsjiktet. Vi konkurrerer ikke på å være billigst, men på at du får en erfaren, fast regnskapsfører som kjenner deg, og aldri faktura for korte spørsmål.",
  },
  {
    q: "Fakturerer dere per time eller fast?",
    a: "Begge deler er mulig. Mange samarbeidspartnere foretrekker en fast månedspris for forutsigbarhet; andre betaler for medgått tid. Vi anbefaler modellen som passer din situasjon best — og er åpne om hva som lønner seg for deg.",
  },
  {
    q: "Koster det noe å ringe dere med et spørsmål?",
    a: "Nei. Korte spørsmål og små avklaringer er alltid inkludert. Det er en av de store fordelene med et lite, personlig byrå — og en del av samarbeidsmodellen vår.",
  },
  {
    q: "Hva koster det å bytte til dere?",
    a: "Selve byttet hjelper vi deg med uten ekstra kostnad. Vi henter saldobalanse, historikk og tilganger fra dagens byrå, så overgangen blir sømløs.",
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
            Ærlig pris. <span className="hl-serif-italic">Ingen</span> overraskelser.
          </>
        }
        subtitle="Vi ligger på et middels prisnivå med høy kvalitet — og gir deg et konkret tilbud tilpasset bedriften din etter en kort, uforpliktende prat."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
          "Korte spørsmål: 0 kr",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få prisen for din bedrift"
            subheading="En kort prat om bilagsmengde og behov — som regel har du tilbudet samme dag."
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
            Ingen bedrifter er like, og derfor er ingen priser like. Fire ting
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
            Alltid inkludert — uansett pakke
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
        text="Ring oss eller send skjemaet, så tar vi en kort prat om bilagsmengde og behov. Deretter får du et ærlig tilbud uten skjulte gebyrer."
      />
    </>
  );
}
