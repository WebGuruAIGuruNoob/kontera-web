import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroSplit } from "@/components/sections/HeroSplit";
import { FinalCta } from "@/components/sections/FinalCta";
import { FramedImage } from "@/components/FramedImage";
import { bilde } from "@/lib/bilder";

export const metadata: Metadata = {
  title: "Om oss – et lite byrå med store fordeler",
  description:
    "Kontera Regnskap AS er 6 ansatte med kontorer på Jar i Bærum og Ask i Gjerdrum. Statsautoriserte regnskapsførere, personlig oppfølging og kunder i hele Norge.",
  alternates: { canonical: "/om-oss" },
};

export default function OmOssPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Om oss", href: "/om-oss" }]} />
      <HeroSplit
        compact
        eyebrow="Om oss"
        title={
          <>
            Store nok til å kunne alt.{" "}
            <span className="hl-serif-italic">Små nok til å kjenne deg.</span>
          </>
        }
        chips={["Statsautoriserte regnskapsførere", "Fast kontaktperson + backup", "Korte spørsmål: 0 kr"]}
        subtitle="Kontera Regnskap er seks mennesker som mener regnskap handler om samarbeid — ikke om et kundenummer i et køsystem."
      />

      <section className="section-y mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Historien vår
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              Kontera Regnskap AS ble etablert i {site.founded} og holder til på
              Jar i Bærum og på Ask i Gjerdrum. Gjennom årene har vi bygget opp
              solid kompetanse innen regnskap og økonomisk rådgivning — med
              spisskompetanse på bilbransjen, bygg og eiendom, og etter hvert
              netthandel og en lang rekke tjenestebransjer.
            </p>
            <p className="mt-4 leading-relaxed text-slate">
              Vi har bevisst valgt å forbli et lite byrå. Ikke fordi vi ikke
              kunne vokst, men fordi modellen vår krever det: Hver
              samarbeidspartner skal ha en fast regnskapsfører som faktisk
              kjenner virksomheten — og en fast backup som gjør det samme. Det
              fungerer når vi er seks. Det forsvinner når man blir seks hundre.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[bilde("team:samarbeid-2"), bilde("omoss:kaffe-og-notater")]
              .filter((foto): foto is NonNullable<typeof foto> => !!foto)
              .map((foto) => (
                <FramedImage
                  key={foto.src}
                  src={foto.src}
                  alt={foto.alt}
                  sizes="(min-width: 640px) 24rem, 100vw"
                />
              ))}
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Samarbeid, ikke leverandørforhold
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              Vi kaller ikke kundene våre kunder — vi kaller dem
              samarbeidspartnere, og det er ikke et markedsføringstriks. Et
              regnskap som skal skape verdi krever at vi forstår driften din,
              bransjen din og planene dine. Derfor tilpasser vi oss hver enkelt
              bedrift, og derfor koster det aldri noe å ringe oss med et kort
              spørsmål. Terskelen for å ta kontakt skal være null.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Autorisert og regulert
            </h2>
            <p className="mt-4 leading-relaxed text-slate">
              Kontera Regnskap AS er et autorisert regnskapsselskap under
              tilsyn av Finanstilsynet, og to av oss er statsautoriserte
              regnskapsførere. Det betyr dokumenterte krav til kompetanse,
              rutiner og god regnskapsføringsskikk — og at du kan slå oss opp i
              Finanstilsynets virksomhetsregister når som helst. Org.nr{" "}
              {site.orgNr}.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Der du finner oss
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {site.offices.map((office) => (
                <div key={office.id} className="rounded-lg border border-line bg-mist p-5">
                  <p className="font-display font-bold text-navy">{office.label}</p>
                  <p className="mt-1 text-sm text-slate">
                    {office.street}, {office.postalCode} {office.city}
                  </p>
                  <a
                    href={office.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-bold text-blue hover:underline"
                  >
                    Vis i kart →
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              …og digitalt i hele Norge. En stor andel av samarbeidspartnerne
              våre møter vi på video og telefon — like personlig, bare uten
              reisevei.
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
