import type { Metadata } from "next";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Bransjer vi kan – bil, bygg, eiendom, netthandel og flere",
  description:
    "Spisskompetanse på regnskap for bilforhandlere, håndverkere, eiendom og netthandel – og bred kompetanse for de fleste andre bransjer. Ring 960 00 400.",
  alternates: { canonical: "/bransjer" },
};

export default function BransjerPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Bransjer", href: "/bransjer" }]} />
      <Hero
        compact
        eyebrow="Bransjer"
        title="Et regnskap er ikke bare et regnskap"
        subtitle="Avansemoms for bilforhandlere. Prosjektregnskap for byggmestere. Betalingsavstemming for nettbutikker. Bransjekunnskap er forskjellen på ført – og ført riktig."
        image="/images/pexels/handverker-2.jpg"
      />
      <TrustBar />
      <IndustryCards
        title="Bransjene vi kjenner best"
        intro="Vi har bygget dyp kompetanse der regelverket er mest krevende – og har bred erfaring som passer de fleste andre bransjer. Finner du ikke din? Ta en prat, så finner vi ut om vi er en god match."
      />
      <FinalCta />
    </>
  );
}
