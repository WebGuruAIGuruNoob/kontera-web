import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { PhoneIcon } from "@/components/layout/Header";

/**
 * Final CTA-seksjon (MASTERPLAN §6/§9): begge veier inn —
 * stort telefonnummer + skjema + responstidsløfte.
 */
export function FinalCta({
  title = "Klar for en regnskapsfører som faktisk kjenner deg?",
  text = "Ta en uforpliktende prat, så finner vi ut om vi er en god match. Eller send oss noen linjer om hva du ser etter — vi svarer innen én arbeidsdag.",
}: {
  title?: string;
  text?: string;
}) {
  const formEnabled = !!process.env.RESEND_API_KEY;
  return (
    <section id="kontakt" className="bg-navy-deep py-16 text-white lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-azure">
            Ta kontakt
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight [text-wrap:balance] lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-white/80">{text}</p>

          <a
            href={site.phoneHref}
            data-cta="final-ring"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-white px-6 py-4 font-display text-xl font-extrabold text-navy shadow-lift transition-transform hover:-translate-y-0.5"
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

        <div className="text-ink">
          <ContactForm enabled={formEnabled} />
        </div>
      </div>
    </section>
  );
}
