import type { Metadata } from "next";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Bransjer vi kan – bil, bygg, eiendom, netthandel og flere",
  description:
    "Spisskompetanse på regnskap for bilforhandlere, håndverkere, eiendom og netthandel – og bred kompetanse for de fleste andre bransjer. Ring 960 00 400.",
  alternates: { canonical: "/bransjer" },
};

export default function BransjerPage() {
  const enabled = leadEnabled();
  return (
    <>
      <Breadcrumbs items={[{ name: "Bransjer", href: "/bransjer" }]} />
      <HeroSplit
        compact
        eyebrow="Bransjer"
        title={
          <>
            Et regnskap er ikke <span className="hl-serif-italic">bare</span> et regnskap
          </>
        }
        subtitle="Avansemoms for bilforhandlere. Prosjektregnskap for byggmestere. Betalingsavstemming for nettbutikker. Bransjekunnskap er forskjellen på ført – og ført riktig."
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bransje"
            subheading="Fortell oss hva du driver med — så får du et tilbud fra noen som kan bransjen."
          />
        }
      />
      <ProofStrip />
      <IndustryCards
        title="Bransjene vi kjenner best"
        intro="Vi har bygget dyp kompetanse der regelverket er mest krevende – og har bred erfaring som passer de fleste andre bransjer."
      />
      <NumberedJourney leadEnabled={enabled} />
      <FinalCta />
    </>
  );
}
