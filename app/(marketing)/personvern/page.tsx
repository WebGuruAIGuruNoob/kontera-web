import type { Metadata } from "next";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Slik behandler Kontera Regnskap AS personopplysninger på kontera.no: hva vi samler inn, hvorfor, hvor lenge – og hvilke rettigheter du har.",
  alternates: { canonical: "/personvern" },
};

export default function PersonvernPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Personvern", href: "/personvern" }]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <article className="prose-kontera mx-auto max-w-3xl">
          <p className="section-eyebrow">Personvern</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">
            Personvernerklæring
          </h1>
          <p className="mt-3 text-sm text-slate">Sist oppdatert: 21. august 2026</p>

          <div className="mt-8 space-y-8 leading-relaxed text-slate [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
            <div>
              <h2>Hvem vi er</h2>
              <p className="mt-3">
                {site.legalName} (org.nr {site.orgNr}) er behandlingsansvarlig
                for personopplysninger som samles inn via dette nettstedet.
                Kontakt: {site.email}, telefon {site.phoneDisplay}. Besøksadresser:{" "}
                {site.offices.map((o) => `${o.street}, ${o.postalCode} ${o.city}`).join(" og ")}.
              </p>
            </div>

            <div>
              <h2>Hvilke opplysninger vi samler inn – og hvorfor</h2>
              <p className="mt-3">
                <strong>Kontaktskjemaet:</strong> Når du sender inn skjemaet,
                behandler vi firmanavn/navn på borettslag, e-postadresse,
                telefonnummer og det du eventuelt skriver i meldingsfeltet.
                Formålet er utelukkende å besvare henvendelsen din og følge opp
                dialogen om et mulig samarbeid. Behandlingsgrunnlaget er GDPR
                artikkel 6 nr. 1 bokstav b (tiltak før avtaleinngåelse) og
                bokstav f (berettiget interesse i å besvare henvendelser).
              </p>
              <p className="mt-3">
                <strong>Telefon og e-post:</strong> Kontakter du oss direkte,
                behandler vi opplysningene du selv oppgir, for å kunne svare
                deg.
              </p>
              <p className="mt-3">
                <strong>Besøksstatistikk:</strong> Nettstedet bruker Vercel
                Analytics, en informasjonskapselfri analyseløsning som ikke
                sporer deg på tvers av nettsteder og ikke lagrer
                personidentifiserende informasjon. Nettstedet setter derfor
                ingen analyse- eller markedsføringscookies, og viser ikke
                cookie-banner.
              </p>
            </div>

            <div>
              <h2>Hvem vi deler opplysningene med</h2>
              <p className="mt-3">
                Vi selger aldri opplysningene dine, og deler dem ikke med andre
                enn databehandlerne som kreves for å drifte nettstedet: Vercel
                Inc. (hosting) og vår e-postleverandør for videresending av
                skjemahenvendelser til vår egen e-post. Databehandleravtaler er
                inngått i tråd med GDPR.
              </p>
            </div>

            <div>
              <h2>Hvor lenge vi lagrer opplysningene</h2>
              <p className="mt-3">
                Henvendelser via skjema eller e-post lagres så lenge dialogen
                pågår, og slettes senest 12 måneder etter siste kontakt dersom
                det ikke blir noe samarbeid. Blir du samarbeidspartner, gjelder
                egne lagringsregler etter bokføringsloven og
                regnskapsførerloven, som vi informerer om i oppdragsavtalen.
              </p>
            </div>

            <div>
              <h2>Dine rettigheter</h2>
              <ul className="mt-3">
                <li>Innsyn i hvilke opplysninger vi har om deg</li>
                <li>Retting av uriktige opplysninger</li>
                <li>Sletting («retten til å bli glemt»)</li>
                <li>Begrensning av behandling</li>
                <li>Dataportabilitet</li>
                <li>Å protestere mot behandling basert på berettiget interesse</li>
              </ul>
              <p className="mt-3">
                Send en e-post til {site.email}, så svarer vi uten ugrunnet
                opphold og senest innen 30 dager. Du har også rett til å klage
                til Datatilsynet (datatilsynet.no) hvis du mener vi behandler
                opplysninger i strid med regelverket.
              </p>
            </div>

            <div>
              <h2>Sikkerhet</h2>
              <p className="mt-3">
                Nettstedet leveres kryptert (HTTPS). Skjemadata sendes direkte
                til vår e-post og lagres ikke i egne databaser hos oss. Tilgang
                til henvendelser er begrenset til ansatte som skal følge dem
                opp.
              </p>
            </div>

            <div>
              <h2>Endringer i denne erklæringen</h2>
              <p className="mt-3">
                Ved vesentlige endringer oppdaterer vi denne siden og datoen
                øverst. Større endringer i hvordan vi behandler opplysninger
                varsles tydelig på nettstedet.
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
