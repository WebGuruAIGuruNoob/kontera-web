import type { Metadata } from "next";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { IndustryCards } from "@/components/sections/IndustryCards";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regnskap for din bransje – bil, bygg, eiendom og netthandel",
  description:
    "Regnskap for bilforhandlere, håndverkere, eiendom og netthandel – og bred erfaring fra de fleste andre bransjer. Fast regnskapsfører. Ring 960 00 400.",
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
            Regnskap tilpasset <span className="hl-serif-italic">din</span> bransje
          </>
        }
        subtitle="Avansemetoden for bilforhandlere. Prosjektregnskap for byggmestere. Betalingsavstemming for nettbutikker. Vi kjenner regelverket og rutinene som gjelder i bransjen din."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bransje"
            subheading="Fortell oss kort om driften din, så får du et tilbud fra en regnskapsfører med erfaring fra bransjen."
          />
        }
      />
      <IndustryCards
        title="Bransjene vi kjenner best"
        intro="Vi har spesialisert oss der regelverket er mest krevende, og har bred erfaring fra de fleste andre bransjer."
      />
      <NumberedJourney leadEnabled={enabled} />
      <FinalCta />
    </>
  );
}
