import { CheckIcon } from "@/components/icons";

/**
 * «Kontera vs. mange byråer» (DESIGNPLAN §3 — konverterer byttere).
 * Ærlig hedging: «mange», «ofte», «varierer» — aldri navngitte konkurrenter.
 */
const rows: { tema: string; kontera: string; andre: string }[] = [
  {
    tema: "Korte spørsmål og småavklaringer",
    kontera: "Alltid inkludert — ring så mye du vil",
    andre: "Faktureres ofte per henvendelse",
  },
  {
    tema: "Kontaktperson",
    kontera: "Én fast som gjør hele regnskapet ditt + fast backup",
    andre: "Varierer — ofte den som er ledig",
  },
  {
    tema: "Bransjekunnskap",
    kontera: "Spisskompetanse på bil, bygg, eiendom og netthandel",
    andre: "Varierer fra byrå til byrå",
  },
  {
    tema: "Bindingstid",
    kontera: "Ingen",
    andre: "Varierer",
  },
  {
    tema: "Pris",
    kontera: "Middels — avtales tydelig på forhånd",
    andre: "Fra billig til dyr — overraskelser forekommer",
  },
];

export function ComparisonTable({ title = "Sjekk oss mot byrået du har i dag" }: { title?: string }) {
  return (
    <section className="border-y border-navy/10 bg-mist py-16">
      <div className="mx-auto max-w-5xl px-4">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Sammenlign</p>
        <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
          {title}
        </h2>
      </div>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-surface">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-navy/10 text-left">
              <th className="px-5 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-slate" scope="col"></th>
              <th className="px-5 py-3.5 font-sans text-sm font-bold text-blue" scope="col">
                Kontera
              </th>
              <th className="px-5 py-3.5 font-sans text-sm font-bold text-slate" scope="col">
                Mange byråer
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tema} className="border-b border-navy/10 last:border-0">
                <th scope="row" className="px-5 py-4 text-left font-sans font-bold text-ink">
                  {row.tema}
                </th>
                <td className="px-5 py-4">
                  <span className="flex items-start gap-2 font-semibold text-navy">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {row.kontera}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate">{row.andre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
}
