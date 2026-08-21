import { site } from "@/data/site";

/**
 * Social proof-linje rett under hero (MASTERPLAN §9):
 * sanne tallfakta og garantier — aldri fabrikkerte sitater eller ratings.
 */
export function TrustBar() {
  const facts = [
    `${site.employees} dedikerte ansatte`,
    `${site.statsautoriserte} statsautoriserte regnskapsførere`,
    "Fast kontaktperson + fast backup",
    "Ingen faktura for korte spørsmål",
    `Etablert ${site.founded}`,
  ];
  return (
    <section aria-label="Hvorfor velge Kontera" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-navy">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-azure" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
