import { site } from "@/data/site";
import { PhoneIcon, Arrow } from "@/components/icons";

/**
 * Inline CTA-banner mellom seksjoner (DESIGNPLAN §4): samme tilbud overalt,
 * anker-scroll til bunnskjemaet. Mode-aware: ring-primær til skjema er verifisert.
 */
export function CtaBanner({
  text,
  leadEnabled,
}: {
  text: string;
  leadEnabled: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-4">
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-navy/10 bg-mist px-6 py-5 sm:flex-row sm:items-center">
        <p className="font-sans text-base font-bold text-navy [text-wrap:balance]">
          {text}
        </p>
        {leadEnabled ? (
          <a
            href="#kontakt"
            data-cta="banner-tilbud"
            className="shrink-0 rounded-lg bg-blue px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-blue-dark"
          >
            Få et uforpliktende tilbud <Arrow />
          </a>
        ) : (
          <a
            href={site.phoneHref}
            data-cta="banner-ring"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue px-5 py-2.5 font-sans text-sm font-bold text-white transition-colors hover:bg-blue-dark"
          >
            <PhoneIcon className="h-4 w-4" />
            Ring {site.phoneDisplay}
          </a>
        )}
      </div>
    </div>
  );
}
