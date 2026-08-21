import type { Metadata } from "next";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Regnskapstjenester – regnskap, lønn, årsoppgjør og mer",
  description:
    "Alt din bedrift trenger: løpende regnskapsføring, lønnskjøring, mva-melding, årsoppgjør, rådgivning og selskapsetablering. Fast regnskapsfører. Ring 960 00 400.",
  alternates: { canonical: "/tjenester" },
};

export default function TjenesterPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Tjenester", href: "/tjenester" }]} />
      <Hero
        compact
        eyebrow="Tjenester"
        title="Alt du trenger. Én fast regnskapsfører."
        subtitle="Fra løpende bokføring til årsoppgjør og rådgivning – vi setter sammen akkurat den pakken bedriften din trenger, og justerer den når behovet endrer seg."
        image="/images/pexels/samarbeid-1.jpg"
      />
      <TrustBar />
      <ServiceCards
        title="Velg tjenesten du vil vite mer om"
        intro="Alle tjenester leveres av samme faste regnskapsfører – du slipper å bli sendt rundt mellom avdelinger."
      />
      <ProcessSteps />
      <FinalCta />
    </>
  );
}
