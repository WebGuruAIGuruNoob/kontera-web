import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";

export const metadata: Metadata = {
  title: "Jobb i Kontera – send en åpen søknad",
  description:
    "Vil du jobbe i et lite regnskapsbyrå der du får egne kunder, faglig ansvar og erfarne kolleger rundt deg? Send en åpen søknad til post@kontera.no.",
  alternates: { canonical: "/jobb" },
};

const goder = [
  {
    tittel: "Egne kundeforhold",
    tekst: "Hos oss får du dine egne kunder og ansvaret for hele regnskapet deres. Du følger de samme virksomhetene over tid og kjenner tallene bak.",
  },
  {
    tittel: "Faglig bredde",
    tekst: "Bil, bygg, eiendom, netthandel, tjenester: Du jobber på tvers av bransjer og hele faget, fra bilag til årsoppgjør og rådgivning.",
  },
  {
    tittel: "Erfarne kolleger tett på",
    tekst: "Stedfortrederordningen vår gjelder internt også. Ingen står alene med en frist, og terskelen for å spørre en kollega er lav.",
  },
  {
    tittel: "Moderne verktøy",
    tekst: "Vi jobber digitalt i Tripletex, Uni Micro og flere andre systemer — med rom for å foreslå bedre måter å gjøre ting på.",
  },
];

export default function JobbPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Jobb i Kontera", href: "/jobb" }]} />
      <HeroSplit
        compact
        eyebrow="Jobb i Kontera"
        title={
          <>
            Bli regnskapsføreren kundene{" "}
            <span className="hl-serif-italic">kjenner ved navn</span>
          </>
        }
        subtitle="Vi er seks i dag, og ser alltid etter dyktige regnskapsførere som liker å jobbe tett med kundene sine. Send en åpen søknad til post@kontera.no."
      />

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            Slik er det å jobbe i Kontera
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Hos Kontera har du ansvaret for egne kundeforhold, ser hele bildet
            og får faglig ansvar fra dag én — med erfarne kolleger og
            statsautoriserte regnskapsførere rundt deg. Du følger de samme
            virksomhetene over tid, fra løpende bokføring til årsoppgjør og
            rådgivning.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {goder.map((gode) => (
            <div key={gode.tittel} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <h3 className="font-display text-base font-bold text-navy">{gode.tittel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{gode.tekst}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-azure/40 bg-mist p-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-navy">
            Ingen utlyste stillinger akkurat nå — men vi vil gjerne høre fra deg
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate">
            Er du regnskapsfører, eller på god vei til å bli det, og kjenner
            deg igjen i måten vi jobber på, vil vi gjerne se søknaden din. Send
            en åpen søknad med CV til{" "}
            <a href="mailto:post@kontera.no" className="font-bold text-blue hover:underline">
              {site.email}
            </a>{" "}
            — vi leser alle søknader, og svarer alle.
          </p>
        </div>
      </section>
    </>
  );
}
