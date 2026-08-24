import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
        Denne siden? Den fant vi ikke.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-slate">
        Siden kan være flyttet eller slettet. Prøv forsiden — eller ring oss på{" "}
        <a href={site.phoneHref} className="font-bold text-navy underline underline-offset-4">
          {site.phoneDisplay}
        </a>
        , så hjelper vi deg direkte.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="pille">
          Til forsiden
        </Link>
        <Link
          href="/tjenester"
          className="inline-flex h-[52px] items-center rounded-full border border-navy/25 px-6 font-sans font-bold text-navy transition-colors hover:border-navy/50"
        >
          Se tjenestene våre
        </Link>
      </div>
    </section>
  );
}
