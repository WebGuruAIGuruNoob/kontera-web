import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { SectionHeading } from "@/components/SectionHeading";
import { FramedImage } from "@/components/FramedImage";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { PhoneIcon, CheckIcon, Arrow } from "@/components/icons";
import { bilde } from "@/lib/bilder";
import { site } from "@/data/site";

/**
 * FORSIDE v3 — «Samtalen» (konseptvinner 2026-08-24, dom i data/…/w4o020fsm):
 * Én sammenhengende salgsside der hver seksjon besvarer neste tvil i den
 * rekkefølgen den faktisk oppstår, og alle veier ender i samme handling.
 * Semantisk fargebruk: AZUR = retning mot samtalen · TEAL = inkludert/trygghet
 * · NAVY = de to forpliktelsesøyeblikkene (pris + finale). Foto = bevisflater
 * med felles navy-duotone. CTA-budsjett: 6 punkter (dommerens tak).
 */

export const metadata: Metadata = {
  title: { absolute: "Regnskapsfører med fast kontaktperson | Kontera Regnskap AS" },
  description:
    "Regnskap, lønn og årsoppgjør fra et lite byrå med statsautoriserte regnskapsførere. Fast regnskapsfører som kjenner deg – korte spørsmål er inkludert i honoraret. Ring 960 00 400.",
  alternates: { canonical: "/" },
};

const homeFaq = [
  {
    q: "Hva koster det å ha Kontera som regnskapsfører?",
    a: "Prisen avhenger av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. Vi ligger på et middels prisnivå med høy kvalitet – og korte spørsmål underveis er inkludert i honoraret. Ring oss, så gir vi deg et konkret estimat.",
  },
  {
    q: "Hva betyr «fast regnskapsfører med fast stedfortreder» i praksis?",
    a: "Du får én fast person som gjør hele regnskapet ditt og er kontaktpersonen din. I tillegg blir en kollega kjent med bedriften din, slik at du ikke står uten hjelp ved ferie eller sykdom.",
  },
  {
    q: "Hvordan bytter jeg fra dagens regnskapsfører til dere?",
    a: "Du sier opp hos dagens byrå – vi tar resten: saldobalanse, historikk, tilganger og systemer. De fleste opplever byttet som overraskende enkelt. Beste tidspunkt er ved årsskiftet eller etter en mva-termin, men det går fint når som helst.",
  },
  {
    q: "Må jeg binde meg for lang tid?",
    a: "Nei. Vi tror på samarbeid som varer fordi det fungerer – ikke fordi kontrakten tvinger deg. Vilkårene avtaler vi tydelig før vi starter.",
  },
  {
    q: "Hvor holder dere til – og kan dere ta kunder i hele Norge?",
    a: "Vi har kontorer på Jar i Bærum og på Ask i Gjerdrum, og jobber digitalt med samarbeidspartnere i hele Norge. Bilag leveres digitalt, møter tas på video eller fysisk – som det passer deg.",
  },
  {
    q: "Hvilke bransjer kan dere?",
    a: "Vi har spisskompetanse på bilbransjen (særlig bruktbilsalg), håndverkere og bygg, eiendom og netthandel – og bred kompetanse som passer de fleste andre bransjer, inkludert borettslag og sameier.",
  },
  {
    q: "Hvilke regnskapssystemer bruker dere?",
    a: "Mest Tripletex og Uni Micro, men vi har god kjennskap til de fleste regnskapsprogram og ERP-systemer. Bruker du et system du trives med, kan vi som regel fortsette i det.",
  },
  {
    q: "Er dere autorisert?",
    a: "Ja. Kontera Regnskap AS er et autorisert regnskapsforetak under tilsyn av Finanstilsynet, og to av oss er statsautoriserte regnskapsførere. Du kan verifisere autorisasjonen i Finanstilsynets virksomhetsregister.",
  },
];

/** Graft fra Konsept B: «neste frister»-datastripe over lead-kortet (kun sanne datoer) */
function FristStripe() {
  const frister = [
    { hva: "Mva-melding, 3. termin", nar: "31. aug" },
    { hva: "A-melding for august", nar: "7. sep" },
  ];
  return (
    <div className="mb-3 rounded-xl border border-navy/10 bg-surface px-4 py-2.5">
      <p className="microlabel text-slate">
        Neste frister — vi holder oversikten
      </p>
      <ul className="mt-1.5 divide-y divide-navy/10">
        {frister.map((f) => (
          <li key={f.hva} className="flex items-baseline justify-between gap-3 py-1 text-sm">
            <span className="font-semibold text-ink">{f.hva}</span>
            <span className="shrink-0 font-bold tabular-nums text-navy">{f.nar}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const bentoTjenester = [
  { navn: "Lønnskjøring", tekst: "Riktig utbetalt og riktig innberettet — a-melding hver måned.", href: "/tjenester/lonn" },
  { navn: "Mva-melding", tekst: "Kontert, kontrollert og levert til hver termin.", href: "/tjenester/mva" },
  { navn: "Årsoppgjør", tekst: "Årsregnskap og skattemelding — levert i god tid.", href: "/tjenester/arsoppgjor" },
  { navn: "Rådgivning og oppstart", tekst: "Sparring på tall og veivalg — og hjelp til å starte selskap.", href: "/tjenester/radgivning" },
];

const bransjeChips = [
  { navn: "Bilforhandlere", fag: "avansemoms · lagerbiler · innbytte", href: "/bransjer/bilforhandlere" },
  { navn: "Håndverkere", fag: "prosjektregnskap · timelister · byggekort", href: "/bransjer/handverkere" },
  { navn: "Eiendom", fag: "avskrivninger · mva-justering · struktur", href: "/bransjer/eiendom" },
  { navn: "Netthandel", fag: "betalingsløsninger · avstemming · volum", href: "/bransjer/netthandel" },
];

export default function HomePage() {
  const enabled = leadEnabled();
  const kortFoto = bilde("team:samarbeid-2");
  const teamFoto = bilde("team:samarbeid-1");
  const bentoFoto = bilde("tjeneste2:regnskapsforing");
  const bytteFoto = bilde("blogg:bytte-regnskapsforer");

  return (
    <>
      {/* 1. HERO — løftet + handlingen. CTA #1 og #2. */}
      <HeroSplit
        showCtas
        eyebrow="Autorisert regnskapsforetak · 2 statsautoriserte regnskapsførere"
        title={
          <>
            Regnskap, lønn og årsoppgjør — med én fast regnskapsfører som{" "}
            <span className="hl-serif-italic">svarer</span>.
          </>
        }
        subtitle="Du får en regnskapsfører som kjenner bedriften din og holder fristene. Korte spørsmål og småavklaringer er inkludert i honoraret — og en fast stedfortreder kjenner deg også, så du ikke står uten hjelp ved ferie eller sykdom."
        aside={
          <div>
            <FristStripe />
            <LeadCard
              enabled={enabled}
              heading="Snakk med en regnskapsfører i dag"
              subheading="Uforpliktende samtale om behovet ditt — tydelige vilkår før oppstart."
              image={kortFoto ?? undefined}
            />
          </div>
        }
      />

      {/* 2. Tallene bak løftet — etterprøvbar troverdighet, kun sanne tall */}
      <section
        aria-label="Tallene bak løftet"
        className="border-y border-navy/10 bg-paper"
      >
        <div className="mx-auto max-w-6xl px-4 py-6">
          <dl
            data-reveal-group
            className="grid grid-cols-2 gap-y-5 text-center sm:grid-cols-3 md:flex md:justify-between md:text-left"
          >
            {[
              { tall: 6, etikett: "ansatte" },
              { tall: 2, etikett: "statsautoriserte" },
              { tall: 2015, etikett: "etablert", raa: true },
              { tall: 357, etikett: "kommuner dekket" },
              { tall: 15, etikett: "fylker" },
            ].map((s) => (
              <div key={s.etikett}>
                <dd className="font-display text-2xl font-bold tabular-nums text-navy md:text-3xl">
                  {s.raa ? s.tall : <span data-count-to={s.tall}>{s.tall}</span>}
                </dd>
                <dt className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {s.etikett}
                </dt>
              </div>
            ))}
            <div className="col-span-2 self-center sm:col-span-1">
              <a
                href="https://www.finanstilsynet.no/virksomhetsregisteret/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.14em] text-navy hover:text-azure"
              >
                Under tilsyn av Finanstilsynet
              </a>
            </div>
          </dl>
        </div>
      </section>

      {/* 3. Første tvil: «koster det å spørre?» — teal = inkludert-flaten. CTA #3. */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Det første folk spør om"
              title="Korte spørsmål er inkludert i honoraret."
              intro="Mange kvier seg for å kontakte regnskapsføreren sin fordi de er usikre på om spørsmålet utløser en faktura. Hos oss er korte spørsmål og småavklaringer en del av honoraret — du trenger ikke veie et spørsmål mot en regning."
            />
            <p className="mt-4 max-w-[60ch] leading-relaxed text-slate">
              Det er sånn et samarbeid skal fungere: terskelen for å ta kontakt
              skal være null, for det er i de små avklaringene feilene fanges
              tidlig.
            </p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-teal/10 p-7 lg:col-span-5 lg:col-start-8">
            <p className="microlabel text-navy/70">
              Eksempler på det du bare kan spørre om
            </p>
            <ul className="mt-3 divide-y divide-navy/10">
              {[
                "«Kan jeg føre dette som driftskostnad?»",
                "«Hva betyr denne mva-koden?»",
                "«Rekker vi fristen — eller bør vi be om utsettelse?»",
                "«Bør neste bil inn i selskapet eller privat?»",
              ].map((q) => (
                <li key={q} className="py-2.5 font-display text-base italic leading-snug text-navy">
                  {q}
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              data-cta="sporsmal-ring"
              className="mt-5 inline-block text-sm font-bold text-blue hover:underline"
            >
              Ring oss med et kort spørsmål — så hører du hvordan vi svarer{" "}
              <Arrow className="text-azure" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. Andre tvil: «hvem får jeg?» — modellen fast fører + stedfortreder */}
      <section className="section-y bg-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Menneskene bak tallene"
              title="Én fast regnskapsfører gjør hele regnskapet ditt — og en fast stedfortreder kjenner deg også."
              intro="Samme person hver gang, en som kjenner historikken i tallene dine. Og skulle regnskapsføreren din være på ferie eller bli syk, står du ikke uten hjelp — stedfortrederen kjenner allerede bedriften."
            />
            <ul className="mt-6">
              {[
                ["6 ansatte", "et lite team du blir kjent med"],
                ["2 statsautoriserte regnskapsførere", "regulert kvalitet i alle oppdrag"],
                ["Jar i Bærum og Ask i Gjerdrum", "kontorer — og kunder digitalt i hele landet"],
                ["Autorisert regnskapsforetak", "under tilsyn av Finanstilsynet"],
              ].map(([tittel, tekst]) => (
                <li key={tittel} className="border-t border-navy/10 py-3.5">
                  <span className="font-display font-bold text-navy">{tittel}</span>{" "}
                  <span className="text-sm text-slate">— {tekst}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6">
            {teamFoto && (
              <FramedImage
                src={teamFoto.src}
                alt={teamFoto.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            )}
            {/* Sidens ene overlapp: modellen som kort over bildekanten */}
            <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-navy/10 bg-surface p-4 lg:absolute lg:-bottom-6 lg:-left-6 lg:mt-0 lg:shadow-none">
              <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-bold text-navy">
                Din regnskapsfører
              </span>
              <Arrow className="text-azure" />
              <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-bold text-navy">
                Fast stedfortreder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. «Alt dette tar vi hånd om» — bento + bransjeflate med fagbegrep-lenker */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Tjenestene"
          title="Alt dette tar vi hånd om"
          intro="Hele regnskapsbehovet samlet hos én fast regnskapsfører — du velger hvor mye du vil gjøre selv."
        />
        <div data-reveal-group className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Featurecelle: løpende regnskap + fristløftet, med foto som bevisflate */}
          <Link
            href="/tjenester/regnskapsforing"
            className="group card-line card-line-hover relative overflow-hidden rounded-2xl md:col-span-7 md:row-span-2"
          >
            {bentoFoto && (
              <div className="relative h-44">
                <Image
                  src={bentoFoto.src}
                  alt={bentoFoto.alt}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/40 to-navy/10 mix-blend-multiply"
                />
              </div>
            )}
            <div className="p-7">
              <h3 className="font-display text-2xl font-bold text-navy">
                Løpende regnskap — og fristene som følger med
              </h3>
              <p className="mt-2 max-w-[50ch] leading-relaxed text-slate">
                Bokføring, avstemming og rapporter du forstår. Vi holder
                oversikt over mva-terminer, a-meldinger og årsfrister gjennom
                hele året — det er vårt ansvar, ikke ditt.
              </p>
              <span className="mt-4 inline-block text-sm font-bold text-blue group-hover:underline">
                Les mer <Arrow className="text-azure" />
              </span>
            </div>
          </Link>
          {bentoTjenester.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group card-line card-line-hover p-6 md:col-span-5"
            >
              <h3 className="flex items-baseline justify-between gap-3 font-sans text-base font-bold text-navy">
                {t.navn}
                <Arrow className="text-azure transition-transform group-hover:translate-x-0.5" />
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{t.tekst}</p>
            </Link>
          ))}
          {/* Bransjeflate: fagbegrep-rader som ekte lenker (SEO + kompetansesignal) */}
          <div className="rounded-2xl border border-navy/10 bg-mist p-6 md:col-span-12">
            <p className="font-sans text-sm font-bold text-ink">
              Spisskompetanse der regelverket er mest krevende — og bred
              erfaring for de fleste andre bransjer:
            </p>
            <div className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {bransjeChips.map((b) => (
                <Link key={b.href} href={b.href} className="group">
                  <span className="font-display text-base font-bold text-navy group-hover:text-blue">
                    {b.navn} <Arrow className="text-azure" />
                  </span>
                  <span className="microlabel mt-0.5 block !font-semibold text-slate">
                    {b.fag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* CTA #4: tynn banner i retningsfargen */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-y border-navy/10 py-5 sm:flex-row sm:items-center">
          <p className="font-sans font-bold text-navy [text-wrap:balance]">
            Usikker på hva bedriften din trenger? Det finner vi ut av sammen.
          </p>
          <a
            href={site.phoneHref}
            data-cta="bento-ring"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-blue-dark"
          >
            <PhoneIcon className="h-4 w-4" />
            Ring {site.phoneDisplay}
          </a>
        </div>
      </section>

      {/* 6. Tredje tvil: «hva koster det?» — navy-bånd nr. 1 (forpliktelse). CTA #5. */}
      <section className="section-y bg-navy text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="dark"
              eyebrow="Hva koster det?"
              title="Ærlig svar: det spørs. Og vi sier det rett ut."
              intro="Prisen settes av bilagsmengde, antall ansatte og hvor mye du vil gjøre selv. Vi ligger i midtsjiktet — vi konkurrerer ikke på laveste timepris, men på fast regnskapsfører, fast stedfortreder og at korte spørsmål er inkludert i honoraret."
            />
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/70">
              Etter en kort samtale om behovet ditt får du et konkret estimat
              med tydelige forutsetninger — som regel samme dag.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-7 text-ink lg:col-span-5 lg:col-start-8">
            <p className="microlabel text-navy/70">
              Dette er alltid inkludert
            </p>
            <ul className="mt-3">
              {[
                "Fast regnskapsfører som kjenner bedriften din",
                "Fast stedfortreder som også kjenner deg",
                "Korte spørsmål og småavklaringer",
                "Oversikt over alle offentlige frister",
                "Rapporter forklart på vanlig norsk",
              ].map((punkt) => (
                <li key={punkt} className="flex items-start gap-2.5 border-t border-navy/10 py-2.5 text-sm font-semibold text-ink first:border-t-0">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  {punkt}
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              data-cta="pris-ring"
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-blue px-6 py-3.5 font-sans font-bold text-white transition-colors hover:bg-blue-dark"
            >
              <PhoneIcon className="h-5 w-5" />
              Få et konkret estimat
            </a>
            <p className="mt-2 text-center text-xs text-slate">
              Uforpliktende · Tydelige vilkår før oppstart
            </p>
          </div>
        </div>
      </section>

      {/* 7. Fjerde tvil: «hvor vanskelig er byttet?» */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {bytteFoto && (
              <FramedImage
                src={bytteFoto.src}
                alt={bytteFoto.alt}
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            )}
          </div>
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Enkelt å bytte"
              title="Byttet krever mindre av deg enn du tror."
            />
            <ol className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              {[
                ["En uforpliktende prat", "Vi avklarer behovet ditt og gir et konkret estimat."],
                ["Vi håndterer overgangen", "Du sier opp hos dagens byrå — vi ordner saldobalanse, historikk, tilganger og systemer."],
                ["Fast fører fra dag én", "Regnskapsføreren din setter seg inn i bedriften — og stedfortrederen gjør det samme."],
              ].map(([tittel, tekst], i) => (
                <li key={tittel} className="border-t-2 border-navy/10 pt-4">
                  <span className="font-display text-2xl font-bold tabular-nums text-azure">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-sans text-base font-bold text-navy">{tittel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{tekst}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 8. Sammenligningen — for byttere */}
      <ComparisonTable />

      {/* 9. FAQ — ordnet etter tvilsstigen */}
      <Faq items={homeFaq} title="Spørsmål vi ofte får" />

      {/* 10. Finalen — CTA #6, lukker sirkelen til H1-ens «svarer» */}
      <FinalCta
        title="Klar for en regnskapsfører som svarer?"
        text="Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil koste for din bedrift, og om vi passer sammen."
      />
    </>
  );
}
