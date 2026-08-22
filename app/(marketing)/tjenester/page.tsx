import type { Metadata } from "next";
import { leadEnabled } from "@/lib/lead";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { LeadCard } from "@/components/LeadCard";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { NumberedJourney } from "@/components/sections/NumberedJourney";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regnskapstjenester – regnskap, lønn, årsoppgjør og mer",
  description:
    "Alt din bedrift trenger: løpende regnskapsføring, lønnskjøring, mva-melding, årsoppgjør, rådgivning og selskapsetablering. Fast regnskapsfører. Ring 960 00 400.",
  alternates: { canonical: "/tjenester" },
};

export default function TjenesterPage() {
  const enabled = leadEnabled();
  return (
    <>
      <Breadcrumbs items={[{ name: "Tjenester", href: "/tjenester" }]} />
      <HeroSplit
        compact
        eyebrow="Tjenester"
        title={
          <>
            Alt du trenger. <span className="hl-serif-italic">Én</span> fast regnskapsfører.
          </>
        }
        subtitle="Fra løpende bokføring til årsoppgjør og rådgivning – vi setter sammen akkurat den pakken bedriften din trenger, og justerer den når behovet endrer seg."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson + backup",
          "Korte spørsmål: 0 kr",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="Fortell oss kort hva du trenger — så får du et ærlig, konkret tilbud."
          />
        }
      />
      <ServicesBento
        title="Velg tjenesten du vil vite mer om"
        intro="Alle tjenester leveres av samme faste regnskapsfører – du slipper å bli sendt rundt mellom avdelinger."
      />
      <NumberedJourney leadEnabled={enabled} />
      <ComparisonTable />
      <FinalCta />
    </>
  );
}
