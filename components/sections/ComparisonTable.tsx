import { CheckIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * «Kontera vs. mange byråer» (DESIGNPLAN §3 — konverterer byttere).
 * Nøytral hedging: «mange», «varierer» — aldri navngitte konkurrenter.
 */
const rows: { tema: string; kontera: string; andre: string }[] = [
  {
    tema: "Korte spørsmål og småavklaringer",
    kontera: "Inkludert i honoraret",
    andre: "Varierer — mange fakturerer per henvendelse",
  },
  {
    tema: "Kontaktperson",
    kontera: "Én fast regnskapsfører for hele regnskapet, og fast stedfortreder",
    andre: "Varierer — henvendelsen går til den som er tilgjengelig",
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
    kontera: "I mellomsjiktet — avtales før oppstart",
    andre: "Varierer med byrå og prismodell",
  },
];

export function ComparisonTable({ title = "Sammenlign med byrået du har i dag" }: { title?: string }) {
  return (
    <section className="section-y bg-mist">
      <div className="mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow="Sammenlign" title={title} />
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
