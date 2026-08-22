import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";

export const metadata: Metadata = {
  title: "Jobb i Kontera – bli en av oss",
  description:
    "Vil du jobbe i et lite regnskapsbyrå der du får egne kunder, faglig ansvar og kolleger som stiller opp? Send en åpen søknad til post@kontera.no.",
  alternates: { canonical: "/jobb" },
};

const goder = [
  {
    tittel: "Egne samarbeidspartnere",
    tekst: "Hos oss får du dine egne kunder og hele regnskapet deres — ikke en kø av anonyme oppgaver fra et fordelingssystem.",
  },
  {
    tittel: "Faglig bredde",
    tekst: "Bil, bygg, eiendom, netthandel, tjenester: Du jobber på tvers av bransjer og hele faget, fra bilag til årsoppgjør og rådgivning.",
  },
  {
    tittel: "Kolleger som stiller opp",
    tekst: "Backup-modellen vår gjelder internt også. Ingen står alene med en frist, og spørsmål er alltid velkomne.",
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
            <span className="hl-serif-italic">faktisk kjenner</span>
          </>
        }
        subtitle="Vi er seks i dag — og ser alltid etter dyktige folk som deler troen på at regnskap er et samarbeidsfag. Send en åpen søknad til post@kontera.no."
      />

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            Hvorfor jobbe hos oss?
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            I store byråer blir du fort en brikke i en produksjonslinje. Hos
            Kontera eier du kundeforholdene dine, ser hele bildet og får
            ansvar fra dag én — med erfarne kolleger og statsautoriserte
            regnskapsførere rundt deg.
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
            Er du regnskapsfører (eller på god vei til å bli det) og kjenner
            deg igjen i måten vi jobber på? Send en åpen søknad med CV til{" "}
            <a href="mailto:post@kontera.no" className="font-bold text-blue hover:underline">
              {site.email}
            </a>{" "}
            — vi leser alt, og svarer alle.
          </p>
        </div>
      </section>
    </>
  );
}
