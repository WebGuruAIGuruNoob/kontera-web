import { site } from "@/data/site";

/**
 * Stille proof-linje under hero (DESIGNPLAN §3): kun SANNE tall og fakta
 * (ekthetsregelen). Rating/kundetall legges til når de finnes og er sanne.
 */
export function ProofStrip({ extra }: { extra?: string[] }) {
  const facts: { text: string; mobil: boolean }[] = [
    { text: `${site.employees} ansatte — du kjenner alle`, mobil: true },
    { text: `${site.statsautoriserte} statsautoriserte regnskapsførere`, mobil: true },
    { text: "Korte spørsmål: 0 kr", mobil: true },
    { text: "Fast kontaktperson + fast backup", mobil: false },
    { text: `Etablert ${site.founded}`, mobil: false },
    ...(extra ?? []).map((text) => ({ text, mobil: false })),
  ];
  return (
    <section aria-label="Hvorfor velge Kontera" className="border-y border-navy/10 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <ul className="flex flex-wrap items-center justify-start gap-x-8 gap-y-2 text-sm font-semibold text-navy lg:justify-between">
          {facts.map((fact) => (
            <li
              key={fact.text}
              className={`items-center gap-2 ${fact.mobil ? "flex" : "hidden sm:flex"}`}
            >
              <span className="h-1 w-1 rounded-full bg-azure" aria-hidden="true" />
              {fact.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
