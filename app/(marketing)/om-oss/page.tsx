import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/SectionHeading";
import { FramedImage } from "@/components/FramedImage";
import { bilde } from "@/lib/bilder";

export const metadata: Metadata = {
  title: "Om oss – regnskapsbyrå på Jar i Bærum og Ask i Gjerdrum",
  description:
    "Kontera Regnskap AS er 6 ansatte med kontorer på Jar i Bærum og Ask i Gjerdrum. Statsautoriserte regnskapsførere, fast kontaktperson og kunder i hele Norge.",
  alternates: { canonical: "/om-oss" },
};

export default function OmOssPage() {
  const fotoer = [bilde("team:samarbeid-2"), bilde("omoss:kaffe-og-notater")].filter(
    (foto): foto is NonNullable<typeof foto> => !!foto
  );

  return (
    <>
      <Breadcrumbs items={[{ name: "Om oss", href: "/om-oss" }]} />
      <HeroSplit
        compact
        eyebrow="Om oss"
        title={
          <>
            Etablert i 2015. Seks ansatte.{" "}
            <span className="hl-serif-italic">Det er med vilje.</span>
          </>
        }
        chips={[
          "Statsautoriserte regnskapsførere",
          "Fast kontaktperson og stedfortreder",
          "Korte spørsmål inkludert",
        ]}
        subtitle="Kontera Regnskap er et lite fagmiljø på Jar i Bærum og Ask i Gjerdrum. Du får én fast regnskapsfører som kjenner tallene dine — og en fast stedfortreder som kjenner dem like godt."
      />

      {/* ===== Historien: tekst + to rammede foto ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Historien"
              title="Liten siden 2015. Det er forretningsmodellen."
              intro="Kontera Regnskap AS ble etablert i 2015 og holder til på Jar i Bærum og på Ask i Gjerdrum. Siden den gang har vi jobbet mest med bilbransjen, bygg og eiendom — og etter hvert netthandel og en rekke tjenestebransjer."
            />
            <p className="mt-4 max-w-2xl leading-relaxed text-slate">
              Vi har holdt oss små med vilje, fordi arbeidsmodellen vår krever
              det: Hver samarbeidspartner skal ha én fast regnskapsfører som
              kjenner virksomheten, og én fast stedfortreder som kjenner den
              like godt. Da vet du hvem du snakker med, og du slipper å
              forklare bedriften på nytt ved ferie eller sykdom.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate">
              I dag er vi seks ansatte, to statsautoriserte regnskapsførere og
              to kontorer. Det holder.
            </p>
          </div>
          <div className="grid gap-5 lg:col-span-5">
            {fotoer.map((foto) => (
              <FramedImage
                key={foto.src}
                src={foto.src}
                alt={foto.alt}
                sizes="(min-width: 1024px) 35vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Ord og autorisasjon på cream-bånd ===== */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-navy [text-wrap:balance]">
            Ord vi bruker. Papirer vi har.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
              <h3 className="font-display text-xl font-semibold text-navy">
                Derfor kaller vi kundene samarbeidspartnere
              </h3>
              <p className="mt-3 leading-relaxed text-slate">
                Vi kaller dem vi jobber for samarbeidspartnere. Et regnskap som
                skal gi verdi, forutsetter at vi forstår driften, bransjen og
                planene dine. Derfor tilpasser vi oss hver enkelt bedrift, og
                derfor er korte spørsmål og småavklaringer inkludert i
                honoraret. Terskelen for å ta kontakt skal være lav.
              </p>
            </div>
            <div className="rounded-3xl bg-surface p-8 shadow-[0_4px_12px_rgba(28,79,45,0.06)]">
              <h3 className="font-display text-xl font-semibold text-navy">
                Autorisert regnskapsforetak
              </h3>
              <p className="mt-3 leading-relaxed text-slate">
                Kontera Regnskap AS er et autorisert regnskapsforetak under
                tilsyn av Finanstilsynet, og to av oss er statsautoriserte
                regnskapsførere. Det betyr dokumenterte krav til kompetanse,
                rutiner og god regnskapsføringsskikk — og at du kan slå oss opp
                i Finanstilsynets virksomhetsregister når som helst. Org.nr{" "}
                {site.orgNr}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Kontorene ===== */}
      <section className="section-y mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Kontorene"
          title="Jar i Bærum. Ask i Gjerdrum. Og hele landet på video."
          intro="Vi fører regnskap for bedrifter i hele landet. Mange av dem møter vi på video og telefon, og oppfølgingen er den samme — uten reisevei."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {site.offices.map((office) => (
            <div
              key={office.id}
              className="rounded-3xl bg-mist p-7 shadow-[0_4px_12px_rgba(28,79,45,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(28,79,45,0.14)]"
            >
              <p className="font-display text-lg font-semibold text-navy">
                {office.label}
              </p>
              <p className="mt-1 text-sm text-slate">
                {office.street}, {office.postalCode} {office.city}
              </p>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-navy underline-offset-4 hover:underline"
              >
                Vis i kart <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <FinalCta
        title="Én samtale sier mer enn en om-oss-side."
        text="Ring, så hører du hvordan vi jobber — og finner ut om vi passer for bedriften din."
      />
    </>
  );
}
