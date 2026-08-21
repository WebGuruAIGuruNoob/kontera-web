import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">
        Denne siden finnes ikke
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-slate">
        Siden kan være flyttet eller slettet. Prøv forsiden — eller ring oss på{" "}
        <a href={site.phoneHref} className="font-bold text-blue">
          {site.phoneDisplay}
        </a>
        , så hjelper vi deg direkte.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-blue px-6 py-3 font-display font-bold text-white hover:bg-blue-dark"
        >
          Til forsiden
        </Link>
        <Link
          href="/tjenester"
          className="rounded-md border border-line px-6 py-3 font-display font-bold text-navy hover:border-blue"
        >
          Se tjenestene våre
        </Link>
      </div>
    </section>
  );
}
