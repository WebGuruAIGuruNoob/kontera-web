import { site } from "@/data/site";

/**
 * Stille proof-linje under hero (DESIGNPLAN §3): kun SANNE tall og fakta
 * (ekthetsregelen). Rating/kundetall legges til når de finnes og er sanne.
 */
export function ProofStrip({ extra }: { extra?: string[] }) {
  const facts = [
    `${site.employees} dedikerte ansatte`,
    `${site.statsautoriserte} statsautoriserte regnskapsførere`,
    `Etablert ${site.founded}`,
    "Fast kontaktperson + fast backup",
    "Ingen faktura for korte spørsmål",
    ...(extra ?? []),
  ];
  return (
    <section aria-label="Hvorfor velge Kontera" className="border-y border-navy/10 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-navy">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-azure" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
