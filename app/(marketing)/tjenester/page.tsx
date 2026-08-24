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

/**
 * Tjeneste-hub («Inkludert»-rytmen): mist-hero → paper-bento →
 * mist-sammenligning → paper-reise → mørk finale. Pastellrotasjonen i
 * kortene bor i ServicesBento (delt komponent).
 */
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
            Seks regnskapstjenester. <span className="hl-serif-italic">Én</span> fast regnskapsfører.
          </>
        }
        subtitle="Fra løpende bokføring til årsoppgjør og rådgivning. Sett sammen det bedriften din trenger — og juster omfanget når behovet endrer seg. Samme faste person leverer det hele."
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
        title="Velg det du trenger. Dropp resten."
        intro="Alt leveres av den samme faste regnskapsføreren — én som kjenner bedriften din og historikken i tallene. Trenger du mer senere, utvider vi. Trenger du mindre, sier du ifra."
      />
      <ComparisonTable />
      <NumberedJourney leadEnabled={enabled} />
      <FinalCta
        title="Usikker på hvor du skal begynne? Begynn med en telefon."
        text="Én uforpliktende samtale om bedriften din — så foreslår vi hvilke tjenester som gir mening, og hva de vil koste."
      />
    </>
  );
}
