/**
 * Mini-datavisualisering av kommunens næringsprofil (DESIGNPLAN §4.5) —
 * «vis tallene» er regnskapsbyråets sterkeste bildespråk. Ren server-rendret CSS.
 */
export function NaeringsProfil({
  navn,
  næringer,
  total,
}: {
  navn: string;
  næringer: { label: string; antall: number }[];
  total: number;
}) {
  if (næringer.length === 0 || total === 0) return null;
  const max = Math.max(...næringer.map((n) => n.antall));
  return (
    <figure className="rounded-xl border border-navy/10 bg-mist/60 p-5">
      <figcaption className="text-xs font-bold uppercase tracking-wider text-slate">
        Største næringer i {navn}
      </figcaption>
      <div className="mt-3 space-y-2.5">
        {næringer.map((n) => (
          <div key={n.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-ink">{n.label}</span>
              <span className="tabular-nums font-bold text-navy">
                {n.antall.toLocaleString("nb-NO")}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue to-azure"
                style={{ width: `${Math.max(8, Math.round((n.antall / max) * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate">
        Kilde: Brønnøysundregistrene · {total.toLocaleString("nb-NO")} virksomheter totalt
      </p>
    </figure>
  );
}
