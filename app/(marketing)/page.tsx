import type { Metadata } from "next";
import Link from "next/link";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { PricingSection } from "@/components/sections/PricingSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FramedImage } from "@/components/FramedImage";
import { SectionHeading } from "@/components/SectionHeading";
import { bilde } from "@/lib/bilder";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Regnskapsfører med fast kontaktperson | Kontera Regnskap AS" },
  description:
    "Fast regnskapsfører som kjenner bedriften din. Regnskap, lønn og årsoppgjør fra et autorisert regnskapsforetak. Korte spørsmål inkludert. Ring 960 00 400.",
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    q: "Hva koster det å ha Kontera som regnskapsfører?",
    a: "Prisen avhenger av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. Vi ligger i midtsjiktet på pris: vi konkurrerer ikke på laveste timepris, men på at du får en erfaren, fast regnskapsfører i et autorisert regnskapsforetak med statsautoriserte regnskapsførere. Korte spørsmål og småavklaringer underveis er inkludert i honoraret. Ring oss, så gir vi deg et konkret estimat.",
  },
  {
    q: "Hvor holder dere til – og kan dere ta kunder i hele Norge?",
    a: "Vi har kontorer på Jar i Bærum og på Ask i Gjerdrum, og fører regnskap digitalt for kunder over hele landet. Bilag leveres digitalt, og møter tas på video eller på kontoret – som det passer deg.",
  },
  {
    q: "Hva betyr «fast regnskapsfører med fast stedfortreder» i praksis?",
    a: "Du får én fast regnskapsfører som gjør hele regnskapet ditt og er kontaktpersonen din. I tillegg kjenner en fast stedfortreder bedriften din, slik at du ikke står uten hjelp ved ferie eller sykdom.",
  },
  {
    q: "Er dere autorisert?",
    a: "Ja. Kontera Regnskap AS er et autorisert regnskapsforetak, og to av oss er statsautoriserte regnskapsførere. Du kan verifisere autorisasjonen i Finanstilsynets virksomhetsregister.",
  },
  {
    q: "Hvilke bransjer kan dere?",
    a: "Vi har spisskompetanse på bilbransjen (særlig bruktbilsalg), håndverkere og bygg, eiendom og netthandel – og bred kompetanse som passer de fleste andre bransjer, inkludert borettslag og sameier.",
  },
  {
    q: "Hvordan bytter jeg fra dagens regnskapsfører til dere?",
    a: "Du sier opp avtalen hos dagens byrå, og vi håndterer overgangen: saldobalanse, historikk, tilganger og systemer. I praksis krever byttet lite av deg – en oppsigelse og tilgang til systemene dine. Beste tidspunkt er ved årsskiftet eller etter en mva-termin, men det går fint når som helst.",
  },
  {
    q: "Hvilke regnskapssystemer bruker dere?",
    a: "Mest Tripletex og Uni Micro, men vi har god kjennskap til de fleste regnskapsprogram og ERP-systemer. Bruker du allerede et system som fungerer for bedriften, kan vi som regel fortsette i det.",
  },
  {
    q: "Må jeg binde meg for lang tid?",
    a: "Nei, vi opererer uten bindingstid. Vilkårene avtaler vi tydelig før oppstart, slik at du vet hva som gjelder og hva som inngår i honoraret.",
  },
];

export default function HomePage() {
  const enabled = leadEnabled();
  const kontorFoto = bilde("team:samarbeid-1");
  return (
    <>
      <HeroSplit
        eyebrow="Autorisert regnskapsforetak — to statsautoriserte regnskapsførere"
        title={
          <>
            Regnskap, lønn og årsoppgjør{" "}
            <span className="hl-serif-italic">med én fast regnskapsfører.</span>
          </>
        }
        subtitle="Du får en regnskapsfører som kjenner bedriften din, holder oversikt over fristene og svarer når du tar kontakt. Korte spørsmål og småavklaringer er inkludert i honoraret."
        chips={[
          `${site.employees} ansatte — et lite team du blir kjent med`,
          `${site.statsautoriserte} statsautoriserte`,
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="En kort prat om behovet ditt — så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />
      <ProblemSolution />
      <ServicesBento
        title="Fra bilag til årsoppgjør — samlet hos én fast regnskapsfører"
        intro="Vi leverer tjenestene en liten eller mellomstor bedrift trenger: løpende regnskap, lønn, merverdiavgift, årsoppgjør, rådgivning og hjelp til å starte selskap."
      />
      <IndustryCards title="Spisskompetanse på bil, bygg, eiendom og netthandel" />
      <NumberedJourney leadEnabled={enabled} />
      <PricingSection leadEnabled={enabled} />
      <ComparisonTable />

      {/* Team-teaser: sanne tall, ingen stock-ansikter (ekthetsregel §9.3) */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Menneskene bak"
              title={`${site.employees} personer — én av dem er din faste regnskapsfører`}
              intro={`Kontera er ${site.employees} ansatte, hvorav ${site.statsautoriserte} statsautoriserte regnskapsførere, fordelt på kontorene våre på Jar i Bærum og Ask i Gjerdrum. Du snakker med den samme regnskapsføreren hver gang — én som kjenner bedriften og historikken i tallene. En fast stedfortreder kjenner bedriften din også, slik at du ikke står uten hjelp ved ferie eller sykdom.`}
            />
            <Link
              href="/om-oss"
              className="mt-6 inline-block rounded-lg border border-navy/25 px-5 py-3 font-sans font-bold text-navy transition-colors hover:border-navy/50 hover:text-blue"
            >
              Bli kjent med oss →
            </Link>
          </div>
          <div className="lg:col-span-7">
            {kontorFoto && (
              <FramedImage
                src={kontorFoto.src}
                alt={kontorFoto.alt}
                className="mb-8"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            )}
            <ul data-reveal-group className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {[
              ["Siden " + site.founded, "Erfaring fra bil, bygg, eiendom, netthandel og en rekke andre bransjer."],
              ["To kontorer", "Jar i Bærum og Ask i Gjerdrum, og digitale kunder over hele landet."],
              ["Kort vei til svar", "Du ringer direkte til regnskapsføreren som har bedriften din."],
              ["Under offentlig tilsyn", "Autorisert regnskapsforetak under tilsyn av Finanstilsynet."],
            ].map(([title, text]) => (
              <li key={title} className="border-t border-navy/10 py-5">
                <p className="font-display text-lg font-bold text-navy">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={homeFaq} />
      <FinalCta />
    </>
  );
}
