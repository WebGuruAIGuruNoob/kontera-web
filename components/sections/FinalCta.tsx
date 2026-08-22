import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { PhoneIcon } from "@/components/icons";
import { leadEnabled } from "@/lib/lead";

/**
 * Final CTA-seksjon: begge veier inn — stort telefonnummer + skjema.
 * Ankermål (#kontakt) for alle inline-CTA-er på siden.
 */
export function FinalCta({
  title = "Klar for en regnskapsfører som faktisk kjenner deg?",
  text = "Ta en uforpliktende prat, så finner vi ut om vi er en god match. Eller send oss noen linjer om hva du ser etter.",
}: {
  title?: string;
  text?: string;
}) {
  const enabled = leadEnabled();
  return (
    <section id="kontakt" className="section-y-lg bg-navy text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading tone="dark" eyebrow="Ta kontakt" title={title} intro={text} />

          <a
            href={site.phoneHref}
            data-cta="final-ring"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 font-display text-xl font-bold text-navy transition-colors hover:bg-mist"
          >
            <PhoneIcon className="h-6 w-6 text-blue" />
            {site.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-white/70">
            Hverdager 08–16. Korte spørsmål koster aldri noe.
          </p>

          <ul className="mt-8 space-y-2 text-sm text-white/80">
            {site.offices.map((office) => (
              <li key={office.id}>
                <span className="font-bold text-white">{office.label}:</span>{" "}
                {office.street}, {office.postalCode} {office.city}
              </li>
            ))}
            <li>
              <span className="font-bold text-white">E-post:</span>{" "}
              <a href={site.emailHref} className="underline hover:text-azure">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="text-ink lg:col-span-6">
          <ContactForm enabled={enabled} />
        </div>
      </div>
    </section>
  );
}
