import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon } from "@/components/icons";
import { leadEnabled } from "@/lib/lead";

/**
 * Sitefinalen («Inkludert»-designet): mørk skoggrønn flate med gul glød,
 * sentrert tosetningsoverskrift og glød-pillen som eneste primærknapp.
 * Ankermål (#kontakt) for alle inline-CTA-er, og sidens garanterte
 * lead-punkt (data-lead-card) — skjemaet foldes inn når levering er
 * verifisert (lead-sikkerhetsregelen §7b.1).
 */
export function FinalCta({
  title = "Prøv oss på et spørsmål. Det er jo inkludert.",
  text = "Én uforpliktende samtale — så vet du hvordan vi jobber, hva det vil koste for din bedrift, og om vi passer sammen.",
}: {
  title?: string;
  text?: string;
}) {
  const enabled = leadEnabled();
  return (
    <section id="kontakt" className="finale-mork section-y-lg text-white">
      <div data-lead-card className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display text-[clamp(2rem,1.3rem+2.8vw,3.6rem)] font-semibold leading-tight [text-wrap:balance]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[36rem] text-lg leading-relaxed text-white/80">
          {text}
        </p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <a href={site.phoneHref} data-cta="final-ring" className="pille">
            <PhoneIcon className="h-5 w-5" />
            Ring {site.phoneDisplay}
          </a>
          {!enabled && (
            <a
              href={site.emailHref}
              data-cta="final-epost"
              className="font-medium text-white/85 underline-offset-4 hover:underline"
            >
              …eller skriv til {site.email}
            </a>
          )}
        </div>
        <p className="mt-7 text-sm text-white/60">
          Hverdager 08–16 · Jar i Bærum · Ask i Gjerdrum · Digitalt i hele Norge
        </p>
        {enabled && (
          <div className="mx-auto mt-12 max-w-xl text-left text-ink">
            <ContactForm enabled />
          </div>
        )}
      </div>
    </section>
  );
}
