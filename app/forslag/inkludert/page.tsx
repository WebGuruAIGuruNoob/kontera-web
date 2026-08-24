import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { site } from "@/data/site";
import { bilde } from "@/lib/bilder";
import { leadEnabled } from "@/lib/lead";
import { PhoneIcon, CheckIcon, Arrow } from "@/components/icons";

/**
 * FORSLAG D — «INKLUDERT» (2026-08-24, sandkasse — lint-unntatt).
 * Stil-DNA fra fire referanser: Randi (skoggrønn + elgul, løfteformel,
 * garantier som produkt), Fiken (folkelig ro, mye luft), Testen (hue-tintede
 * nøytraler, glow-pille-CTA, deadpan tosetningsoverskrifter, interpunkt-
 * mikroliner, ærlighetsblokk), Drivly (pastellbånd per seksjon, rounded-3xl-
 * bento m/løft-hover — MEN uten emojis/hype: feil register for regnskap).
 * NY palett (kun denne ruten): skoggrønn #1C4F2D, grønntonet papir #F5F8F5,
 * bånd #E4F2E4/#FBF7EC/#FFFBEB, elgul aksent #FFD505. Ny typografi (kun her):
 * Fraunces (serif display) + Hanken Grotesk (brødtekst). All tekst er ny.
 * Harde regler består: sanne tall, temperert språk, ring primær.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});
const hanken = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forslag D: Inkludert",
  robots: { index: false, follow: false },
};

/** Signatur-CTA: elgul glow-pille (Testen-oppskriften med Randi-fargen) */
function GulPille({
  href,
  children,
  dataCta,
}: {
  href: string;
  children: React.ReactNode;
  dataCta: string;
}) {
  return (
    <a
      href={href}
      data-cta={dataCta}
      className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#FFD505] px-7 font-semibold text-[#1a2415] shadow-[0_10px_34px_rgba(255,213,5,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#ffdf3d] active:scale-[0.97]"
    >
      {children}
    </a>
  );
}

const trustRad = [
  { t: "Én fast regnskapsfører", u: "samme person hver gang" },
  { t: "Fast stedfortreder", u: "kjenner også bedriften din" },
  { t: "Spørsmål inkludert", u: "en del av honoraret" },
  { t: "Fristene er vårt ansvar", u: "mva, a-melding, årsoppgjør" },
];

const roKort = [
  {
    bg: "bg-[#E4F2E4]",
    tittel: "Ring uten å regne på det",
    tekst:
      "Korte spørsmål og småavklaringer er en del av honoraret. Du skal aldri måtte veie et spørsmål mot en regning — det er i de små avklaringene feilene fanges tidlig.",
  },
  {
    bg: "bg-[#FBF7EC]",
    tittel: "Én som kjenner tallene dine",
    tekst:
      "Ikke et kønummer. Du får én fast regnskapsfører som fører hele regnskapet ditt og husker historikken — og en stedfortreder som kjenner bedriften like godt.",
  },
  {
    bg: "bg-[#FFFBEB]",
    tittel: "Fristene? Glem dem.",
    tekst:
      "Mva-terminer, a-meldinger, årsoppgjør. Vi holder oversikten gjennom hele året, og sier ifra i god tid når vi trenger noe fra deg. Resten er vår jobb.",
  },
];

const tjenesterD = [
  { navn: "Regnskapsføring", tekst: "Bilag inn, oversikt ut. Løpende ført og avstemt.", href: "/tjenester/regnskapsforing", bg: "bg-[#E4F2E4]" },
  { navn: "Lønn", tekst: "Riktig utbetalt, riktig innberettet. Hver måned.", href: "/tjenester/lonn", bg: "bg-[#FBF7EC]" },
  { navn: "Mva-melding", tekst: "Levert til hver termin. Uten at du merker det.", href: "/tjenester/mva", bg: "bg-[#FFFBEB]" },
  { navn: "Årsoppgjør", tekst: "Ferdig i god tid. Ikke i siste liten.", href: "/tjenester/arsoppgjor", bg: "bg-[#FBF7EC]" },
  { navn: "Rådgivning", tekst: "Sparring på vanlig norsk. Inkludert i samarbeidet.", href: "/tjenester/radgivning", bg: "bg-[#FFFBEB]" },
  { navn: "Starte selskap", tekst: "ENK eller AS? Vi rigger alt riktig fra start.", href: "/tjenester/starte-selskap", bg: "bg-[#E4F2E4]" },
];

const faqD = [
  ["Hva koster det?", "Ærlig svar: det spørs — på bilagsmengde, ansatte og hvor mye du gjør selv. Vi ligger i midtsjiktet på pris, og du får et konkret estimat etter én samtale. Ingen beløp før vi mener dem."],
  ["Hva betyr «spørsmål inkludert»?", "At korte spørsmål og småavklaringer er en del av honoraret. Ring når du lurer på noe — det er sånn samarbeidet er ment å fungere."],
  ["Hvor vanskelig er det å bytte?", "Du sier opp hos dagens byrå og gir oss en fullmakt. Vi henter saldobalanse, historikk og tilganger. De fleste synes det var mindre styr enn fryktet."],
  ["Er dere autorisert?", "Ja — autorisert regnskapsforetak under tilsyn av Finanstilsynet, med to statsautoriserte regnskapsførere blant seks ansatte. Org.nr 915 554 245."],
  ["Kan dere ta kunder der jeg bor?", "Ja. Vi jobber digitalt med bedrifter i hele Norge — 357 kommuner, 15 fylker — med kontorer på Jar i Bærum og Ask i Gjerdrum."],
];

export default function InkludertPage() {
  const enabled = leadEnabled();
  const teamFoto = bilde("team:samarbeid-1");
  const kaffeFoto = bilde("omoss:kaffe-og-notater");

  return (
    <div className={`${hanken.className} bg-[#F5F8F5] text-[#1E2A20]`}>
      {/* ===== HERO på flatt grønt bånd (Drivly-grepet, dempet) ===== */}
      <section className="bg-[#E4F2E4]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[#1C4F2D]/70">
              Regnskapsbyrå for små og mellomstore bedrifter
            </p>
            <h1
              className={`${fraunces.className} mt-4 text-[clamp(2.4rem,1.4rem+3.6vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-[#1C4F2D] [text-wrap:balance]`}
            >
              Når vi sier inkludert, mener vi{" "}
              <em className="italic">inkludert</em>.
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-[#3C5243]">
              Korte spørsmål, småavklaringer og en regnskapsfører som faktisk
              tar telefonen — det er en del av honoraret hos Kontera, ikke noe
              som dukker opp på fakturaen.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <GulPille href={site.phoneHref} dataCta="d-hero-ring">
                <PhoneIcon className="h-5 w-5" />
                Ring {site.phoneDisplay}
              </GulPille>
              <a
                href="#slik"
                data-cta="d-hero-slik"
                className="font-semibold text-[#1C4F2D] underline-offset-4 hover:underline"
              >
                Se hvordan vi jobber <Arrow />
              </a>
            </div>
            <p className="mt-4 text-sm font-medium text-[#3C5243]">
              Ingen bindingstid · Fast kontaktperson · Svar fra ekte folk
            </p>
          </div>
          <div className="lg:col-span-5">
            {teamFoto && (
              <div className="relative overflow-hidden rounded-3xl border border-[#CBDECB] shadow-[0_12px_32px_rgba(28,79,45,0.14)]">
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
                  className="absolute inset-0 bg-[#1C4F2D]/15 mix-blend-multiply"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Trust-ikonrad rett under hero (Drivly-grepet) ===== */}
      <section aria-label="Det viktigste først" className="border-b border-[#DDE6DD] bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {trustRad.map((t) => (
            <div key={t.t} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E4F2E4] text-[#1C4F2D]">
                <CheckIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold leading-snug text-[#1C4F2D]">{t.t}</p>
                <p className="text-sm text-[#5B6F60]">{t.u}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Ro-trioen (Fiken-grepet): tre store tintede kort ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <h2
          className={`${fraunces.className} max-w-2xl text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-tight tracking-[-0.01em] text-[#1C4F2D] [text-wrap:balance]`}
        >
          Regnskap skal gi ro. Ikke en klump i magen.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {roKort.map((k) => (
            <div
              key={k.tittel}
              className={`rounded-3xl ${k.bg} p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
            >
              <h3 className={`${fraunces.className} text-xl font-semibold text-[#1C4F2D]`}>
                {k.tittel}
              </h3>
              <p className="mt-3 leading-relaxed text-[#3C5243]">{k.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Deadpan-tallene (Testen-grepet: tosetningsformel + store tall) ===== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2
            className={`${fraunces.className} max-w-2xl text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-tight text-[#1C4F2D] [text-wrap:balance]`}
          >
            Seks ansatte. To statsautoriserte. Det holder.
          </h2>
          <p className="mt-4 max-w-[38rem] leading-relaxed text-[#3C5243]">
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
                className="rounded-2xl border border-[#C8E4C8] bg-[#F0F8F0] p-6"
              >
                <p className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em] text-[#14532D] tabular-nums">
                  {s.tall}
                </p>
                <p className="mt-2 text-sm font-medium text-[#3C5243]">{s.u}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tjenestebento på cream-bånd (Drivly-struktur, voksen palett) ===== */}
      <section className="bg-[#FBF7EC] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2
            className={`${fraunces.className} max-w-2xl text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-tight text-[#1C4F2D] [text-wrap:balance]`}
          >
            Alt du trenger. Ingenting du ikke trenger.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tjenesterD.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`group rounded-3xl ${t.bg} border border-[#1C4F2D]/8 p-7 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
              >
                <h3 className={`${fraunces.className} flex items-baseline justify-between text-lg font-semibold text-[#1C4F2D]`}>
                  {t.navn}
                  <Arrow className="text-[#1C4F2D]/50 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3C5243]">{t.tekst}</p>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#5B6F60]">
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
                <Link href={href} className="font-semibold text-[#1C4F2D] hover:underline">
                  {navn}
                </Link>
              </span>
            ))}{" "}
            — vi kan særreglene dine.
          </p>
        </div>
      </section>

      {/* ===== Ærlighetsblokken (Testens sterkeste grep, oversatt ærlig) ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)] lg:col-span-7 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5B6F60]">
              Helt ærlig
            </p>
            <h2
              className={`${fraunces.className} mt-3 text-[clamp(1.6rem,1.1rem+1.8vw,2.4rem)] font-semibold leading-tight text-[#1C4F2D] [text-wrap:balance]`}
            >
              Hva skjer når regnskapsføreren din blir syk?
            </h2>
            <p className="mt-4 leading-relaxed text-[#3C5243]">
              Det er spørsmålet folk glemmer å stille — helt til det skjer. Hos
              oss blir alltid to personer kjent med bedriften din: din faste
              regnskapsfører, og en stedfortreder som følger med underveis.
              Blir én borte, tar den andre over uten at du må forklare noe på
              nytt.
            </p>
            <p className="mt-4 leading-relaxed text-[#3C5243]">
              Det er ikke en nødløsning vi improviserer når det smeller. Det er
              sånn vi har rigget hvert eneste kundeforhold siden starten.
            </p>
            <p className="mt-6 text-sm font-medium text-[#5B6F60]">
              Ingen binding · Tydelige vilkår før oppstart · Org.nr {site.orgNr}
            </p>
          </div>
          <div className="lg:col-span-5">
            {kaffeFoto && (
              <div className="relative overflow-hidden rounded-3xl border border-[#DDE6DD]">
                <Image
                  src={kaffeFoto.src}
                  alt={kaffeFoto.alt}
                  width={1280}
                  height={853}
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="h-auto w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-[#1C4F2D]/15 mix-blend-multiply" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== Slik funker det + pris-ærlighet på grønt bånd ===== */}
      <section id="slik" className="scroll-mt-20 bg-[#E4F2E4] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2
            className={`${fraunces.className} max-w-2xl text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold leading-tight text-[#1C4F2D] [text-wrap:balance]`}
          >
            Midtsjiktet på pris. Toppsjiktet på å ta telefonen.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ["1", "Én samtale", "Vi går gjennom bedriften, bilagsmengden og hva du vil gjøre selv. Du får et konkret estimat med tydelige forutsetninger — som regel samme dag."],
              ["2", "Vi ordner overgangen", "Bytter du fra et annet byrå, henter vi saldobalanse, historikk og tilganger. Din innsats: én oppsigelse og én fullmakt."],
              ["3", "Fast fører fra dag én", "Regnskapsføreren din setter seg inn i bedriften — og stedfortrederen gjør det samme. Så er det bare å ringe når du lurer på noe."],
            ].map(([nr, tittel, tekst]) => (
              <div key={nr} className="rounded-3xl bg-white p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
                <p className={`${fraunces.className} text-4xl font-semibold text-[#FFD505] [text-shadow:0_1px_0_rgba(28,79,45,0.25)] tabular-nums`}>
                  {nr}
                </p>
                <h3 className={`${fraunces.className} mt-3 text-lg font-semibold text-[#1C4F2D]`}>
                  {tittel}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3C5243]">{tekst}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-medium text-[#3C5243]">
            Ingen beløp før vi mener dem — prisen settes etter samtalen, og den
            forklares så du skjønner hva du betaler for.
          </p>
        </div>
      </section>

      {/* ===== FAQ på warm yellow-50 (Drivly-avslutningsbåndet) ===== */}
      <section className="bg-[#FFFBEB] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className={`${fraunces.className} text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] font-semibold text-[#1C4F2D]`}>
            Lurer du på noe? Typisk oss å svare.
          </h2>
          <div className="mt-8 divide-y divide-[#1C4F2D]/10">
            {faqD.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className={`${fraunces.className} flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#1C4F2D] [&::-webkit-details-marker]:hidden`}>
                  {q}
                  <span aria-hidden="true" className="text-2xl font-normal text-[#1C4F2D]/50 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-[#3C5243]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Mørk skoggrønn finale med gul glød (Testens dark-cta) ===== */}
      <section
        id="kontakt"
        className="bg-[radial-gradient(70%_90%_at_50%_-10%,rgba(255,213,5,0.14),transparent_58%),linear-gradient(175deg,#1C4F2D,#143D22)] py-20 text-white lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className={`${fraunces.className} text-[clamp(2rem,1.3rem+2.8vw,3.6rem)] font-semibold leading-tight [text-wrap:balance]`}>
            Prøv oss på et spørsmål. Det er jo inkludert.
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-lg leading-relaxed text-white/80">
            Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil
            koste for din bedrift, og om vi passer sammen.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <GulPille href={site.phoneHref} dataCta="d-final-ring">
              <PhoneIcon className="h-5 w-5" />
              Ring {site.phoneDisplay}
            </GulPille>
            <a
              href={enabled ? "/kontakt" : site.emailHref}
              data-cta="d-final-sekundaer"
              className="font-medium text-white/85 underline-offset-4 hover:underline"
            >
              {enabled ? "…eller be om tilbud skriftlig" : `…eller skriv til ${site.email}`}
            </a>
          </div>
          <p className="mt-7 text-sm text-white/60">
            Hverdager 08–16 · Jar i Bærum · Ask i Gjerdrum · Digitalt i hele
            Norge
          </p>
        </div>
      </section>
    </div>
  );
}
