import Link from "next/link";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon, PhoneIcon, Arrow } from "@/components/icons";

/**
 * Prisseksjon («Inkludert»-designet): pris-ærligheten bor på lyst grønt bånd
 * med hvitt tilbudskort — sidens ENESTE mørke flate er finalen (FinalCta).
 * Randi-modellen NÅR priser er godkjent (§14.7 — fastpris-ankre per segment).
 * ALDRI oppdiktede kronebeløp.
 */
const inkludert = [
  "Fast regnskapsfører som kjenner bedriften din",
  "Fast stedfortreder som også kjenner bedriften",
  "Korte spørsmål og småavklaringer inkludert",
  "Oversikt over alle offentlige frister",
  "Rapporter gjennomgått og forklart",
  "Alle tillegg avtales før de påløper",
];

export function PricingSection({
  leadEnabled,
  stedsnavn,
}: {
  leadEnabled: boolean;
  stedsnavn?: string;
}) {
  return (
    <section className="section-y bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Priser"
            title="Midtsjiktet på pris. Toppsjiktet på å ta telefonen."
            intro={`Vi konkurrerer ikke på laveste timepris, men på at du får en erfaren, fast regnskapsfører i et autorisert regnskapsforetak med statsautoriserte regnskapsførere. Prisen settes av bilagsmengde, ansatte og hvor mye du vil gjøre selv${stedsnavn ? ` — ikke av at du holder til i ${stedsnavn}` : ""}, og avtales tydelig før vi starter.`}
          />
          <ul className="mt-6 grid gap-2.5 text-sm font-semibold text-navy sm:grid-cols-2">
            {inkludert.map((punkt) => (
              <li key={punkt} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-azure" />
                {punkt}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-3xl bg-surface p-7 shadow-[0_4px_12px_rgba(28,79,45,0.06)] lg:col-span-5">
          <p className="font-display text-xl font-semibold text-navy">
            Få prisen for {stedsnavn ? `din bedrift i ${stedsnavn}` : "din bedrift"}
          </p>
          <p className="text-sm leading-relaxed text-slate">
            En kort samtale om bilagsmengde og behov, så får du et konkret
            tilbud med tydelige forutsetninger. Som regel samme dag.
          </p>
          {leadEnabled ? (
            <a href="#kontakt" data-cta="pris-tilbud" className="pille mt-2">
              Be om et tilbud <Arrow />
            </a>
          ) : (
            <a href={site.phoneHref} data-cta="pris-ring" className="pille mt-2">
              <PhoneIcon className="h-5 w-5" />
              Ring {site.phoneDisplay}
            </a>
          )}
          <Link
            href="/priser"
            className="text-center text-sm font-bold text-navy hover:underline"
          >
            Slik settes prisen <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
