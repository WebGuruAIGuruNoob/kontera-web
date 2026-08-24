import { site } from "@/data/site";
import { PhoneIcon, CheckIcon } from "@/components/icons";

/**
 * Typografiledet split-hero (DESIGNPLAN §3, forenklet i RYDDEPLAN R10:
 * backdrop-forskyvning og collage-extra er strøket — grid og luft gir roen).
 * compact-modus har egen, mindre display-skala.
 */
export function HeroSplit({
  eyebrow,
  title,
  subtitle,
  chips,
  aside,
  compact = false,
  variant = "standard",
  showCtas = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  chips?: string[];
  aside?: React.ReactNode;
  compact?: boolean;
  /** «aurora» (kun forsiden): rikere brand-gradient-bakteppe med ambient drift */
  variant?: "standard" | "aurora";
  /** Tydelig CTA-rad i heroen også når lead-kortet finnes (forside-CRO) */
  showCtas?: boolean;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-mist ${
        variant === "aurora" ? "aurora" : ""
      }`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-12 lg:gap-14 ${
          compact ? "py-12 lg:py-16" : "py-16 lg:py-24"
        }`}
      >
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
          <h1
            className={
              compact
                ? "mt-3 font-display text-[clamp(2.1rem,1.3rem+2.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-navy [text-wrap:balance]"
                : "mt-3 font-display text-display font-semibold text-navy [text-wrap:balance]"
            }
          >
            {title}
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-slate">
            {subtitle}
          </p>

          {(!aside || showCtas) && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href={site.phoneHref} data-cta="hero-ring" className="pille">
                <PhoneIcon className="h-5 w-5" />
                Ring {site.phoneDisplay}
              </a>
              <a
                href={aside ? "#lead" : "/kontakt"}
                data-cta="hero-kontakt"
                className="font-sans font-semibold text-navy underline-offset-4 hover:underline"
              >
                Få et uforpliktende tilbud{" "}
                <span aria-hidden="true">→</span>
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

        {aside && (
          <div id="lead" className="scroll-mt-24 lg:col-span-5 lg:mt-4">
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
