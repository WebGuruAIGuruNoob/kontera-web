/**
 * Statistikk som INNFELT navy-panel (LØFTEPLAN funn 4+12): rounded-3xl,
 * -mt-overlapp mot seksjonen over (overlapp-grepet §2.3), featurevektet
 * førstetall. Ikke lenger fullbredde-bånd — mørkehierarkiet er
 * PricingSection (bånd) → FinalCta (navy) → Footer (navy-deep).
 */
export type StatItem = {
  label: string;
  value: string;
  numeric?: number;
  suffix?: string;
};

export function StatBand({
  items,
  source,
  title,
  overlap = true,
}: {
  items: StatItem[];
  source?: string;
  title?: string;
  overlap?: boolean;
}) {
  const [feature, ...rest] = items;
  return (
    <section className={`mx-auto max-w-6xl px-4 pb-14 ${overlap ? "relative z-10 -mt-4" : "pt-4"}`}>
      <div className="rounded-3xl bg-navy px-6 py-10 text-white lg:px-10 lg:py-12">
        {title && (
          <h2 className="mb-8 font-display text-h2 font-semibold [text-wrap:balance]">
            {title}
          </h2>
        )}
        <dl
          data-reveal-group
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {feature && (
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <dd className="font-display text-5xl font-bold tabular-nums text-gul lg:text-6xl">
                {feature.numeric !== undefined ? (
                  <>
                    <span data-count-to={feature.numeric}>
                      {feature.numeric.toLocaleString("nb-NO")}
                    </span>
                    {feature.suffix}
                  </>
                ) : (
                  feature.value
                )}
              </dd>
              <dt className="mt-1.5 text-sm font-semibold uppercase tracking-wider text-white/75">
                {feature.label}
              </dt>
            </div>
          )}
          {rest.map((item) => (
            <div key={item.label}>
              <dd className="font-display text-2xl font-bold tabular-nums text-gul lg:text-3xl">
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
