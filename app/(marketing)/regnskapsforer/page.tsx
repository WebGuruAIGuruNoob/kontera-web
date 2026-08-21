import type { Metadata } from "next";
import Link from "next/link";
import { fylker } from "@/lib/geo";
import { getStats, tall } from "@/lib/geo-stats";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { PromiseGrid } from "@/components/sections/PromiseGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regnskapsfører i hele Norge – finn ditt område",
  description:
    "Kontera leverer regnskap, lønn og årsoppgjør digitalt i hele Norge – med fast regnskapsfører som kjenner deg. Finn ditt fylke og din kommune her.",
  alternates: { canonical: "/regnskapsforer" },
};

export default function GeoHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Regnskapsfører", href: "/regnskapsforer" }]} />
      <Hero
        compact
        eyebrow="Der du er"
        title="Regnskapsfører der du driver bedrift"
        subtitle="Vi jobber digitalt med samarbeidspartnere i hele Norge – med kontorer på Jar i Bærum og Ask i Gjerdrum. Velg fylket ditt for lokale tall, bransjeinnsikt og svar."
        image="/images/pexels/norge-fjord-1.jpg"
      />
      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Velg område</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink [text-wrap:balance]">
            Alle fylker — alle kommuner
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Hver side gir deg ferske tall om næringslivet i området (fra
            Brønnøysundregistrene og SSB), bransjeinnsikten som er mest
            relevant lokalt — og svar på det bedrifter der faktisk lurer på.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fylker.map((fylke) => {
            const total = fylke.kommuner.reduce(
              (sum, k) => sum + (getStats(k.nr)?.total ?? 0),
              0
            );
            return (
              <Link
                key={fylke.nr}
                href={`/regnskapsforer/${fylke.slug}`}
                className="group rounded-lg border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h3 className="font-display text-lg font-bold text-navy group-hover:text-blue">
                  {fylke.visningsnavn}
                </h3>
                <p className="mt-1 text-sm text-slate">
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

      <PromiseGrid />
      <FinalCta />
    </>
  );
}
