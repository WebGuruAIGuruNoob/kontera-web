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
      <section className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Kontakt</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-ink [text-wrap:balance]">
            Snakk med en regnskapsfører hos oss
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Den beste måten å finne ut om vi passer for bedriften din, er å
            snakke sammen. Ring oss direkte – eller send noen linjer om hva du
            trenger hjelp til, så tar vi kontakt innen én arbeidsdag.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <a
              href={site.phoneHref}
              data-cta="kontakt-ring"
              className="flex items-center gap-4 rounded-lg bg-blue p-6 text-white shadow-lift transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <PhoneIcon className="h-7 w-7" />
              </span>
              <span>
                <span className="block font-display text-2xl font-extrabold">
                  {site.phoneDisplay}
                </span>
                <span className="text-sm text-white/85">
                  Hverdager 08–16 · Uforpliktende samtale
                </span>
              </span>
            </a>

            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="font-display text-lg font-bold text-navy">E-post</h2>
              <a href={site.emailHref} className="mt-1 block font-semibold text-blue hover:underline">
                {site.email}
              </a>
            </div>

            {site.offices.map((office) => (
              <div key={office.id} className="rounded-lg border border-line bg-white p-6">
                <h2 className="font-display text-lg font-bold text-navy">
                  Kontor {office.label}
                </h2>
                <p className="mt-1 text-slate">
                  {office.street}, {office.postalCode} {office.city}
                </p>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-bold text-blue hover:underline"
                >
                  Vis i Google Maps →
                </a>
              </div>
            ))}

            <p className="text-sm text-slate">
              {site.legalName} · Org.nr {site.orgNr} · Autorisert
              regnskapsforetak med statsautoriserte regnskapsførere
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-lg font-bold text-navy">
              Send oss noen ord om bedriften din
            </h2>
            <ContactForm enabled={formEnabled} />
          </div>
        </div>
      </section>
      <Faq items={kontaktFaq} title="Spørsmål og svar før du tar kontakt" />
    </>
  );
}
