import { site } from "@/data/site";
import { CheckIcon } from "@/components/sections/Hero";

/**
 * Samarbeidsmodellen — «Ikke kunde. Samarbeidspartner.»
 * Konteras fire kjerneløfter (MASTERPLAN §3).
 */
export function PromiseGrid({
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
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            {title}
          </h2>
          <p className="mt-4 leading-relaxed text-slate">{intro}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.promises.map((promise) => (
            <div
              key={promise.title}
              className="rounded-lg border border-line bg-white p-6 shadow-card"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue/10 text-blue">
                <CheckIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">
                {promise.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{promise.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
