import Link from "next/link";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckIcon, PhoneIcon, Arrow } from "@/components/icons";

/**
 * Prisseksjon (DESIGNPLAN §3): Randi-modellen NÅR priser er godkjent (§14.7 —
 * fastpris-ankre per segment). Inntil da: ærlig prismodell + garantier + CTA.
 * ALDRI oppdiktede kronebeløp.
 */
const inkludert = [
  "Fast regnskapsfører som kjenner bedriften din",
  "Fast backup som også kjenner deg",
  "Korte spørsmål — alltid inkludert",
  "Alle offentlige frister overvåket",
  "Rapporter forklart på vanlig norsk",
  "Ingen skjulte gebyrer",
];

export function PricingSection({
  leadEnabled,
  stedsnavn,
}: {
  leadEnabled: boolean;
  stedsnavn?: string;
}) {
  return (
    <section className="section-y bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            tone="dark"
            eyebrow="Priser"
            title={
              <>
                Middels pris. Høy kvalitet.{" "}
                <span className="text-azure">Null taksameter.</span>
              </>
            }
            intro={`Vi er ikke billigst — det er et bevisst valg. Du betaler for en erfaren regnskapsfører som kjenner deg, ikke et anonymt tastesenter. Prisen settes av bilagsmengde, ansatte og hvor mye du vil gjøre selv${stedsnavn ? ` — ikke av at du holder til i ${stedsnavn}` : ""}, og avtales tydelig før vi starter.`}
          />
          <ul className="mt-6 grid gap-2.5 text-sm font-semibold text-white/90 sm:grid-cols-2">
            {inkludert.map((punkt) => (
              <li key={punkt} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {punkt}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-white/15 p-7 lg:col-span-5">
          <p className="font-display text-xl font-bold">
            Få prisen for {stedsnavn ? `din bedrift i ${stedsnavn}` : "din bedrift"}
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            En kort prat om bilagsmengde og behov — så får du et ærlig, konkret
            tilbud. Som regel samme dag.
          </p>
          {leadEnabled ? (
            <a
              href="#kontakt"
              data-cta="pris-tilbud"
              className="mt-2 rounded-lg bg-white px-6 py-3.5 text-center font-sans font-bold text-navy transition-colors hover:bg-mist"
            >
              Få et uforpliktende tilbud <Arrow />
            </a>
          ) : (
            <a
              href={site.phoneHref}
              data-cta="pris-ring"
              className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 font-sans font-bold text-navy transition-colors hover:bg-mist"
            >
              <PhoneIcon className="h-5 w-5 text-blue" />
              Ring {site.phoneDisplay}
            </a>
          )}
          <Link
            href="/priser"
            className="text-center text-sm font-bold text-azure hover:underline"
          >
            Slik settes prisen <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
