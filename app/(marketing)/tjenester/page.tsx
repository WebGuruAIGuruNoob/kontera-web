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
  title: "Regnskapstjenester – regnskap, lønn, årsoppgjør og rådgivning",
  description:
    "Løpende regnskapsføring, lønnskjøring, mva-melding, årsoppgjør, rådgivning og selskapsetablering. Fast regnskapsfører. Ring 960 00 400.",
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
            Alle regnskapstjenester. <span className="hl-serif-italic">Én</span> fast regnskapsfører.
          </>
        }
        subtitle="Fra løpende bokføring til årsoppgjør og rådgivning. Vi setter sammen tjenestene bedriften din trenger, og justerer omfanget når behovet endrer seg."
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        aside={
          <LeadCard
            enabled={enabled}
            heading="Få pristilbud for din bedrift"
            subheading="Fortell oss kort hva du trenger, så får du et konkret tilbud med tydelige forutsetninger."
          />
        }
      />
      <ServicesBento
        title="Velg tjenesten du vil vite mer om"
        intro="Alle tjenester leveres av den samme faste regnskapsføreren – én som kjenner bedriften din og historikken i tallene."
      />
      <NumberedJourney leadEnabled={enabled} />
      <ComparisonTable />
      <FinalCta />
    </>
  );
}
