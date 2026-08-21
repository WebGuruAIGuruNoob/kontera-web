import { site } from "@/data/site";

/**
 * Samarbeidsmodellen som asymmetrisk redaksjonell seksjon (DESIGNPLAN §3):
 * 5/7-split, nummerert liste med serif-titler — ikke fire like kort.
 */
export function PromiseSplit({
  eyebrow = "Samarbeidsmodellen",
  title = "Ikke kunde. Samarbeidspartner.",
  intro = "Vi tilpasser oss hver enkelt bedrift og jobber tett med deg — fordi et regnskap som skal skape verdi, krever at vi faktisk kjenner virksomheten din.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-mist py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-h2 font-bold text-ink [text-wrap:balance]">
            {title}
          </h2>
          <p className="mt-4 max-w-[34rem] leading-relaxed text-slate">{intro}</p>
        </div>
        <ol data-reveal-group className="lg:col-span-7">
          {site.promises.map((promise, i) => (
            <li
              key={promise.title}
              className="flex gap-5 border-t border-navy/10 py-5 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl font-bold tabular-nums text-azure"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-navy">
                  {promise.title}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-slate">
                  {promise.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
