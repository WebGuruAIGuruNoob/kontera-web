import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { bilde } from "@/lib/bilder";
import { PhoneIcon, CheckIcon, Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Forslag C: Skjermen",
  robots: { index: false, follow: false },
};

/**
 * PROTOTYPE C — «SKJERMEN» (app-rail splitskjerm).
 * Forsiden føles som produktet kundene får: en rolig økonomiskjerm.
 * Skjelett: persistent venstre rail (navy instrumentpanel med løftet, frister
 * og tallene) + høyre modulstrøm av rapport-widgets. Ingen seksjonstabel,
 * ingen HeroSplit — helt annet skjelett enn dagens side.
 *
 * Rail-mekanikk: lg:sticky i en grid-kolonne (samme persistente følelse som
 * fixed, men uten å overlappe global footer). På mobil: kompakt topp-seksjon,
 * modulene stabler under.
 */

/* ————— Datagrunnlag (kun sanne tall og eksisterende ruter) ————— */

const frister = [
  { hva: "Mva-melding, 3. termin", nar: "31. aug" },
  { hva: "A-melding for august", nar: "7. sep" },
];

const instrumenter = [
  { tall: "6", etikett: "ansatte" },
  { tall: "2", etikett: "statsautoriserte" },
  { tall: "357", etikett: "kommuner dekket" },
  { tall: "15", etikett: "fylker" },
];

const tjenester = [
  {
    nr: "01",
    navn: "Løpende regnskapsføring",
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
    navn: "Mva-melding",
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
    tekst: "Sparring på tall, prognoser og veivalg gjennom året.",
    href: "/tjenester/radgivning",
  },
  {
    nr: "06",
    navn: "Starte selskap",
    tekst: "Fra valg av selskapsform til første mva-termin.",
    href: "/tjenester/starte-selskap",
  },
];

const bransjer = [
  { navn: "Bilforhandlere", fag: "avansemoms · lagerbiler · innbytte", href: "/bransjer/bilforhandlere" },
  { navn: "Håndverkere og bygg", fag: "prosjektregnskap · timelister · byggekort", href: "/bransjer/handverkere" },
  { navn: "Eiendom", fag: "avskrivninger · mva-justering · struktur", href: "/bransjer/eiendom" },
  { navn: "Netthandel", fag: "betalingsløsninger · avstemming · volum", href: "/bransjer/netthandel" },
  { navn: "Borettslag og sameier", fag: "felleskostnader · budsjett · årsregnskap", href: "/bransjer/borettslag-sameier" },
  { navn: "Konsulenter og tjenestebedrifter", fag: "timeføring · fakturering · prognoser", href: "/bransjer/tjenesteytende" },
];

const bytteSteg = [
  {
    tittel: "Ta kontakt",
    tekst:
      "En kort samtale om bedriften og behovet ditt. Du får et konkret estimat med tydelige forutsetninger før noe signeres.",
  },
  {
    tittel: "Vi håndterer overgangen",
    tekst:
      "Vi kontakter dagens regnskapsfører og sørger for at saldobalanse, bilag og historikk kommer trygt over. Du slipper å stå i midten.",
  },
  {
    tittel: "Du møter din faste fører",
    tekst:
      "Én fast regnskapsfører tar over tallene dine — og en fast stedfortreder settes inn i bedriften fra start. Et bytte legges gjerne til et månedsskifte.",
  },
];

const faq = [
  {
    q: "Er korte spørsmål virkelig inkludert?",
    a: "Ja. Korte spørsmål og småavklaringer er inkludert i honoraret — du trenger ikke veie et spørsmål mot en regning. Større utredninger avtales tydelig på forhånd.",
  },
  {
    q: "Hvem svarer når regnskapsføreren min har ferie?",
    a: "En fast stedfortreder kjenner også bedriften din, slik at du ikke står uten hjelp ved ferie eller sykdom. Det er to hos oss som kjenner tallene dine.",
  },
  {
    q: "Må jeg bytte regnskapssystem for å bli kunde?",
    a: "Det avklarer vi i første samtale. Ofte kan du beholde systemet du har — målet er minst mulig friksjon for deg, ikke flest mulig endringer.",
  },
  {
    q: "Er dere autorisert?",
    a: "Ja. Kontera Regnskap AS er et autorisert regnskapsforetak under tilsyn av Finanstilsynet, og to av oss er statsautoriserte regnskapsførere. Autorisasjonen kan verifiseres i Finanstilsynets virksomhetsregister.",
  },
];

/* ————— Widget-ramme: alle høyremoduler deler samme «rapport-chrome» ————— */

function Modul({
  id,
  label,
  children,
  tone = "lys",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  tone?: "lys" | "navy" | "navy-deep";
}) {
  const mork = tone !== "lys";
  return (
    <section
      aria-label={label}
      className={`overflow-hidden rounded-2xl border ${
        mork
          ? `border-navy/30 text-white ${tone === "navy" ? "bg-navy" : "bg-navy-deep"}`
          : "border-navy/10 bg-surface"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 border-b px-5 py-2.5 sm:px-7 ${
          mork ? "border-white/10 bg-white/[0.06]" : "border-navy/10 bg-mist/60"
        }`}
      >
        <p className={`microlabel ${mork ? "text-teal" : "text-navy/70"}`}>
          {label}
        </p>
        <p
          className={`microlabel !font-semibold tabular-nums ${
            mork ? "text-white/40" : "text-slate/60"
          }`}
        >
          Modul {id}
        </p>
      </div>
      {children}
    </section>
  );
}

function ModulFoto({
  foto,
  priority = false,
}: {
  foto: { src: string; alt: string } | null;
  priority?: boolean;
}) {
  if (!foto) return null;
  return (
    <div className="relative h-40 sm:h-44">
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/15 to-navy/10 mix-blend-multiply"
      />
    </div>
  );
}

/* ————— Siden ————— */

export default function SkjermenPage() {
  const samarbeidFoto = bilde("team:samarbeid-2");
  const bytteFoto = bilde("blogg:bytte-regnskapsforer");
  const kontorFoto = bilde("omoss:kontorlokale");
  const [jar, gjerdrum] = site.offices;

  return (
    <div className="bg-navy lg:grid lg:grid-cols-[minmax(0,38%)_minmax(0,1fr)]">
      {/* ============ VENSTRE RAIL — instrumentpanelet ============ */}
      <section aria-label="Løftet og nøkkeltall" className="bg-navy text-white">
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div className="flex min-h-full flex-col gap-10 px-5 py-10 sm:px-8 lg:justify-between lg:px-10 lg:py-9 xl:px-12">
            {/* Merke + løftet */}
            <div>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-bold text-white">
                  Kontera Regnskap
                </span>
                <span className="microlabel !font-semibold text-teal">
                  Autorisert regnskapsforetak · est. 2015
                </span>
              </p>

              <h1 className="mt-6 font-display text-[clamp(2.1rem,1.15rem+2.6vw,3.3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-wrap:balance]">
                Én fast regnskapsfører som{" "}
                <span className="italic text-azure">svarer</span> — og en
                stedfortreder som også kjenner deg.
              </h1>

              <p className="mt-5 max-w-[46ch] leading-relaxed text-white/75">
                Korte spørsmål og småavklaringer er inkludert i honoraret. Vi
                holder oversikt over mva-terminer, a-meldinger og årsfrister —
                det er vårt ansvar, ikke ditt.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={site.phoneHref}
                  data-cta="rail-ring"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3 font-sans font-bold text-navy transition-colors hover:bg-mist"
                >
                  <PhoneIcon className="h-[18px] w-[18px]" />
                  Ring {site.phoneDisplay}
                </a>
                <a
                  href={site.emailHref}
                  data-cta="rail-epost"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 font-sans text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white"
                >
                  {site.email}
                </a>
              </div>
            </div>

            {/* Datapanelene: frister + instrumentrekke */}
            <div className="space-y-4">
              <div className="rounded-xl border border-white/15 bg-navy-deep/60 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="microlabel text-teal">Neste frister</p>
                  <p className="microlabel !font-semibold text-white/40">
                    Vi holder oversikten
                  </p>
                </div>
                <dl className="mt-2 divide-y divide-white/10">
                  {frister.map((f) => (
                    <div
                      key={f.hva}
                      className="flex items-baseline justify-between gap-4 py-2"
                    >
                      <dt className="text-sm font-semibold text-white/85">
                        {f.hva}
                      </dt>
                      <dd className="shrink-0 font-display text-base font-bold tabular-nums text-azure">
                        {f.nar}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2.5 text-xs leading-relaxed text-white/50">
                  Som kunde er dette din faste førers liste — ikke din.
                </p>
              </div>

              <dl className="grid grid-cols-4 divide-x divide-white/10 rounded-xl border border-white/15">
                {instrumenter.map((s) => (
                  <div key={s.etikett} className="px-3 py-3.5 text-center sm:px-4">
                    <dd className="font-display text-2xl font-bold tabular-nums text-white">
                      {s.tall}
                    </dd>
                    <dt className="mt-0.5 text-[0.6rem] font-bold uppercase leading-tight tracking-[0.1em] text-white/55">
                      {s.etikett}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            {/* Kontorlinje */}
            <p className="border-t border-white/10 pt-5 text-xs leading-relaxed text-white/55">
              {jar.label} · {gjerdrum.label} — kunder digitalt i hele landet.
              <br />
              Org.nr {site.orgNr} · Under tilsyn av Finanstilsynet
            </p>
          </div>
        </div>
      </section>

      {/* ============ HØYRE — modulstrømmen ============ */}
      <div className="bg-paper">
        <div className="mx-auto max-w-[46rem] space-y-5 px-4 py-8 sm:px-6 lg:px-10 lg:py-10 xl:px-14">
          {/* 01 — Samarbeidsmodellen */}
          <Modul id="01" label="Samarbeidsmodellen">
            <ModulFoto foto={samarbeidFoto} priority />
            <div className="p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-navy [text-wrap:balance]">
                To hos oss kjenner bedriften din. Ikke null, ikke én.
              </h2>
              <p className="mt-3 max-w-[58ch] leading-relaxed text-slate">
                Samme person fører hele regnskapet ditt og kjenner historikken i
                tallene. Og skulle hun eller han være borte, står du ikke i kø
                hos en fremmed — stedfortrederen er allerede satt inn i
                bedriften.
              </p>
              <ul className="mt-5 divide-y divide-navy/10">
                {site.promises.map((p) => (
                  <li key={p.title} className="flex gap-3.5 py-3.5">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-blue" />
                    <div>
                      <h3 className="font-sans text-base font-bold text-navy">
                        {p.title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate">
                        {p.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/om-oss"
                className="mt-4 inline-block text-sm font-bold text-blue hover:underline"
              >
                Bli kjent med byrået <Arrow className="text-azure" />
              </Link>
            </div>
          </Modul>

          {/* 02 — Tjenestene som kontoplan-linjer */}
          <Modul id="02" label="Tjenestene">
            <div className="p-5 pb-2 sm:p-7 sm:pb-3">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-navy">
                Alt regnskapsbehovet, linje for linje
              </h2>
              <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-slate">
                Hele leveransen samlet hos din faste fører — du velger hvor mye
                du vil gjøre selv.
              </p>
            </div>
            <ul className="divide-y divide-navy/10 border-t border-navy/10">
              {tjenester.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group flex items-baseline gap-4 px-5 py-3.5 transition-colors hover:bg-mist/50 sm:px-7"
                  >
                    <span className="w-7 shrink-0 text-sm font-bold tabular-nums text-slate/50">
                      {t.nr}
                    </span>
                    <span className="flex-1">
                      <h3 className="inline font-sans text-base font-bold text-navy group-hover:text-blue">
                        {t.navn}
                      </h3>
                      <span className="ml-2 hidden text-sm text-slate sm:inline">
                        {t.tekst}
                      </span>
                      <span className="mt-0.5 block text-sm text-slate sm:hidden">
                        {t.tekst}
                      </span>
                    </span>
                    <Arrow className="shrink-0 text-azure transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Modul>

          {/* 03 — Bransjer med fagbegrep-lenker */}
          <Modul id="03" label="Bransjer">
            <div className="p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-navy">
                Spisskompetanse der regelverket er mest krevende
              </h2>
              <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {bransjer.map((b) => (
                  <Link key={b.href} href={b.href} className="group">
                    <h3 className="font-display text-base font-bold text-navy group-hover:text-blue">
                      {b.navn} <Arrow className="text-azure" />
                    </h3>
                    <p className="microlabel mt-0.5 !font-semibold text-slate">
                      {b.fag}
                    </p>
                  </Link>
                ))}
              </div>
              <p className="mt-6 border-t border-navy/10 pt-4 text-sm leading-relaxed text-slate">
                Ser du ikke bransjen din? Vi fører regnskap for de fleste —{" "}
                <a
                  href={site.phoneHref}
                  data-cta="bransje-ring"
                  className="font-bold text-blue hover:underline"
                >
                  ring, så avklarer vi det på minuttet
                </a>
                .
              </p>
            </div>
          </Modul>

          {/* 04 — Pris-ærligheten (navy aksent-widget) */}
          <Modul id="04" label="Hva koster det?" tone="navy">
            <div className="p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-white [text-wrap:balance]">
                Ærlig svar: det spørs. Og vi sier det rett ut.
              </h2>
              <p className="mt-3 max-w-[58ch] leading-relaxed text-white/75">
                Prisen settes av bilagsmengde, antall ansatte og hvor mye du
                gjør selv. Vi ligger i midtsjiktet — vi konkurrerer ikke på
                laveste timepris, men på det som er inkludert:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Fast regnskapsfører som kjenner bedriften din",
                  "Fast stedfortreder som også kjenner deg",
                  "Korte spørsmål og småavklaringer i honoraret",
                  "Fristoversikten — mva, a-melding og årsoppgjør",
                ].map((punkt) => (
                  <li key={punkt} className="flex items-start gap-3 text-sm text-white/85">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {punkt}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={site.phoneHref}
                  data-cta="pris-ring"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-blue-dark"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Få et estimat — ring {site.phoneDisplay}
                </a>
                <Link
                  href="/priser"
                  className="text-sm font-bold text-azure hover:underline"
                >
                  Slik settes prisen <Arrow />
                </Link>
              </div>
            </div>
          </Modul>

          {/* 05 — Bytteprosessen */}
          <Modul id="05" label="Bytte regnskapsfører">
            <ModulFoto foto={bytteFoto} />
            <div className="p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-navy">
                Byttet er vår jobb, ikke din
              </h2>
              <ol className="mt-5 divide-y divide-navy/10">
                {bytteSteg.map((s, i) => (
                  <li key={s.tittel} className="flex gap-4 py-4">
                    <span className="font-display text-2xl font-bold tabular-nums leading-none text-azure">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-bold text-navy">
                        {s.tittel}
                      </h3>
                      <p className="mt-1 max-w-[56ch] text-sm leading-relaxed text-slate">
                        {s.tekst}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/blogg/bytte-regnskapsforer"
                className="mt-1 inline-block text-sm font-bold text-blue hover:underline"
              >
                Les hele bytteguiden <Arrow className="text-azure" />
              </Link>
            </div>
          </Modul>

          {/* 06 — FAQ */}
          <Modul id="06" label="Vanlige spørsmål">
            <div className="divide-y divide-navy/10">
              {faq.map((f) => (
                <details key={f.q} className="group px-5 py-4 sm:px-7">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-sans font-bold text-navy transition-colors hover:text-blue [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-bold">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-sans text-lg leading-none text-azure transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 max-w-[60ch] text-sm leading-relaxed text-slate">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </Modul>

          {/* 07 — Kontorene og landet */}
          <Modul id="07" label="Hvor vi er">
            <ModulFoto foto={kontorFoto} />
            <div className="p-5 sm:p-7">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-navy">
                To kontorer — kunder i hele landet
              </h2>
              <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-slate">
                Regnskapet går digitalt uansett hvor bedriften din holder til —
                vi dekker alle landets 357 kommuner i 15 fylker. Vil du møtes
                over en kaffe, finner du oss her:
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {site.offices.map((o) => (
                  <div
                    key={o.id}
                    className="rounded-xl border border-navy/10 bg-mist/50 p-4"
                  >
                    <h3 className="font-sans text-base font-bold text-navy">
                      {o.label}
                    </h3>
                    <p className="mt-1 text-sm text-slate">
                      {o.street}, {o.postalCode} {o.city}
                    </p>
                    <a
                      href={o.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-bold text-blue hover:underline"
                    >
                      Vis i kart <Arrow className="text-azure" />
                    </a>
                  </div>
                ))}
              </div>
              <Link
                href="/regnskapsforer"
                className="mt-5 inline-block text-sm font-bold text-blue hover:underline"
              >
                Finn regnskapsfører der du er <Arrow className="text-azure" />
              </Link>
            </div>
          </Modul>

          {/* 08 — Kontakt-finalen */}
          <Modul id="08" label="Kontakt" tone="navy-deep">
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-[clamp(1.7rem,1.2rem+1.4vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.015em] text-white [text-wrap:balance]">
                Ta en prat om regnskapet ditt.
              </h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-white/75">
                Uforpliktende samtale om behovet ditt — tydelige vilkår før
                oppstart. Og husk: korte spørsmål er inkludert i honoraret den
                dagen du er kunde.
              </p>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={site.phoneHref}
                  data-cta="final-ring"
                  className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-3.5 font-sans text-lg font-bold text-navy transition-colors hover:bg-mist"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={site.emailHref}
                  data-cta="final-epost"
                  className="font-sans text-sm font-semibold text-white/85 underline-offset-2 hover:text-white hover:underline"
                >
                  {site.email}
                </a>
              </div>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/50">
                {site.legalName} · Org.nr {site.orgNr} · {jar.label} og{" "}
                {gjerdrum.label} · Autorisert regnskapsforetak under tilsyn av
                Finanstilsynet
              </p>
            </div>
          </Modul>
        </div>
      </div>
    </div>
  );
}
