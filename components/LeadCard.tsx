"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { site } from "@/data/site";
import { PhoneIcon } from "@/components/icons";

type Status = "idle" | "sending" | "sent" | "error";

/** Valgfri fototopp i kortet (hero-CRO): rammes av kortet, navy-tintes. */
function KortBilde({ image }: { image?: { src: string; alt: string } }) {
  if (!image) return null;
  return (
    <div className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden sm:-mx-7 sm:-mt-7">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 1024px) 26rem, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy/35 to-navy/5 mix-blend-multiply"
      />
    </div>
  );
}

/**
 * Hero-leadkortet (DESIGNPLAN §3): 3 felt, ett tilbud, beroligelse under knappen.
 * Ring-modus når skjemalevering ikke er verifisert (lead-sikkerhetsregelen §7b.1).
 * Bevisst avvik fra brief: meldingsfeltet er utelatt i hero-kortet (består i bunnskjemaet).
 */
export function LeadCard({
  enabled,
  heading,
  subheading,
  image,
}: {
  enabled: boolean;
  heading: string;
  subheading?: string;
  /** Fototopp i kortet (brukes i forside-heroen) */
  image?: { src: string; alt: string };
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  if (!enabled) {
    return (
      <div
        data-lead-card
        className="overflow-hidden rounded-2xl border border-navy/10 bg-surface p-6 sm:p-7"
      >
        <KortBilde image={image} />
        <p className="font-display text-xl font-bold text-navy">
          Ring oss for en uforpliktende samtale
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          {subheading ??
            "Vi går gjennom behovet ditt og finner ut om vi passer for bedriften din. Korte spørsmål og småavklaringer er inkludert."}
        </p>
        <a
          href={site.phoneHref}
          data-cta="leadcard-ring"
          className="pille mt-5 w-full text-lg"
        >
          <PhoneIcon className="h-5 w-5" />
          {site.phoneDisplay}
        </a>
        <p className="mt-3 text-center text-xs text-slate">
          Hverdager 08–16
        </p>
        <div className="mt-4 border-t border-navy/10 pt-4 text-center text-sm">
          <span className="text-slate">Eller skriv til oss: </span>
          <a
            href={site.emailHref}
            data-cta="leadcard-epost"
            className="font-bold text-blue hover:underline"
          >
            {site.email}
          </a>
        </div>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div
        data-lead-card
        role="status"
        className="rounded-2xl border border-teal/60 bg-surface p-7 text-center"
      >
        <p className="font-display text-xl font-bold text-navy">Takk for henvendelsen</p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Vi tar kontakt innen én arbeidsdag. Trenger du svar raskere, ring{" "}
          <a href={site.phoneHref} className="font-bold text-blue">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, melding: "" }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-navy/30 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-azure/30";

  return (
    <form
      data-lead-card
      onSubmit={onSubmit}
      className="overflow-hidden rounded-2xl border border-navy/10 bg-surface p-6 sm:p-7"
    >
      <KortBilde image={image} />
      <p className="font-display text-xl font-bold text-navy">{heading}</p>
      {subheading && (
        <p className="mt-1.5 text-sm leading-relaxed text-slate">{subheading}</p>
      )}
      <div className="mt-4 grid gap-3">
        <div>
          <label htmlFor={`${uid}-firma`} className="mb-1 block text-sm font-bold text-ink">
            Firmanavn / borettslag
          </label>
          <input id={`${uid}-firma`} name="firma" type="text" required autoComplete="organization" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${uid}-telefon`} className="mb-1 block text-sm font-bold text-ink">
            Telefon
          </label>
          <input id={`${uid}-telefon`} name="telefon" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor={`${uid}-epost`} className="mb-1 block text-sm font-bold text-ink">
            E-post
          </label>
          <input id={`${uid}-epost`} name="epost" type="email" required autoComplete="email" inputMode="email" className={inputClass} />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${uid}-nettside`}>Nettside</label>
          <input id={`${uid}-nettside`} name="nettside" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Noe gikk galt. Prøv igjen — eller ring{" "}
            <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          data-cta="leadcard-send"
          className="pille disabled:opacity-60"
        >
          {status === "sending" ? "Sender …" : "Få et uforpliktende tilbud"}
        </button>
        <p className="text-center text-xs text-slate">
          Svar innen én arbeidsdag · Ingen bindingstid
        </p>
        <p className="border-t border-navy/10 pt-3 text-center text-sm text-slate">
          Eller ring oss:{" "}
          <a href={site.phoneHref} data-cta="leadcard-tel" className="font-bold text-blue hover:underline">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
