import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { bilde } from "@/lib/bilder";
import { leadEnabled } from "@/lib/lead";
import { PhoneIcon, CheckIcon, Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Forslag B — Regnskapet",
  robots: { index: false, follow: false },
};

/**
 * PROTOTYPE B «REGNSKAPET» (kun staging, noindex).
 * Forsiden formgitt som et vakkert satt årsregnskap: dokumenthode med org.nr
 * og stempel, innholdsfortegnelse som hero-navigasjon, seksjonene ført som
 * noter med notenummer i margen, summeringslinjer og foto som «vedlegg».
 * Serif bærer alt; grotesk brukes kun i marginalia. Helt annet skjelett enn
 * dagens forside — ingen hero-split, ingen kortrekker, ingen seksjonstabel.
 */

/* ==== Dokumentets farger (varmt dokumentpapir + blekk) ==== */
const INK = "text-[#16262f]";
const BODY = "text-[#3a4750]";
const MARGINALIA = "text-[#8a7c60]";
const HAIRLINE = "border-[#d9cfb4]";
const RULE = "border-[#16262f]";

/* ==== Innholdsdata (kun sanne tall og temperert språk) ==== */

const noter = [
  { id: "note-1", nr: 1, kort: "Fast fører og stedfortreder" },
  { id: "note-2", nr: 2, kort: "Korte spørsmål — inkludert i honoraret" },
  { id: "note-3", nr: 3, kort: "Tjenestene" },
  { id: "note-4", nr: 4, kort: "Prisprinsippet" },
  { id: "note-5", nr: 5, kort: "Bytte av byrå" },
  { id: "note-6", nr: 6, kort: "Kontakt og underskrift" },
] as const;

const nokkeltall = [
  { verdi: "2015", label: "Etablert" },
  { verdi: "6", label: "Ansatte" },
  { verdi: "2", label: "Statsautoriserte" },
  { verdi: "2", label: "Kontorer" },
  { verdi: "15", label: "Fylker" },
  { verdi: "357", label: "Kommuner dekket" },
] as const;

const tjenester = [
  {
    nr: "3.1",
    slug: "regnskapsforing",
    navn: "Regnskapsføring",
    tekst: "Løpende bokføring, avstemming og rapporter du faktisk forstår.",
  },
  {
    nr: "3.2",
    slug: "lonn",
    navn: "Lønn",
    tekst: "Lønnskjøring, a-melding og feriepenger — riktig og til fristen.",
  },
  {
    nr: "3.3",
    slug: "mva",
    navn: "Mva-melding",
    tekst: "Riktig mva-kode på hvert bilag, melding levert til hver termin.",
  },
  {
    nr: "3.4",
    slug: "arsoppgjor",
    navn: "Årsoppgjør",
    tekst: "Årsregnskap og skattemelding, ferdig avstemt og klart til signering.",
  },
  {
    nr: "3.5",
    slug: "radgivning",
    navn: "Økonomisk rådgivning",
    tekst: "Likviditet, budsjett, utbytte eller lønn — som del av samarbeidet.",
  },
  {
    nr: "3.6",
    slug: "starte-selskap",
    navn: "Starte selskap",
    tekst: "Selskapsform, stiftelse og regnskapssystem — riktig fra første dag.",
  },
] as const;

const bransjer = [
  { slug: "handverkere", navn: "Håndverkere og bygg" },
  { slug: "tjenesteytende", navn: "Konsulenter og tjenestebedrifter" },
  { slug: "netthandel", navn: "Netthandel" },
  { slug: "eiendom", navn: "Eiendom" },
  { slug: "borettslag-sameier", navn: "Borettslag og sameier" },
  { slug: "bilforhandlere", navn: "Bilforhandlere" },
] as const;

const sporsmalPoster = [
  { post: "«Kan jeg føre dette som utlegg?»", fores: "Inkludert i honoraret" },
  { post: "«Hvilken mva-sats gjelder her?»", fores: "Inkludert i honoraret" },
  { post: "«Rekker vi fristen — og hva trenger dere fra meg?»", fores: "Inkludert i honoraret" },
  { post: "Større rådgivningsoppdrag", fores: "Eget tilbud, avtales først" },
] as const;

const prisPrinsipper = [
  {
    nr: "4.1",
    tittel: "Midtsjiktet",
    tekst:
      "Vi er sjelden billigst, og vi ligger godt unna de dyreste. Vi konkurrerer på oppfølging og kvalitet i føringen — ikke på lavest mulig timepris.",
  },
  {
    nr: "4.2",
    tittel: "Prisen følger virkeligheten",
    tekst:
      "Bilagsmengde, antall ansatte og hvor mye du gjør selv avgjør honoraret. Derfor står det ikke beløp på denne siden — et ærlig tall krever at vi kjenner bedriften først.",
  },
  {
    nr: "4.3",
    tittel: "Korte spørsmål er inkludert",
    tekst:
      "Småavklaringer føres ikke som egne linjer på fakturaen. Se note 2 — prinsippet gjelder hele samarbeidet.",
  },
  {
    nr: "4.4",
    tittel: "Tilbud etter én samtale",
    tekst:
      "Ring og fortell om bedriften, så får du et konkret tilbud å ta stilling til — skriftlig, uten forpliktelse.",
  },
] as const;

const bytteSteg = [
  {
    nr: "5.1",
    tittel: "Én samtale",
    tekst:
      "Vi avklarer behov, regnskapssystem og tidspunkt. Et bytte legges gjerne til et månedsskifte eller årsskifte, slik at føringen får et rent skille.",
  },
  {
    nr: "5.2",
    tittel: "Vi henter historikken",
    tekst:
      "Med en fullmakt fra deg innhenter vi saldobalanse, åpne poster og bilagshistorikk fra dagens byrå. Du slipper å stå i midten av overleveringen.",
  },
  {
    nr: "5.3",
    tittel: "Frister uten avbrudd",
    tekst:
      "Mva-terminer, a-melding og lønnskjøringer løper videre mens byttet pågår. Fast fører og stedfortreder er på plass fra første dag.",
  },
] as const;

const frister = [
  "Mva-melding til hver termin",
  "A-melding og lønnskjøring hver måned",
  "Skattemelding med næringsspesifikasjon",
  "Årsregnskap til Regnskapsregisteret",
] as const;

/* ==== Dokument-byggeklosser ==== */

function Marginalia({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA} ${className}`}>
      {children}
    </p>
  );
}

/** Summeringslinje: enkel strek over, dobbel strek under — som i en hovedbok */
function SumLinje({ venstre, hoyre }: { venstre: ReactNode; hoyre?: ReactNode }) {
  return (
    <div
      className={`mt-3 flex items-baseline justify-between gap-4 border-t ${RULE} py-2 [border-bottom:3px_double_#16262f]`}
    >
      <p className={`font-display font-bold ${INK}`}>{venstre}</p>
      {hoyre ? <p className={`font-display font-bold tabular-nums ${INK}`}>{hoyre}</p> : null}
    </div>
  );
}

/** Note-seksjon: smal margkolonne med notenummer, innhold til høyre */
function Note({
  id,
  nr,
  tittel,
  children,
}: {
  id: string;
  nr: number;
  tittel: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-tittel`}
      className={`scroll-mt-28 border-t ${HAIRLINE} px-5 py-12 sm:px-10 lg:grid lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10 lg:px-14 lg:py-16`}
    >
      <div className="mb-4 flex items-baseline gap-2 lg:mb-0 lg:block lg:pt-2 lg:text-right">
        <Marginalia>Note</Marginalia>
        <p className={`font-display text-3xl font-bold tabular-nums ${INK} lg:mt-1 lg:text-4xl`} aria-hidden="true">
          {nr}
        </p>
      </div>
      <div className="min-w-0">
        <h2
          id={`${id}-tittel`}
          className={`font-display text-h2 font-bold ${INK} [text-wrap:balance]`}
        >
          {tittel}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Vedlegg({
  nr,
  tekst,
  img,
  aspect,
  sizes,
  priority = false,
  className = "",
}: {
  nr: number;
  tekst: string;
  img: { src: string; alt: string } | null;
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!img) return null;
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden border ${HAIRLINE} ${aspect}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      <figcaption className={`mt-2 border-b ${HAIRLINE} pb-2 font-sans text-[0.72rem] uppercase tracking-[0.12em] ${MARGINALIA}`}>
        Vedlegg {nr}: {tekst}
      </figcaption>
    </figure>
  );
}

/* ==== Siden ==== */

export default function RegnskapetPage() {
  const vedlegg1 = bilde("collage:halvnaert");
  const vedlegg2 = bilde("team:samarbeid-1");
  const vedlegg3 = bilde("blogg:bytte-regnskapsforer");
  const vedlegg4 = bilde("omoss:kontorlokale");
  const lead = leadEnabled();

  return (
    <div className="bg-[#e9e2cf] px-3 py-6 sm:px-6 sm:py-10 lg:py-14">
      {/* Selve dokumentarket */}
      <article className={`mx-auto max-w-[76rem] border border-[#cfc4a6] bg-[#f8f5ec] ${BODY}`}>
        {/* ==== Dokumenthode ==== */}
        <header
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 font-sans text-[0.68rem] font-bold uppercase tracking-[0.14em] ${INK} sm:px-10 lg:px-14 [border-bottom:3px_double_#16262f]`}
        >
          <p>{site.legalName}</p>
          <p className="tabular-nums">Org.nr {site.orgNr}</p>
          <p className="hidden sm:block">Autorisert regnskapsforetak</p>
          <p className="tabular-nums">Ført 2026</p>
        </header>

        {/* ==== Tittelblad (hero) ==== */}
        <section
          aria-label="Tittelblad"
          className="relative px-5 pb-10 pt-10 sm:px-10 lg:px-14 lg:pb-14 lg:pt-16"
        >
          {/* «Stemplet» — CSS-emblem, lett rotert */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-8 hidden h-36 w-36 rotate-[-8deg] items-center justify-center rounded-full border-[3px] border-[#0c71c3]/55 mix-blend-multiply md:flex lg:right-14 lg:top-12"
          >
            <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full border border-[#0c71c3]/55 p-3 text-center">
              <p className="font-sans text-[0.58rem] font-bold uppercase leading-snug tracking-[0.18em] text-[#0c71c3]/75">
                Autorisert
                <br />
                regnskaps-
                <br />
                foretak
                <br />
                · est. 2015 ·
              </p>
            </div>
          </div>

          <Marginalia>Forside · regnskap for små og mellomstore bedrifter</Marginalia>

          <h1
            className={`mt-4 max-w-[17ch] font-display text-display font-bold ${INK} [text-wrap:balance]`}
          >
            Regnskapet ditt — ført av en fast fører som tar telefonen.
          </h1>

          <div className="mt-10 gap-12 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            {/* Venstre: ingress + henvendelseslinje */}
            <div>
              <p className="max-w-[58ch] font-display text-lg leading-[1.7]">
                {site.legalName} er et autorisert regnskapsforetak, etablert i 2015, med{" "}
                {site.employees} ansatte og {site.statsautoriserte} statsautoriserte
                regnskapsførere. Vi fører regnskap for bedrifter i hele landet — og
                denne siden er satt opp som det vi kan best: et ryddig regnskap.
                Alt vi lover, står i notene.
              </p>

              {/* Henvendelseslinjen — ført som en kontolinje, men leselig og selgende */}
              <div className={`mt-9 border-y-2 ${RULE} py-5`}>
                <Marginalia>Linje for henvendelser · besvares av regnskapsførere</Marginalia>
                <a
                  href={site.phoneHref}
                  data-cta="regnskapet-hero-ring"
                  className="mt-1 inline-flex items-center gap-3 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-bold tabular-nums leading-none text-blue hover:text-blue-dark"
                >
                  <PhoneIcon className="h-8 w-8 shrink-0 lg:h-10 lg:w-10" />
                  {site.phoneDisplay}
                </a>
                <p className="mt-3 font-sans text-sm text-[#5d6b74]">
                  Korte spørsmål er inkludert i honoraret. Foretrekker du skrift:{" "}
                  <a href={site.emailHref} className="font-semibold text-blue underline underline-offset-2">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Høyre: innholdsfortegnelsen som fungerende ankernav */}
            <nav
              aria-labelledby="innholdsfortegnelse"
              className={`mt-10 border ${HAIRLINE} bg-[#f3eedd] p-6 sm:p-8 lg:mt-0`}
            >
              <h2
                id="innholdsfortegnelse"
                className={`font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA}`}
              >
                Innholdsfortegnelse
              </h2>
              <ol className="mt-3">
                {noter.map((n, i) => (
                  <li key={n.id} className={i > 0 ? `border-t ${HAIRLINE}` : undefined}>
                    <a
                      href={`#${n.id}`}
                      className="group flex items-baseline gap-3 py-3"
                    >
                      <span className={`font-sans text-[0.72rem] font-bold tabular-nums ${MARGINALIA}`}>
                        Note {n.nr}
                      </span>
                      <span className={`font-display font-bold ${INK} group-hover:text-blue`}>
                        {n.kort}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mx-1 flex-1 self-end border-b border-dotted border-[#a99b77] mb-[0.35em]"
                      />
                      <span aria-hidden="true" className={`font-sans text-xs ${MARGINALIA}`}>
                        ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Nøkkeltall — summeringsstripe */}
          <div className="mt-12">
            <h2 className="sr-only-focusable">Nøkkeltall</h2>
            <Marginalia>Nøkkeltall · verifisert mot Brønnøysundregistrene</Marginalia>
            <dl
              className={`mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t ${RULE} py-5 sm:grid-cols-3 lg:grid-cols-6 [border-bottom:3px_double_#16262f]`}
            >
              {nokkeltall.map((t) => (
                <div key={t.label}>
                  <dd className={`font-display text-4xl font-bold tabular-nums ${INK}`}>
                    {t.verdi}
                  </dd>
                  <dt className={`mt-1 font-sans text-[0.68rem] font-bold uppercase tracking-[0.14em] ${MARGINALIA}`}>
                    {t.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <Vedlegg
            nr={1}
            tekst="Bilagene — grunnlaget for alt som står i notene"
            img={vedlegg1}
            aspect="aspect-[21/9]"
            sizes="(min-width: 1280px) 1140px, 100vw"
            priority
            className="mt-10"
          />
        </section>

        {/* ==== Note 1 ==== */}
        <Note id="note-1" nr={1} tittel="Fast regnskapsfører og stedfortreder">
          <div className="mt-6 gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <p className="max-w-[58ch] font-display leading-[1.75]">
                Hos oss er ikke «kontaktperson» en felles innboks. Du får én navngitt
                regnskapsfører som fører hele regnskapet ditt og kjenner historikken i
                tallene — og en fast stedfortreder som også kjenner bedriften, slik at
                ferie eller sykdom ikke setter regnskapet på vent.
              </p>

              <div className={`mt-7 divide-y divide-[#d9cfb4] border-t ${HAIRLINE}`}>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <p className="font-display">Fast regnskapsfører som fører regnskapet</p>
                  <p className={`font-display font-bold tabular-nums ${INK}`}>1</p>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <p className="font-display">Fast stedfortreder som kjenner bedriften</p>
                  <p className={`font-display font-bold tabular-nums ${INK}`}>1</p>
                </div>
              </div>
              <SumLinje venstre="Personer som kjenner regnskapet ditt" hoyre="2" />

              <h3 className={`mt-9 font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA}`}>
                Fristene følger med føringen
              </h3>
              <ul className="mt-3 space-y-2">
                {frister.map((f) => (
                  <li key={f} className="flex items-baseline gap-3 font-display">
                    <CheckIcon className="h-4 w-4 shrink-0 translate-y-[2px] text-blue" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[58ch] font-sans text-sm text-[#5d6b74]">
                Vi holder oversikten over fristene dine og sier fra i god tid om det vi
                trenger fra deg — du skal ikke måtte huske terminene selv.
              </p>
            </div>

            <Vedlegg
              nr={2}
              tekst="Fire øyne på samme regnskap — fører og stedfortreder"
              img={vedlegg2}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="mt-8 lg:mt-2"
            />
          </div>
        </Note>

        {/* ==== Note 2 ==== */}
        <Note id="note-2" nr={2} tittel="Korte spørsmål — inkludert i honoraret">
          <p className="mt-6 max-w-[58ch] font-display leading-[1.75]">
            Den vanligste grunnen til å utsette en telefon til regnskapsføreren, er
            usikkerheten om hva den koster. Den posten har vi tatt ut av regnskapet:
            korte spørsmål og småavklaringer er inkludert i honoraret, og utløser ikke
            en egen faktura.
          </p>

          <div className={`mt-7 max-w-2xl divide-y divide-[#d9cfb4] border-t ${HAIRLINE}`}>
            <div className="flex items-baseline justify-between gap-4 py-2">
              <Marginalia>Postering</Marginalia>
              <Marginalia>Føres som</Marginalia>
            </div>
            {sporsmalPoster.map((r) => (
              <div key={r.post} className="flex items-baseline justify-between gap-4 py-3">
                <p className="font-display">{r.post}</p>
                <p className="text-right font-sans text-[0.72rem] font-bold uppercase tracking-[0.1em] text-blue">
                  {r.fores}
                </p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl">
            <SumLinje venstre="Terskelen for å ringe skal være lav" />
          </div>

          <p className="mt-5 font-sans text-sm text-[#5d6b74]">
            Prøv prinsippet:{" "}
            <a
              href={site.phoneHref}
              data-cta="regnskapet-note2-ring"
              className="font-bold text-blue underline underline-offset-2 hover:text-blue-dark"
            >
              ring {site.phoneDisplay}
            </a>{" "}
            med et kort spørsmål.
          </p>
        </Note>

        {/* ==== Note 3 ==== */}
        <Note id="note-3" nr={3} tittel="Tjenestene">
          <p className="mt-6 max-w-[58ch] font-display leading-[1.75]">
            Seks tjenester, ett samarbeid. De fleste kundene samler alt hos sin faste
            fører — men hver linje kan også leveres for seg.
          </p>

          <ul className={`mt-7 border-t ${HAIRLINE}`}>
            {tjenester.map((t) => (
              <li key={t.slug} className={`border-b ${HAIRLINE}`}>
                <Link
                  href={`/tjenester/${t.slug}`}
                  className="group grid grid-cols-[2.6rem_minmax(0,1fr)_auto] items-baseline gap-3 py-4 sm:grid-cols-[3.2rem_minmax(0,1fr)_auto]"
                >
                  <span className={`font-sans text-sm font-bold tabular-nums ${MARGINALIA}`}>
                    {t.nr}
                  </span>
                  <span className="min-w-0">
                    <span className={`font-display text-xl font-bold ${INK} group-hover:text-blue`}>
                      {t.navn}
                    </span>
                    <span className="mt-0.5 block font-sans text-sm text-[#5d6b74]">
                      {t.tekst}
                    </span>
                  </span>
                  <Arrow className="text-blue transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>

          <h3 className={`mt-9 font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA}`}>
            Spesifikasjon · bransjer vi fører mye for
          </h3>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-2 font-display leading-relaxed">
            {bransjer.map((b, i) => (
              <span key={b.slug} className="inline-flex items-baseline">
                <Link
                  href={`/bransjer/${b.slug}`}
                  className={`font-bold ${INK} underline decoration-[#a99b77] decoration-dotted underline-offset-4 hover:text-blue hover:decoration-blue`}
                >
                  {b.navn}
                </Link>
                {i < bransjer.length - 1 ? <span aria-hidden="true">,&nbsp;</span> : <span aria-hidden="true">.</span>}
              </span>
            ))}
          </p>
          <p className="mt-4 font-sans text-sm">
            <Link href="/bransjer" className="font-bold text-blue hover:underline">
              Alle bransjer <Arrow />
            </Link>
          </p>
        </Note>

        {/* ==== Note 4 ==== */}
        <Note id="note-4" nr={4} tittel="Prisprinsippet">
          <p className="mt-6 max-w-[58ch] font-display leading-[1.75]">
            Vi publiserer ikke beløp — ikke fordi prisen er hemmelig, men fordi et
            ærlig tall krever at vi kjenner bilagsmengden og kompleksiteten din.
            Prinsippene bak honoraret er derimot faste:
          </p>

          <dl className={`mt-7 max-w-2xl border-t ${HAIRLINE}`}>
            {prisPrinsipper.map((p) => (
              <div
                key={p.nr}
                className={`grid grid-cols-[2.6rem_minmax(0,1fr)] gap-3 border-b ${HAIRLINE} py-4 sm:grid-cols-[3.2rem_minmax(0,1fr)]`}
              >
                <dt className={`font-sans text-sm font-bold tabular-nums ${MARGINALIA}`}>{p.nr}</dt>
                <dd>
                  <p className={`font-display text-lg font-bold ${INK}`}>{p.tittel}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-[#5d6b74]">{p.tekst}</p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 font-sans text-sm">
            <Link href="/priser" className="font-bold text-blue hover:underline">
              Hele prisprinsippet <Arrow />
            </Link>
          </p>
        </Note>

        {/* ==== Note 5 ==== */}
        <Note id="note-5" nr={5} tittel="Bytte av byrå">
          <div className="mt-6 gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <p className="max-w-[58ch] font-display leading-[1.75]">
                Å bytte regnskapsfører er en mindre operasjon enn de fleste tror — og
                mesteparten av jobben er vårt ansvar, ikke ditt. Overgangen føres i tre
                poster:
              </p>

              <ol className={`mt-7 border-t ${HAIRLINE}`}>
                {bytteSteg.map((s) => (
                  <li
                    key={s.nr}
                    className={`grid grid-cols-[2.6rem_minmax(0,1fr)] gap-3 border-b ${HAIRLINE} py-4 sm:grid-cols-[3.2rem_minmax(0,1fr)]`}
                  >
                    <span className={`font-sans text-sm font-bold tabular-nums ${MARGINALIA}`}>
                      {s.nr}
                    </span>
                    <span>
                      <span className={`font-display text-lg font-bold ${INK}`}>{s.tittel}</span>
                      <span className="mt-1 block font-sans text-sm leading-relaxed text-[#5d6b74]">
                        {s.tekst}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <SumLinje venstre="Din innsats i byttet" hoyre="Én samtale og én fullmakt" />
            </div>

            <Vedlegg
              nr={3}
              tekst="Overleveringen — historikk og bilag følger med"
              img={vedlegg3}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="mt-8 lg:mt-2"
            />
          </div>
        </Note>

        {/* ==== Note 6 ==== */}
        <Note id="note-6" nr={6} tittel="Kontakt og underskrift">
          <p className="mt-6 max-w-[58ch] font-display leading-[1.75]">
            De fleste samarbeid her har startet på samme måte: en kort samtale om
            bedriften. Ring, så finner vi ut om vi passer for hverandre — og du får et
            konkret tilbud å ta stilling til.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={site.phoneHref}
              data-cta="regnskapet-kontakt-ring"
              className="inline-flex items-center gap-3 bg-blue px-7 py-4 font-sans text-lg font-bold text-white hover:bg-blue-dark"
            >
              <PhoneIcon className="h-5 w-5" />
              Ring {site.phoneDisplay}
            </a>
            {lead ? (
              <Link
                href="/kontakt"
                className={`inline-flex items-center gap-2 border-2 ${RULE} px-7 py-[0.85rem] font-sans text-lg font-bold ${INK} hover:bg-[#efe9d6]`}
              >
                Be om tilbud skriftlig <Arrow />
              </Link>
            ) : (
              <a
                href={site.emailHref}
                className={`inline-flex items-center gap-2 border-2 ${RULE} px-7 py-[0.85rem] font-sans text-lg font-bold ${INK} hover:bg-[#efe9d6]`}
              >
                {site.email}
              </a>
            )}
          </div>

          <div className="mt-10 gap-10 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <h3 className={`font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA}`}>
                Forretningssteder
              </h3>
              <div className={`mt-3 grid gap-x-8 border-t ${HAIRLINE} sm:grid-cols-2`}>
                {site.offices.map((kontor) => (
                  <div key={kontor.id} className={`border-b ${HAIRLINE} py-4`}>
                    <p className={`font-display text-lg font-bold ${INK}`}>{kontor.label}</p>
                    <p className="mt-1 font-sans text-sm text-[#5d6b74]">
                      {kontor.street}, {kontor.postalCode} {kontor.city}
                    </p>
                    <a
                      href={kontor.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-sans text-sm font-bold text-blue hover:underline"
                    >
                      Vis i kart <Arrow />
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-[58ch] font-sans text-sm leading-relaxed text-[#5d6b74]">
                Kontorene ligger på Jar i Bærum og Ask i Gjerdrum — men føringen skjer
                digitalt, og vi følger opp kunder i {nokkeltall[5].verdi} kommuner over
                hele landet.{" "}
                <Link href="/regnskapsforer" className="font-bold text-blue hover:underline">
                  Regnskapsfører i ditt fylke <Arrow />
                </Link>
              </p>

              {/* Underskriftslinje som i et årsregnskap */}
              <div className={`mt-10 max-w-md border-t ${RULE} pt-3`}>
                <p className={`font-display text-lg font-bold ${INK}`}>Jar / Gjerdrum, 2026</p>
                <p className={`mt-1 font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] ${MARGINALIA}`}>
                  {site.legalName} · Org.nr {site.orgNr} · Autorisert regnskapsforetak
                </p>
              </div>
            </div>

            <Vedlegg
              nr={4}
              tekst="Ryddig pult, ryddige tall"
              img={vedlegg4}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 420px, 100vw"
              className="mt-8 lg:mt-2"
            />
          </div>
        </Note>

        {/* ==== Dokumentslutt ==== */}
        <footer
          className={`px-5 py-6 text-center sm:px-10 lg:px-14 [border-top:3px_double_#16262f]`}
        >
          <p className={`font-sans text-[0.68rem] font-bold uppercase tracking-[0.16em] ${MARGINALIA}`}>
            — Slutt på dokumentet · {site.legalName} · Org.nr {site.orgNr} ·{" "}
            <a href={site.phoneHref} data-cta="regnskapet-footer-ring" className="text-blue hover:underline">
              {site.phoneDisplay}
            </a>{" "}
            —
          </p>
        </footer>
      </article>
    </div>
  );
}
