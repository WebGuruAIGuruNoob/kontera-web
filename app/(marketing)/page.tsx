import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { TrustRad } from "@/components/sections/TrustRad";
import { PhoneIcon, Arrow } from "@/components/icons";
import { bilde } from "@/lib/bilder";
import { site } from "@/data/site";

/**
 * FORSIDE v4 — «INKLUDERT» (Henriks valg 2026-08-24: Forslag D promotert).
 * Stil-DNA: Randi (skoggrønn + elgul, løfteformel) · Fiken (folkelig ro) ·
 * Testen (hue-tintede nøytraler, glød-pille, deadpan tosetninger, ærlighets-
 * blokk) · Drivly (pastellbånd per seksjon, rounded-3xl-kort m/løft).
 * Normalisert mot designsystemet: globale tokens (mist/cream/varm/gul),
 * .pille, luftskalaen og delte Faq/FinalCta. Harde regler består: sanne
 * tall, temperert språk, ring primær (lead-sikkerhetsregelen).
 */

export const metadata: Metadata = {
  title: { absolute: "Regnskapsfører med fast kontaktperson | Kontera Regnskap AS" },
  description:
    "Regnskap, lønn og årsoppgjør fra et lite byrå med statsautoriserte regnskapsførere. Fast regnskapsfører som kjenner deg – korte spørsmål er inkludert i honoraret. Ring 960 00 400.",
  alternates: { canonical: "/" },
};

const roKort = [
  {
    bg: "bg-mist",
    tittel: "Ring uten å regne på det",
    tekst:
      "Korte spørsmål og småavklaringer er en del av honoraret. Du skal ikke måtte veie et spørsmål mot en regning — det er i de små avklaringene feilene fanges tidlig.",
  },
  {
    bg: "bg-cream",
    tittel: "Én som kjenner tallene dine",
    tekst:
      "Ikke et kønummer. Du får én fast regnskapsfører som fører hele regnskapet ditt og husker historikken — og en stedfortreder som kjenner bedriften like godt.",
  },
  {
    bg: "bg-varm",
    tittel: "Fristene? Glem dem.",
    tekst:
      "Mva-terminer, a-meldinger, årsoppgjør. Vi holder oversikten gjennom hele året, og sier ifra i god tid når vi trenger noe fra deg. Resten er vår jobb.",
  },
];

const tjenesterKort = [
  { navn: "Regnskapsføring", tekst: "Bilag inn, oversikt ut. Løpende ført og avstemt.", href: "/tjenester/regnskapsforing", bg: "bg-mist" },
  { navn: "Lønn", tekst: "Riktig utbetalt, riktig innberettet. Hver måned.", href: "/tjenester/lonn", bg: "bg-cream" },
  { navn: "Mva-melding", tekst: "Levert til hver termin. Uten at du merker det.", href: "/tjenester/mva", bg: "bg-varm" },
  { navn: "Årsoppgjør", tekst: "Ferdig i god tid. Ikke i siste liten.", href: "/tjenester/arsoppgjor", bg: "bg-cream" },
  { navn: "Rådgivning", tekst: "Sparring på vanlig norsk. Inkludert i samarbeidet.", href: "/tjenester/radgivning", bg: "bg-varm" },
  { navn: "Starte selskap", tekst: "ENK eller AS? Vi rigger alt riktig fra start.", href: "/tjenester/starte-selskap", bg: "bg-mist" },
];

const homeFaq = [
  {
    q: "Hva koster det?",
    a: "Ærlig svar: det spørs — på bilagsmengde, ansatte og hvor mye du gjør selv. Vi ligger i midtsjiktet på pris, og du får et konkret estimat etter én samtale. Ingen beløp før vi mener dem.",
  },
  {
    q: "Hva betyr «spørsmål inkludert»?",
    a: "At korte spørsmål og småavklaringer er en del av honoraret. Ring når du lurer på noe — det er sånn samarbeidet er ment å fungere.",
  },
  {
    q: "Hvor vanskelig er det å bytte?",
    a: "Du sier opp hos dagens byrå og gir oss en fullmakt. Vi henter saldobalanse, historikk og tilganger. De fleste synes det var mindre styr enn fryktet.",
  },
  {
    q: "Hvilke bransjer kan dere?",
    a: "Spisskompetanse på bilbransjen (særlig bruktbil), håndverkere, eiendom og netthandel. Bred erfaring med det meste annet — inkludert borettslag og sameier.",
  },
  {
    q: "Hvilke regnskapssystemer bruker dere?",
    a: "Mest Tripletex og Uni Micro, men vi kjenner de fleste systemer. Trives du i systemet ditt, fortsetter vi som regel bare der.",
  },
  {
    q: "Er dere autorisert?",
    a: "Ja — autorisert regnskapsforetak under tilsyn av Finanstilsynet, med to statsautoriserte regnskapsførere blant seks ansatte. Org.nr 915 554 245.",
  },
  {
    q: "Kan dere ta kunder der jeg bor?",
    a: "Ja. Vi jobber digitalt med bedrifter i hele Norge — 357 kommuner, 15 fylker — med kontorer på Jar i Bærum og Ask i Gjerdrum.",
  },
];

export default function HomePage() {
  const teamFoto = bilde("team:samarbeid-1");
  const kaffeFoto = bilde("omoss:kaffe-og-notater");

  return (
    <>
      {/* ===== Hero på flatt grønt bånd ===== */}
      <section className="bg-mist">
        <div className="section-y-lg mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="section-eyebrow">
              Regnskapsbyrå for små og mellomstore bedrifter
            </p>
            <h1 className="mt-4 font-display text-display font-semibold text-navy [text-wrap:balance]">
              Når vi sier inkludert, mener vi <em className="italic">inkludert</em>.
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-slate">
              Korte spørsmål, småavklaringer og en regnskapsfører som faktisk
              tar telefonen — det er en del av honoraret hos Kontera, ikke noe
              som dukker opp på fakturaen.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={site.phoneHref} data-cta="hero-ring" className="pille">
                <PhoneIcon className="h-5 w-5" />
                Ring {site.phoneDisplay}
              </a>
              <a
                href="#slik"
                data-cta="hero-slik"
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                Se hvordan vi jobber <Arrow />
              </a>
            </div>
            <p className="mt-4 text-sm font-medium text-slate">
              Ingen bindingstid · Fast kontaktperson · Svar fra ekte folk
            </p>
          </div>
          <div className="lg:col-span-5">
            {teamFoto && (
              <div className="relative overflow-hidden rounded-3xl border border-navy/20 shadow-[0_12px_32px_rgba(28,79,45,0.14)]">
                <Image
                  src={teamFoto.src}
                  alt={teamFoto.alt}
                  width={1280}
                  height={853}
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy/15 mix-blend-multiply"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Trust-ikonrad rett under hero (delt komponent) ===== */}
      <TrustRad />

      {/* ===== Ro-trioen: tre store tintede kort ===== */}
      <section className="section-y-lg mx-auto max-w-6xl px-4">
        <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
          Regnskap skal gi ro. Ikke en klump i magen.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roKort.map((k) => (
            <div
              key={k.tittel}
              className={`rounded-3xl ${k.bg} p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
            >
              <h3 className="font-display text-xl font-semibold text-navy">
                {k.tittel}
              </h3>
              <p className="mt-3 leading-relaxed text-slate">{k.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Deadpan-tallene ===== */}
      <section className="section-y bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Seks ansatte. To statsautoriserte. Det holder.
          </h2>
          <p className="mt-4 max-w-[38rem] leading-relaxed text-slate">
            Store nok til å kunne faget — små nok til at du kjenner stemmen som
            tar telefonen. Etablert i 2015, digitale kunder i hele landet.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { tall: "6", u: "ansatte" },
              { tall: "2", u: "statsautoriserte regnskapsførere" },
              { tall: "357", u: "kommuner dekket digitalt" },
              { tall: "2015", u: "etablert — Jar og Gjerdrum" },
            ].map((s) => (
              <div
                key={s.u}
                className="rounded-2xl border border-teal/60 bg-mist/50 p-6"
              >
                <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-navy tabular-nums">
                  {s.tall}
                </p>
                <p className="mt-2 text-sm font-medium text-slate">{s.u}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tjenestebento på cream-bånd ===== */}
      <section className="section-y-lg bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Alt du trenger. Ingenting du ikke trenger.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tjenesterKort.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`group rounded-3xl ${t.bg} border border-navy/10 p-7 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
              >
                <h3 className="flex items-baseline justify-between font-display text-lg font-semibold text-navy">
                  {t.navn}
                  <Arrow className="text-navy/50 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{t.tekst}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate/80">
            Bransje?{" "}
            {[
              ["Bilforhandlere", "/bransjer/bilforhandlere"],
              ["Håndverkere", "/bransjer/handverkere"],
              ["Eiendom", "/bransjer/eiendom"],
              ["Netthandel", "/bransjer/netthandel"],
              ["Borettslag", "/bransjer/borettslag-sameier"],
            ].map(([navn, href], i) => (
              <span key={href}>
                {i > 0 && " · "}
                <Link href={href} className="font-semibold text-navy hover:underline">
                  {navn}
                </Link>
              </span>
            ))}{" "}
            — vi kan særreglene dine.
          </p>
        </div>
      </section>

      {/* ===== Ærlighetsblokken ===== */}
      <section className="section-y-lg mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)] lg:col-span-7 lg:p-10">
            <p className="microlabel text-slate/80">Helt ærlig</p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.4rem)] font-semibold leading-tight text-navy [text-wrap:balance]">
              Hva skjer når regnskapsføreren din blir syk?
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              Det er spørsmålet folk glemmer å stille — helt til det skjer. Hos
              oss blir to personer kjent med bedriften din: din faste
              regnskapsfører, og en stedfortreder som følger med underveis.
              Blir én borte, tar den andre over uten at du må forklare noe på
              nytt.
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              Det er ikke en nødløsning vi improviserer når det smeller. Det er
              sånn vi har rigget hvert eneste kundeforhold siden starten.
            </p>
            <p className="mt-6 text-sm font-medium text-slate/80">
              Ingen binding · Tydelige vilkår før oppstart · Org.nr {site.orgNr}
            </p>
          </div>
          <div className="lg:col-span-5">
            {kaffeFoto && (
              <div className="relative overflow-hidden rounded-3xl border border-line">
                <Image
                  src={kaffeFoto.src}
                  alt={kaffeFoto.alt}
                  width={1280}
                  height={853}
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-navy/15 mix-blend-multiply" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Slik funker det + pris-ærlighet på grønt bånd ===== */}
      <section id="slik" className="section-y-lg scroll-mt-20 bg-mist">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Midtsjiktet på pris. Toppsjiktet på å ta telefonen.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ["1", "Én samtale", "Vi går gjennom bedriften, bilagsmengden og hva du vil gjøre selv. Du får et konkret estimat med tydelige forutsetninger — som regel samme dag."],
              ["2", "Vi ordner overgangen", "Bytter du fra et annet byrå, henter vi saldobalanse, historikk og tilganger. Din innsats: én oppsigelse og én fullmakt."],
              ["3", "Fast fører fra dag én", "Regnskapsføreren din setter seg inn i bedriften — og stedfortrederen gjør det samme. Så er det bare å ringe når du lurer på noe."],
            ].map(([nr, tittel, tekst]) => (
              <div key={nr} className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
                <p className="font-display text-4xl font-semibold text-gul [text-shadow:0_1px_0_rgba(28,79,45,0.25)] tabular-nums">
                  {nr}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                  {tittel}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{tekst}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm font-medium text-slate">
            Ingen beløp før vi mener dem — prisen settes etter samtalen, og den
            forklares så du skjønner hva du betaler for.{" "}
            <Link href="/priser" data-cta="pris-modell" className="font-semibold text-navy underline underline-offset-4">
              Se hvordan prisen settes
            </Link>
          </p>
        </div>
      </section>

      {/* ===== FAQ (varm-bånd via delt komponent) ===== */}
      <Faq items={homeFaq} title="Lurer du på noe? Typisk oss å svare." />

      {/* ===== Mørk skoggrønn finale med gul glød ===== */}
      <FinalCta />
    </>
  );
}
