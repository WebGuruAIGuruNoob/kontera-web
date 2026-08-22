import type { Metadata } from "next";
import Link from "next/link";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { StatBand } from "@/components/sections/StatBand";
import { PromiseSplit } from "@/components/sections/PromiseSplit";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { PricingSection } from "@/components/sections/PricingSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FramedImage } from "@/components/FramedImage";
import { GarantiBand } from "@/components/sections/GarantiBand";
import { bilde, collageBilder } from "@/lib/bilder";
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
  const collage = collageBilder();
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
        extra={
          collage.length === 3 && (
            <div className="mt-10 grid max-w-xl grid-cols-3 items-start gap-3">
              <FramedImage
                src={collage[0].src}
                alt={collage[0].alt}
                className="translate-y-2"
                sizes="180px"
              />
              <FramedImage src={collage[1].src} alt={collage[1].alt} sizes="180px" />
              <FramedImage
                src={collage[2].src}
                alt={collage[2].alt}
                className="translate-y-4"
                sizes="180px"
              />
            </div>
          )
        }
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="En kort prat om behovet ditt — så får du et ærlig, konkret tilbud."
          />
        }
      />
      <ProofStrip />
      <ProblemSolution />
      <ServicesBento
        title="Fra bilag til årsoppgjør — samlet hos én fast fører"
        intro="Vi leverer alt en liten og mellomstor bedrift trenger: løpende regnskap, lønn, mva, årsoppgjør, rådgivning og hjelp til å starte selskap."
      />
      <StatBand
        title="Lite nok til å kjenne deg. Stort nok til alt."
        items={[
          { label: "Dedikerte ansatte", value: `${site.employees}`, numeric: site.employees },
          { label: "Statsautoriserte regnskapsførere", value: `${site.statsautoriserte}`, numeric: site.statsautoriserte },
          { label: "År i bransjen", value: "11", numeric: new Date().getFullYear() - site.founded },
          { label: "Kommuner vi dekker digitalt", value: "357", numeric: 357 },
          { label: "Kroner for korte spørsmål", value: "0", numeric: 0 },
          { label: "Faste kontaktpersoner per kunde", value: "1 + backup" },
        ]}
      />
      <PromiseSplit />
      <IndustryCards title="Spisskompetanse på bil, bygg, eiendom og netthandel" />
      <NumberedJourney leadEnabled={enabled} />
      <PricingSection leadEnabled={enabled} />
      <ComparisonTable />

      {/* Team-teaser: sanne tall, ingen stock-ansikter (ekthetsregel §9.3) */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="section-eyebrow">Menneskene bak</p>
            <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
              Seks personer. Null sentralbord.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-slate">
              Kontera er {site.employees} ansatte, hvorav{" "}
              {site.statsautoriserte} statsautoriserte regnskapsførere, fordelt
              på kontorene våre på Jar i Bærum og Ask i Gjerdrum. Hos oss får du
              ikke et køsystem – du får folk som vet hvem du er når du ringer.
            </p>
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

      <GarantiBand seed="forside" />
      <CtaBanner
        leadEnabled={enabled}
        text="Fem minutter på telefonen — så vet du om vi passer."
      />
      <Faq items={homeFaq} />
      <FinalCta />
    </>
  );
}
