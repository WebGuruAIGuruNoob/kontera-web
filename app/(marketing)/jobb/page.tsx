import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Jobb i Kontera – send en åpen søknad",
  description:
    "Vil du jobbe i et lite regnskapsbyrå der du får egne kunder, faglig ansvar og erfarne kolleger rundt deg? Send en åpen søknad til post@kontera.no.",
  alternates: { canonical: "/jobb" },
};

const goder = [
  {
    bg: "bg-mist",
    tittel: "Egne kundeforhold",
    tekst: "Hos oss får du dine egne kunder og ansvaret for hele regnskapet deres. Du følger de samme virksomhetene over tid og kjenner tallene bak.",
  },
  {
    bg: "bg-cream",
    tittel: "Faglig bredde",
    tekst: "Bil, bygg, eiendom, netthandel, tjenester: Du jobber på tvers av bransjer og hele faget, fra bilag til årsoppgjør og rådgivning.",
  },
  {
    bg: "bg-varm",
    tittel: "Erfarne kolleger tett på",
    tekst: "Stedfortrederordningen vår gjelder internt også. Ingen står alene med en frist, og terskelen for å spørre en kollega er lav.",
  },
  {
    bg: "bg-cream",
    tittel: "Moderne verktøy",
    tekst: "Vi jobber digitalt i Tripletex, Uni Micro og flere andre systemer — med rom for å foreslå bedre måter å gjøre ting på.",
  },
];

export default function JobbPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jobb i Kontera", href: "/jobb" }]} />

      {/* ===== Kompakt hero på grønt bånd (uten salgs-CTA — dette er en søkerside) ===== */}
      <section className="bg-mist">
        <div className="section-y-sm mx-auto max-w-6xl px-4">
          <p className="section-eyebrow">Jobb i Kontera</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.3rem+2.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-navy [text-wrap:balance]">
            Vi er seks.{" "}
            <span className="hl-serif-italic">Rett person</span> gjør oss til sju.
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-slate">
            Akkurat nå har vi ingen utlyste stillinger, men åpne søknader tar
            vi gjerne imot. Er du regnskapsfører og liker å følge egne kunder
            tett, vil vi gjerne høre fra deg.
          </p>
          <div className="mt-8">
            <a href={site.emailHref} data-cta="jobb-soknad" className="pille">
              Send en åpen søknad
            </a>
          </div>
          <p className="mt-4 text-sm font-medium text-slate">
            Egne kundeforhold · Statsautoriserte kolleger · Tripletex og Uni Micro
          </p>
        </div>
      </section>

      {/* ===== Fire tintede kort ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
          Slik er det å jobbe i Kontera
        </h2>
        <p className="mt-4 max-w-[38rem] leading-relaxed text-slate">
          Du får ansvar for egne kundeforhold fra start, med erfarne kolleger
          og to statsautoriserte regnskapsførere rundt deg. Du følger de samme
          virksomhetene over tid — fra løpende bokføring til årsoppgjør og
          rådgivning.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {goder.map((gode) => (
            <div
              key={gode.tittel}
              className={`rounded-3xl ${gode.bg} p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
            >
              <h3 className="font-display text-xl font-semibold text-navy">
                {gode.tittel}
              </h3>
              <p className="mt-3 leading-relaxed text-slate">{gode.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Åpen søknad på cream-bånd ===== */}
      <section className="section-y-sm bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl rounded-3xl bg-surface p-8 text-center shadow-[0_4px_12px_rgba(28,79,45,0.06)] lg:p-10">
            <h2 className="font-display text-h2 font-semibold text-navy [text-wrap:balance]">
              Ingen utlyste stillinger. Søk likevel.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate">
              Er du regnskapsfører, eller på god vei til å bli det, vil vi
              gjerne se søknaden din. Send CV og noen linjer om deg selv til{" "}
              <a
                href={site.emailHref}
                className="font-semibold text-navy underline underline-offset-4"
              >
                {site.email}
              </a>
              . Vi leser alle søknader — og svarer på alle.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
