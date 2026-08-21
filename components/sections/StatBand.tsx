/**
 * Mørkt navy fullbredde-bånd med store tabular-nums-tellere (DESIGNPLAN §3).
 * Numeriske verdier telles opp ved scroll (MotionInit); statiske vises som de er.
 */
export type StatItem = {
  label: string;
  /** Ferdig formatert visningsverdi (fallback + reduced-motion) */
  value: string;
  /** Råtall → aktiverer telleren */
  numeric?: number;
  /** Suffiks etter telleren, f.eks. « kr» eller « år» */
  suffix?: string;
};

export function StatBand({
  items,
  source,
  title,
}: {
  items: StatItem[];
  source?: string;
  title?: string;
}) {
  return (
    <section className="bg-navy-deep py-14 text-white lg:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <h2 className="mb-8 font-display text-h2 font-bold [text-wrap:balance]">
            {title}
          </h2>
        )}
        <dl
          data-reveal-group
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {items.map((item) => (
            <div key={item.label}>
              <dd className="font-display text-3xl font-bold tabular-nums text-azure lg:text-4xl">
                {item.numeric !== undefined ? (
                  <>
                    <span data-count-to={item.numeric}>
                      {item.numeric.toLocaleString("nb-NO")}
                    </span>
                    {item.suffix}
                  </>
                ) : (
                  item.value
                )}
              </dd>
              <dt className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-white/70">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
        {source && <p className="mt-6 text-xs text-white/50">{source}</p>}
      </div>
    </section>
  );
}
