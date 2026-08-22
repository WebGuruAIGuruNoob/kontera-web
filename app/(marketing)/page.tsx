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
    "Regnskap, lønn og årsoppgjør fra et lite byrå med statsautoriserte regnskapsførere. Fast regnskapsfører som kjenner deg – og ingen faktura for korte spørsmål. Ring 960 00 400.",
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    q: "Hva koster det å ha Kontera som regnskapsfører?",
    a: "Prisen avhenger av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. Vi ligger på et middels prisnivå med høy kvalitet – og korte spørsmål underveis koster aldri noe ekstra. Ring oss, så gir vi deg et konkret estimat.",
  },
  {
    q: "Hvor holder dere til – og kan dere ta kunder i hele Norge?",
    a: "Vi har kontorer på Jar i Bærum og på Ask i Gjerdrum, og jobber digitalt med samarbeidspartnere i hele Norge. Bilag leveres digitalt, møter tas på video eller fysisk – som det passer deg.",
  },
  {
    q: "Hva betyr «fast regnskapsfører med backup» i praksis?",
    a: "Du får én fast person som gjør hele regnskapet ditt og er kontaktpersonen din. I tillegg blir en kollega kjent med bedriften din, slik at du aldri står uten hjelp ved ferie eller sykdom.",
  },
  {
    q: "Er dere autorisert?",
    a: "Ja. Kontera Regnskap AS er et autorisert regnskapsselskap, og to av oss er statsautoriserte regnskapsførere. Du kan verifisere autorisasjonen i Finanstilsynets virksomhetsregister.",
  },
  {
    q: "Hvilke bransjer kan dere?",
    a: "Vi har spisskompetanse på bilbransjen (særlig bruktbilsalg), håndverkere og bygg, eiendom og netthandel – og bred kompetanse som passer de fleste andre bransjer, inkludert borettslag og sameier.",
  },
  {
    q: "Hvordan bytter jeg fra dagens regnskapsfører til dere?",
    a: "Du sier opp hos dagens byrå – vi tar resten: saldobalanse, historikk, tilganger og systemer. De fleste opplever byttet som overraskende enkelt. Beste tidspunkt er ved årsskiftet eller etter en mva-termin, men det går fint når som helst.",
  },
  {
    q: "Hvilke regnskapssystemer bruker dere?",
    a: "Mest Tripletex og Uni Micro, men vi har god kjennskap til de fleste regnskapsprogram og ERP-systemer. Bruker du et system du trives med, kan vi som regel fortsette i det.",
  },
  {
    q: "Må jeg binde meg for lang tid?",
    a: "Nei. Vi tror på samarbeid som varer fordi det fungerer – ikke fordi kontrakten tvinger deg. Vilkårene avtaler vi tydelig før vi starter, uten overraskelser.",
  },
];

export default function HomePage() {
  const enabled = leadEnabled();
  const kontorFoto = bilde("team:samarbeid-1");
  return (
    <>
      <HeroSplit
        eyebrow="Autorisert regnskapsbyrå — to statsautoriserte regnskapsførere"
        title={
          <>
            Regnskapet i orden.{" "}
            <span className="hl-serif-italic">Spørsmål koster aldri ekstra.</span>
          </>
        }
        subtitle="Du får en fast regnskapsfører som kjenner bedriften din, tar alle fristene og svarer når du ringer – uten å fakturere for korte spørsmål."
        chips={[
          `${site.employees} ansatte — du kjenner alle`,
          `${site.statsautoriserte} statsautoriserte`,
          "Korte spørsmål: 0 kr",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="En kort prat om behovet ditt — så får du et ærlig, konkret tilbud."
          />
        }
      />
      <ProblemSolution />
      <ServicesBento
        title="Fra bilag til årsoppgjør — samlet hos én fast fører"
        intro="Vi leverer alt en liten og mellomstor bedrift trenger: løpende regnskap, lønn, mva, årsoppgjør, rådgivning og hjelp til å starte selskap."
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
              title="Seks personer. Null sentralbord."
              intro={`Kontera er ${site.employees} ansatte, hvorav ${site.statsautoriserte} statsautoriserte regnskapsførere, fordelt på kontorene våre på Jar i Bærum og Ask i Gjerdrum. Hos oss får du ikke et køsystem – du får folk som vet hvem du er når du ringer.`}
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
              ["Siden " + site.founded, "Solid erfaring fra bil, bygg, eiendom og en lang rekke andre bransjer."],
              ["To kontorer", "Jar i Bærum og Ask i Gjerdrum – og digitale kunder i hele landet."],
              ["Kort vei til svar", "Du ringer direkte til personen som fører regnskapet ditt."],
              ["Regulert kvalitet", "Autorisert regnskapsselskap under tilsyn av Finanstilsynet."],
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
