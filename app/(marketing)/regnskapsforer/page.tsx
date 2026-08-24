import type { Metadata } from "next";
import Link from "next/link";
import { fylker } from "@/lib/geo";
import { getStats, tall } from "@/lib/geo-stats";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regnskapsfører i hele Norge – finn ditt område",
  description:
    "Kontera leverer regnskap, lønn og årsoppgjør digitalt i hele Norge – med fast regnskapsfører som kjenner deg. Finn ditt fylke og din kommune her.",
  alternates: { canonical: "/regnskapsforer" },
};

export default function GeoHubPage() {
  const enabled = leadEnabled();
  return (
    <>
      <Breadcrumbs items={[{ name: "Regnskapsfører", href: "/regnskapsforer" }]} />
      <HeroSplit
        compact
        eyebrow="Der du er"
        title={
          <>
            Regnskapsfører der <span className="hl-serif-italic">du</span> driver bedrift
          </>
        }
        subtitle="Vi leverer regnskap, lønn og årsoppgjør digitalt i hele Norge – med kontorer på Jar i Bærum og Ask i Gjerdrum. Velg fylket ditt for lokale tall, bransjeinnsikt og svar."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="Uansett hvor i landet bedriften din holder til: en kort samtale, så får du et konkret tilbud."
          />
        }
      />

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Velg område</p>
          <h2 className="mt-2 font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Alle fylker. Alle kommuner. Velg ditt.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Hver side gir deg ferske tall om næringslivet i området (fra
            Brønnøysundregistrene og SSB), bransjeinnsikten som er mest relevant
            lokalt, og svar på spørsmålene bedrifter i området stiller oftest.
          </p>
        </div>
        <div data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fylker.map((fylke, i) => {
            const total = fylke.kommuner.reduce(
              (sum, k) => sum + (getStats(k.nr)?.total ?? 0),
              0
            );
            const tint = ["bg-mist", "bg-cream", "bg-varm"][i % 3];
            return (
              <Link
                key={fylke.nr}
                href={`/regnskapsforer/${fylke.slug}`}
                className={`group rounded-3xl ${tint} border border-navy/10 p-5 shadow-[0_2px_8px_rgba(28,79,45,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]`}
              >
                <h3 className="font-display text-lg font-bold text-navy group-hover:text-blue">
                  {fylke.visningsnavn}
                </h3>
                <p className="mt-1 text-sm tabular-nums text-slate">
                  {fylke.kommuner.length === 1
                    ? "1 kommune"
                    : `${fylke.kommuner.length} kommuner`}{" "}
                  · {tall(total)} virksomheter
                </p>
                <span className="mt-3 inline-block text-sm font-bold text-blue group-hover:underline">
                  Se området →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <NumberedJourney leadEnabled={enabled} />
      <FinalCta />
    </>
  );
}
