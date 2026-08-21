import { site } from "@/data/site";
import { PhoneIcon, CheckIcon } from "@/components/icons";

/**
 * Typografiledet split-hero (DESIGNPLAN §3): ingen foto, papir-grunn,
 * én subtil navy/azur-radial. Venstre 7/12 tekst, høyre 5/12 aside (LeadCard el.l.).
 * Mobil: tekst først, aside etter (sticky-baren dekker hurtighandling).
 */
export function HeroSplit({
  eyebrow,
  title,
  subtitle,
  chips,
  aside,
  compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  chips?: string[];
  aside?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55rem_28rem_at_88%_-12%,rgb(7_160_228/0.08),transparent_70%)]"
      />
      <div
        className={`mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-12 lg:gap-14 ${
          compact ? "py-12 lg:py-16" : "py-16 lg:py-24"
        }`}
      >
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-display font-bold text-ink [text-wrap:balance]">
            {title}
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-slate">
            {subtitle}
          </p>

          {!aside && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.phoneHref}
                data-cta="hero-ring"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-blue px-6 py-3.5 font-sans text-base font-bold text-white transition-colors hover:bg-blue-dark"
              >
                <PhoneIcon className="h-5 w-5" />
                Ring {site.phoneDisplay}
              </a>
              <a
                href="/kontakt"
                data-cta="hero-kontakt"
                className="inline-flex items-center justify-center rounded-lg border border-navy/25 px-6 py-3.5 font-sans text-base font-bold text-navy transition-colors hover:border-navy/50"
              >
                Få et uforpliktende tilbud <span aria-hidden="true" className="ml-2">→</span>
              </a>
            </div>
          )}

          {chips && chips.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-semibold text-navy">
              {chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0 text-azure" />
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </div>

        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
