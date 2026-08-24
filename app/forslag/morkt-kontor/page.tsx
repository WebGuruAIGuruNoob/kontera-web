import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { bilde } from "@/lib/bilder";
import { leadEnabled } from "@/lib/lead";
import { PhoneIcon, CheckIcon, Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Forslag A — Mørkt kontor",
  robots: { index: false, follow: false },
};

/**
 * PROTOTYPE A «MØRKT KONTOR» — dark-first premium.
 * Hele siden på nesten-svart lerret (#071620), lys serif-typografi,
 * asur/teal som lysende instrument-aksenter, ett lyst papir-øyeblikk
 * (pris-ærligheten) midt på siden. Bryter skjelettet fra dagens forside:
 * ingen tekst-venstre/kort-høyre-hero, ingen kortrekker på papirhvitt.
 * Kun sanne tall og temperert språk (harde regler).
 */

const KANVAS = "bg-[#071620]";

/** Kun sanne, allerede vetterte frister (samme som dagens forside) */
const frister = [
  { hva: "Mva-melding, 3. termin", nar: "31. aug" },
  { hva: "A-melding for august", nar: "7. sep" },
];

const tjenester = [
  {
    nr: "01",
    navn: "Løpende regnskap",
    tekst: "Bokføring, avstemming og rapporter du forstår.",
    href: "/tjenester/regnskapsforing",
  },
  {
    nr: "02",
    navn: "Lønn",
    tekst: "Riktig utbetalt og riktig innberettet — a-melding hver måned.",
    href: "/tjenester/lonn",
  },
  {
    nr: "03",
    navn: "Mva",
    tekst: "Kontert, kontrollert og levert til hver termin.",
    href: "/tjenester/mva",
  },
  {
    nr: "04",
    navn: "Årsoppgjør",
    tekst: "Årsregnskap og skattemelding — levert i god tid.",
    href: "/tjenester/arsoppgjor",
  },
  {
    nr: "05",
    navn: "Rådgivning",
    tekst: "Sparring på tall og veivalg når du står i dem.",
    href: "/tjenester/radgivning",
  },
  {
    nr: "06",
    navn: "Starte selskap",
    tekst: "Fra valg av selskapsform til første faktura.",
    href: "/tjenester/starte-selskap",
  },
];

const bransjer = [
  { navn: "Bilforhandlere", fag: "avansemoms · lagerbiler", href: "/bransjer/bilforhandlere" },
  { navn: "Håndverkere", fag: "prosjektregnskap · timelister", href: "/bransjer/handverkere" },
  { navn: "Eiendom", fag: "avskrivninger · mva-justering", href: "/bransjer/eiendom" },
  { navn: "Netthandel", fag: "betalingsløsninger · avstemming", href: "/bransjer/netthandel" },
  { navn: "Borettslag og sameier", fag: "felleskostnader · styrerapport", href: "/bransjer/borettslag-sameier" },
  { navn: "Tjenesteytende", fag: "timeføring · prosjekt", href: "/bransjer/tjenesteytende" },
];

const byttesteg = [
  {
    tittel: "En uforpliktende prat",
    tekst: "Vi avklarer behovet ditt og gir et konkret estimat med tydelige forutsetninger.",
  },
  {
    tittel: "Vi håndterer overgangen",
    tekst: "Du sier opp hos dagens byrå — vi ordner saldobalanse, historikk, tilganger og systemer.",
  },
  {
    tittel: "Fast fører fra dag én",
    tekst: "Regnskapsføreren din setter seg inn i bedriften — og stedfortrederen gjør det samme.",
  },
];

/** Lysende hairline mellom mørke seksjoner */
function GlowLine() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-azure/25 to-transparent"
    />
  );
}

export default function MorktKontorPage() {
  const enabled = leadEnabled();
  const heroFoto = bilde("collage:miljo");
  const teamFoto = bilde("team:samarbeid-2");
  const bytteFoto = bilde("blogg:bytte-regnskapsforer");

  return (
    <div className={`${KANVAS} text-white`}>
      {/* ================= 1. HERO — massiv serif i mørket ================= */}
      <section className="relative overflow-hidden">
        {/* Ambient glød øverst — eneste «lyskilde» over skrivebordet */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_28rem_at_75%_-12%,rgba(7,160,228,0.16),transparent_65%),radial-gradient(40rem_24rem_at_10%_110%,rgba(126,190,197,0.08),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 lg:pb-24 lg:pt-24">
          <p className="section-eyebrow-dark">
            Autorisert regnskapsforetak · under tilsyn av Finanstilsynet · siden {site.founded}
          </p>

          <h1 className="mt-6 max-w-4xl">
            <span className="block font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.5rem)] font-semibold leading-snug text-white/75">
              Regnskap, lønn og årsoppgjør —
            </span>
            <span className="mt-1 block font-display text-[clamp(2.3rem,1.5rem+3.2vw,4rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              én fast regnskapsfører som
            </span>
            <span className="hl-gradient block text-[clamp(4.25rem,2rem+11vw,8rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              svarer.
            </span>
          </h1>

          <p className="mt-8 max-w-[52ch] leading-relaxed text-white/65">
            Én fast regnskapsfører kjenner bedriften din og holder fristene. En
            fast stedfortreder kjenner deg også, så du ikke står uten hjelp ved
            ferie eller sykdom. Og korte spørsmål er inkludert i honoraret.
          </p>

          {/* Telefonnummeret som selvlysende element — sidens primærhandling */}
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-12">
            <a
              href={site.phoneHref}
              data-cta="morkt-hero-ring"
              className="group inline-flex flex-col"
            >
              <span className="microlabel text-teal">
                Ring oss — en uforpliktende samtale
              </span>
              <span className="mt-1 inline-flex items-baseline gap-3 font-display text-[clamp(2.4rem,1.6rem+3.5vw,4rem)] font-bold tabular-nums leading-none text-azure drop-shadow-[0_0_26px_rgba(7,160,228,0.45)] transition-colors group-hover:text-white">
                {site.phoneDisplay}
                <Arrow className="text-[0.55em] text-teal transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            {enabled ? (
              <Link
                href="/kontakt"
                className="pb-1 text-sm font-semibold text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Eller be om et tilbud skriftlig
              </Link>
            ) : (
              <a
                href={site.emailHref}
                data-cta="morkt-hero-epost"
                className="pb-1 text-sm font-semibold text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
              >
                Eller skriv til {site.email}
              </a>
            )}
          </div>

          {/* Foto som mørk, tonet slab — glir inn i lerretet */}
          {heroFoto && (
            <div className="relative mt-14 h-60 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[38%] lg:rounded-none lg:ring-0">
              <Image
                src={heroFoto.src}
                alt={heroFoto.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover brightness-[0.55] saturate-[0.8]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/60 mix-blend-multiply" />
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-gradient-to-r from-[#071620] via-[#071620]/35 to-transparent lg:block"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071620]/70 via-transparent to-[#071620]/40 lg:hidden"
              />
            </div>
          )}
        </div>

        {/* Instrumentstripe: tallene bak løftet — kun sanne tall */}
        <div className="relative border-y border-white/10 bg-white/[0.02]">
          <dl className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-5 px-4 py-6">
            {[
              { tall: "6", etikett: "ansatte" },
              { tall: "2", etikett: "statsautoriserte" },
              { tall: "2015", etikett: "etablert" },
              { tall: "357", etikett: "kommuner dekket" },
              { tall: "15", etikett: "fylker" },
            ].map((s) => (
              <div key={s.etikett} className="flex items-baseline gap-2.5">
                <dd className="font-display text-2xl font-bold tabular-nums text-white [text-shadow:0_0_18px_rgba(7,160,228,0.35)]">
                  {s.tall}
                </dd>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/45">
                  {s.etikett}
                </dt>
              </div>
            ))}
            <a
              href="https://www.finanstilsynet.no/virksomhetsregisteret/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[0.68rem] font-bold uppercase tracking-[0.14em] text-teal transition-colors hover:text-white"
            >
              Verifiser autorisasjonen hos Finanstilsynet
            </a>
          </dl>
        </div>
      </section>

      {/* ============ 2. LØFTET + FRIST-INSTRUMENTET ============ */}
      <section aria-labelledby="loftet" className="section-y-lg relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="section-eyebrow-dark">Løftet</p>
            <h2
              id="loftet"
              className="mt-2 max-w-xl font-display text-h2 font-bold text-white [text-wrap:balance]"
            >
              Det du kan holde oss ansvarlige for.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.promises.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-azure/40"
                >
                  <CheckIcon className="h-5 w-5 text-teal" />
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frist-instrumentet: panelet som gløder svakt i mørket */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-azure/25 bg-[#0a2130] p-7 shadow-[0_0_70px_-20px_rgba(7,160,228,0.45)]">
              <p className="microlabel text-teal">
                Neste offentlige frister
              </p>
              <ul className="mt-4 divide-y divide-white/10">
                {frister.map((f) => (
                  <li
                    key={f.hva}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="font-semibold text-white/85">{f.hva}</span>
                    <span className="shrink-0 font-display text-xl font-bold tabular-nums text-azure drop-shadow-[0_0_14px_rgba(7,160,228,0.5)]">
                      {f.nar}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/55">
                Mva-terminer, a-meldinger og årsfrister er vårt ansvar gjennom
                hele året — ikke ditt. Regnskapsføreren din holder oversikten.
              </p>
              <a
                href={site.phoneHref}
                data-cta="morkt-frist-ring"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-azure transition-colors hover:text-white"
              >
                <PhoneIcon className="h-4 w-4" />
                Nærmer en frist seg? Ring {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ============ 3. TJENESTENE — hovedbok-indeks i mørket ============ */}
      <section aria-labelledby="tjenestene" className="section-y-lg">
        <div className="mx-auto max-w-6xl px-4">
          <p className="section-eyebrow-dark">Tjenestene</p>
          <h2
            id="tjenestene"
            className="mt-2 max-w-2xl font-display text-h2 font-bold text-white [text-wrap:balance]"
          >
            Alt regnskapet — ført av én person som kjenner deg.
          </h2>
          <ol className="mt-10 border-b border-white/10">
            {tjenester.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className="group flex flex-col gap-1.5 border-t border-white/10 py-6 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-6 sm:px-3"
                >
                  <span className="font-sans text-sm font-bold tabular-nums text-azure/70 sm:w-10 sm:shrink-0">
                    {t.nr}
                  </span>
                  <span className="font-display text-2xl font-bold text-white transition-colors group-hover:text-azure sm:text-3xl">
                    {t.navn}
                  </span>
                  <span className="text-sm leading-relaxed text-white/50 sm:ml-auto sm:max-w-[40ch] sm:text-right">
                    {t.tekst}
                  </span>
                  <Arrow className="hidden shrink-0 self-center text-azure transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </li>
            ))}
          </ol>

          {/* Bransjene: kompetansebånd */}
          <div className="mt-12">
            <h3 className="microlabel text-teal">
              Spisskompetanse der regelverket er mest krevende
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3">
              {bransjer.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="group inline-flex items-baseline gap-2.5 rounded-full border border-white/15 px-5 py-2.5 transition-colors hover:border-azure/60 hover:bg-white/[0.03]"
                  >
                    <span className="text-sm font-bold text-white/85 transition-colors group-hover:text-white">
                      {b.navn}
                    </span>
                    <span className="hidden text-xs text-white/40 sm:inline">
                      {b.fag}
                    </span>
                    <Arrow className="text-xs text-azure" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ 4. PAPIR-ØYEBLIKKET — pris-ærligheten i lyset ============ */}
      <section
        aria-labelledby="pris"
        className="border-y border-white/10 bg-paper text-ink"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <p className="section-eyebrow">Hva koster det?</p>
            <h2
              id="pris"
              className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]"
            >
              Ærlig svar: det spørs. Og vi sier det rett ut.
            </h2>
            <p className="mt-5 max-w-[58ch] leading-relaxed text-slate">
              Prisen settes av bilagsmengde, antall ansatte og hvor mye du vil
              gjøre selv. Vi ligger i midtsjiktet — vi konkurrerer ikke på
              laveste timepris, men på fast regnskapsfører, fast stedfortreder
              og at korte spørsmål er inkludert i honoraret.
            </p>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-slate">
              Etter en kort samtale om behovet ditt får du et konkret estimat
              med tydelige forutsetninger — som regel samme dag.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-2xl border border-navy/10 bg-surface p-7">
              <p className="microlabel text-navy/70">Inkludert i honoraret</p>
              <ul className="mt-3">
                {[
                  "Fast regnskapsfører som kjenner bedriften din",
                  "Fast stedfortreder som også kjenner deg",
                  "Korte spørsmål og småavklaringer",
                  "Oversikt over alle offentlige frister",
                  "Rapporter forklart på vanlig norsk",
                ].map((punkt) => (
                  <li
                    key={punkt}
                    className="flex items-start gap-2.5 border-t border-navy/10 py-2.5 text-sm font-semibold text-ink first:border-t-0"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {punkt}
                  </li>
                ))}
              </ul>
              <a
                href={site.phoneHref}
                data-cta="morkt-pris-ring"
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
        </div>
      </section>

      {/* ============ 5. BYTTET — tre steg som instrumenter ============ */}
      <section aria-labelledby="byttet" className="section-y-lg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            {bytteFoto && (
              <div className="relative h-64 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-80">
                <Image
                  src={bytteFoto.src}
                  alt={bytteFoto.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover brightness-[0.6] saturate-[0.85]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/55 mix-blend-multiply" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071620]/80 via-transparent to-transparent"
                />
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <p className="section-eyebrow-dark">Enkelt å bytte</p>
            <h2
              id="byttet"
              className="mt-2 max-w-xl font-display text-h2 font-bold text-white [text-wrap:balance]"
            >
              Byttet krever mindre av deg enn du tror.
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              {byttesteg.map((steg, i) => (
                <li key={steg.tittel} className="border-t border-white/15 pt-5">
                  <span className="font-display text-3xl font-bold tabular-nums text-azure drop-shadow-[0_0_16px_rgba(7,160,228,0.5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-sans text-base font-bold text-white">
                    {steg.tittel}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {steg.tekst}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ============ 6. MENNESKENE OG KONTORENE ============ */}
      <section aria-labelledby="menneskene" className="section-y-lg">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="section-eyebrow-dark">Menneskene bak tallene</p>
            <h2
              id="menneskene"
              className="mt-2 max-w-xl font-display text-h2 font-bold text-white [text-wrap:balance]"
            >
              Seks mennesker. To kontorer. Kunder i hele landet.
            </h2>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-white/60">
              Et lite team du blir kjent med — {site.employees} ansatte, hvorav{" "}
              {site.statsautoriserte} statsautoriserte regnskapsførere. Vi
              jobber digitalt med kunder over hele landet, og du er velkommen
              innom begge kontorene.
            </p>
            <ul className="mt-8 space-y-0">
              {site.offices.map((kontor) => (
                <li
                  key={kontor.id}
                  className="flex flex-col gap-1 border-t border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-lg font-bold text-white">
                    {kontor.label}
                  </span>
                  <a
                    href={kontor.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-azure"
                  >
                    {kontor.street}, {kontor.postalCode} {kontor.city}
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-1 border-t border-white/10 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-display text-lg font-bold text-white">
                  Digitalt
                </span>
                <span className="text-sm text-white/55">
                  357 kommuner · 15 fylker
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            {teamFoto && (
              <div className="relative h-64 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-96">
                <Image
                  src={teamFoto.src}
                  alt={teamFoto.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover brightness-[0.6] saturate-[0.85]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy-deep/55 mix-blend-multiply" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071620]/80 via-transparent to-transparent"
                />
                {/* Modellen: fast fører + stedfortreder, tegnet på bildet */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2.5 rounded-xl border border-white/15 bg-[#071620]/80 px-4 py-3 backdrop-blur-sm">
                  <span className="rounded-full bg-azure/15 px-3 py-1 text-xs font-bold text-azure">
                    Din regnskapsfører
                  </span>
                  <Arrow className="text-teal" />
                  <span className="rounded-full bg-teal/15 px-3 py-1 text-xs font-bold text-teal">
                    Fast stedfortreder
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ 7. FINALEN — nummeret enormt ============ */}
      <section
        aria-labelledby="kontakt"
        className="relative overflow-hidden border-t border-white/10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_26rem_at_50%_115%,rgba(7,160,228,0.18),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center lg:py-28">
          <p className="section-eyebrow-dark">Neste steg</p>
          <h2
            id="kontakt"
            className="mx-auto mt-3 max-w-2xl font-display text-h2 font-bold text-white [text-wrap:balance]"
          >
            Klar for en regnskapsfører som svarer?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] leading-relaxed text-white/60">
            Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil
            koste for din bedrift, og om vi passer sammen.
          </p>

          <a
            href={site.phoneHref}
            data-cta="morkt-finale-ring"
            className="group mt-10 inline-block"
          >
            <span className="block font-display text-[clamp(3.25rem,1.5rem+9vw,7.5rem)] font-bold tabular-nums leading-none tracking-[-0.02em] text-azure drop-shadow-[0_0_40px_rgba(7,160,228,0.5)] transition-colors group-hover:text-white">
              {site.phoneDisplay}
            </span>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-teal">
              <PhoneIcon className="h-4 w-4" />
              Trykk for å ringe
            </span>
          </a>

          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:flex-wrap">
            <a
              href={site.emailHref}
              data-cta="morkt-finale-epost"
              className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <span>Jar (Bærum) · Ask (Gjerdrum)</span>
            <span>Org.nr {site.orgNr}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
