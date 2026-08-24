import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Forslag: tre helt nye forsider",
  robots: { index: false, follow: false },
};

/**
 * INTERN VELGERSIDE (kun staging): tre prototyper med helt ulike skjeletter,
 * bygget 2026-08-24 etter Henriks «tenk nytt — helt ny side»-ordre.
 * Henrik velger retning → vinneren rulles ut som ny forside.
 */
const forslag = [
  {
    href: "/forslag/morkt-kontor",
    navn: "A — Mørkt kontor",
    ide: "Dark-first premium: hele siden på mørkt navy-lerret, lysende asur-data, massiv hvit serif. Snur grunnfargen alle tidligere versjoner delte — og ligner ingen norsk konkurrent.",
    kjennetegn: "Mørkt lerret · glødende instrumentpaneler · ett lyst kontrastøyeblikk",
  },
  {
    href: "/forslag/regnskapet",
    navn: "B — Regnskapet",
    ide: "Forsiden som et vakkert satt årsregnskap: dokumenthode med org.nr og stempel, innholdsfortegnelse som hero, seksjonene ført som noter med tall i margen. Konseptet bare et regnskapsbyrå kan eie.",
    kjennetegn: "Dokumentpapir · noterte seksjoner · hovedbok-linjer · vedleggs-foto",
  },
  {
    href: "/forslag/skjermen",
    navn: "C — Skjermen",
    ide: "Nettsiden føles som økonomiskjermen kundene får: fast mørk venstre-rail med løftet, frister og tall — innholdet scroller som rolige rapportmoduler til høyre. Helt annet skjelett enn seksjonstabelen.",
    kjennetegn: "Fast rail + modulstrøm · frister som live-panel · dashbord-ro",
  },
  {
    href: "/forslag/inkludert",
    navn: "D — Inkludert",
    ide: "Stilen fra Randi, Fiken, Testen og Drivly: skoggrønn palett med grønntonede nøytraler, elgul glød-pille som signatur-CTA, pastellbånd per seksjon, Fraunces-serif og deadpan tosetningsoverskrifter — alt nytt: seksjoner, tekst og farger.",
    kjennetegn: "Skoggrønn + elgul · pastellbånd · glød-pille · «Når vi sier inkludert…»",
  },
];

export default function ForslagPage() {
  return (
    <section className="section-y mx-auto max-w-6xl px-4">
      <p className="section-eyebrow">Internt · vises ikke i menyen</p>
      <h1 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
        Tre helt nye forsider — velg retning
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-slate">
        Hver prototype bryter skjelettet fra dagens side på sin egen måte, med
        ekte innhold, ekte bilder og alle de harde reglene intakt. Åpne dem i
        fullskjerm, se dem på mobil — og si hvilken som skal bli den nye
        forsiden (eller hva som skal kombineres).
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {forslag.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group card-line card-line-hover flex flex-col p-7"
          >
            <h2 className="font-display text-2xl font-bold text-navy group-hover:text-blue">
              {f.navn}
            </h2>
            <p className="mt-3 flex-1 leading-relaxed text-slate">{f.ide}</p>
            <p className="microlabel mt-4 text-slate">{f.kjennetegn}</p>
            <span className="mt-5 font-sans font-bold text-blue group-hover:underline">
              Åpne prototypen <Arrow className="text-azure" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
