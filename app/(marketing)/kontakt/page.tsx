import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneIcon } from "@/components/icons";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Kontakt oss – snakk med en regnskapsfører",
  description:
    "Ring 960 00 400, eller send oss noen linjer om bedriften din. Vi svarer innen én arbeidsdag. Kontorer på Jar i Bærum og Ask i Gjerdrum.",
  alternates: { canonical: "/kontakt" },
};

const kontaktFaq = [
  {
    q: "Hva skjer etter at jeg har tatt kontakt?",
    a: "Vi tar en kort samtale om bedriften din og hva du trenger. Passer vi sammen, får du et konkret tilbud med tydelige forutsetninger. Passer vi ikke, sier vi fra – og anbefaler gjerne noen andre.",
  },
  {
    q: "Koster den første samtalen noe?",
    a: "Nei. Den første samtalen er uten kostnad og uten forpliktelser. Korte spørsmål og småavklaringer er også inkludert i honoraret etter at du har blitt samarbeidspartner.",
  },
  {
    q: "Kan vi møtes fysisk?",
    a: "Ja. Du er velkommen til kontorene våre på Jar i Bærum eller Ask i Gjerdrum – eller vi tar møtet på video om det passer bedre.",
  },
  {
    q: "Jeg sitter i styret i et borettslag/sameie – gjelder skjemaet oss også?",
    a: "Ja. Skriv navnet på borettslaget eller sameiet i det første feltet, så tar vi kontakt og avtaler en samtale i god tid før neste styremøte.",
  },
];

export default function KontaktPage() {
  const formEnabled = !!process.env.RESEND_API_KEY;
  return (
    <>
      <Breadcrumbs items={[{ name: "Kontakt", href: "/kontakt" }]} />

      {/* ===== Kompakt hero på grønt bånd ===== */}
      <section className="bg-mist">
        <div className="section-y-sm mx-auto max-w-6xl px-4">
          <p className="section-eyebrow">Kontakt</p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.3rem+2.4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-navy [text-wrap:balance]">
            Ett nummer. Én e-post. Ekte folk i begge ender.
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-slate">
            Ring hvis du vil ha svar med en gang — hverdager 08–16. Eller bruk
            skjemaet, så tar vi kontakt innen én arbeidsdag.
          </p>
          <p className="mt-4 text-sm font-medium text-slate">
            Uforpliktende samtale · Ingen bindingstid · Autorisert regnskapsforetak
          </p>
        </div>
      </section>

      {/* ===== To veier inn: ring til venstre, skjema til høyre ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
              <h2 className="font-display text-xl font-semibold text-navy">
                Den raskeste veien
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                En kort samtale er som regel nok til å avklare behovet og gi
                deg et estimat med tydelige forutsetninger.
              </p>
              <a
                href={site.phoneHref}
                data-cta="kontakt-ring"
                className="pille mt-5 w-full sm:w-auto"
              >
                <PhoneIcon className="h-5 w-5" />
                Ring {site.phoneDisplay}
              </a>
              <p className="mt-3 text-sm text-slate">Hverdager 08–16</p>
            </div>

            <div className="rounded-3xl bg-cream p-7 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
              <h2 className="font-display text-lg font-semibold text-navy">E-post</h2>
              <a
                href={site.emailHref}
                className="mt-1 inline-block font-semibold text-navy underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>

            {site.offices.map((office) => (
              <div
                key={office.id}
                className="rounded-3xl bg-mist p-7 shadow-[0_4px_12px_rgba(28,79,45,0.06)]"
              >
                <h2 className="font-display text-lg font-semibold text-navy">
                  Kontor {office.label}
                </h2>
                <p className="mt-1 text-sm text-slate">
                  {office.street}, {office.postalCode} {office.city}
                </p>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-navy underline-offset-4 hover:underline"
                >
                  Vis i Google Maps <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}

            <p className="text-sm text-slate">
              {site.legalName} · Org.nr {site.orgNr} · Autorisert
              regnskapsforetak med statsautoriserte regnskapsførere
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-navy">
              Send oss noen linjer om bedriften din
            </h2>
            <ContactForm enabled={formEnabled} />
          </div>
        </div>
      </section>

      <Faq items={kontaktFaq} title="Det folk lurer på før de tar kontakt" />
    </>
  );
}
