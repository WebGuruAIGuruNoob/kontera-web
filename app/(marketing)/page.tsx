import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { PromiseGrid } from "@/components/sections/PromiseGrid";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
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
  return (
    <>
      <Hero
        eyebrow="Regnskapsbyrå med statsautoriserte regnskapsførere"
        title="Regnskapet i orden. Alltid."
        subtitle="Du får en fast regnskapsfører som kjenner bedriften din, tar alle fristene og svarer når du ringer – uten å fakturere for korte spørsmål."
        image="/images/pexels/kontor-1.jpg"
        proof={[
          `${site.employees} dedikerte ansatte`,
          `${site.statsautoriserte} statsautoriserte`,
          "Fast kontaktperson + backup",
          "Kunder i hele Norge",
        ]}
      />
      <TrustBar />
      <ProblemSolution />
      <ServiceCards intro="Vi leverer alt en liten og mellomstor bedrift trenger: løpende regnskap, lønn, mva, årsoppgjør, rådgivning og hjelp til å starte selskap." />
      <PromiseGrid />
      <IndustryCards />
      <ProcessSteps />
      <PricingTeaser />

      {/* Team-teaser: sanne tall, ingen stock-ansikter (ekthetsregel §9.3) */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow">Menneskene bak</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
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
              className="mt-6 inline-block rounded-md border border-line px-5 py-3 font-display font-bold text-navy transition-colors hover:border-blue hover:text-blue"
            >
              Bli kjent med oss →
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Siden " + site.founded, "Solid erfaring fra bil, bygg, eiendom og en lang rekke andre bransjer."],
              ["To kontorer", "Jar i Bærum og Ask i Gjerdrum – og digitale kunder i hele landet."],
              ["Kort vei til svar", "Du ringer direkte til personen som fører regnskapet ditt."],
              ["Regulert kvalitet", "Autorisert regnskapsselskap under tilsyn av Finanstilsynet."],
            ].map(([title, text]) => (
              <li key={title} className="rounded-lg border border-line bg-mist p-5">
                <p className="font-display font-bold text-navy">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={homeFaq} />
      <FinalCta />
    </>
  );
}
