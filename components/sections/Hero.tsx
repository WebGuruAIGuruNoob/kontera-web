import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { PhoneIcon } from "@/components/layout/Header";

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  /** Sti under /public, f.eks. /images/pexels/kontor-1.jpg */
  image?: string;
  imageAlt?: string;
  /** Mikro-social-proof under CTA-ene */
  proof?: string[];
  secondaryHref?: string;
  secondaryLabel?: string;
  compact?: boolean;
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  proof,
  secondaryHref = "/kontakt",
  secondaryLabel = "Få et uforpliktende tilbud",
  compact = false,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      {image && (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
      )}
      <div className="hero-gradient absolute inset-0 -z-[5]" aria-hidden="true" />
      <div
        className={`mx-auto max-w-6xl px-4 ${compact ? "py-16 lg:py-20" : "py-20 lg:py-28"}`}
      >
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-azure">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight [text-wrap:balance] lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.phoneHref}
              data-cta="hero-ring"
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-white px-6 py-3.5 font-display text-base font-bold text-navy shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <PhoneIcon className="h-5 w-5 text-blue" />
              Ring {site.phoneDisplay}
            </a>
            <Link
              href={secondaryHref}
              data-cta="hero-skjema"
              className="inline-flex items-center justify-center rounded-md border-2 border-white/50 px-6 py-3 font-display text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          </div>
          <p className="mt-3 text-sm text-white/70">
            En uforpliktende prat — så finner vi ut om vi er en god match.
          </p>

          {proof && proof.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
              {proof.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
