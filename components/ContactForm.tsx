"use client";

import { useId, useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Fullt kontaktskjema (bunnseksjon/kontaktside): briefens felter — firmanavn,
 * e-post, telefon + valgfri melding. LEAD-SIKKERHETSREGEL: uten verifisert
 * e-postlevering rendres ring-oss-fallback, aldri falsk suksess.
 */
export function ContactForm({ enabled }: { enabled: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-navy/10 bg-surface p-6 text-center">
        <p className="font-display text-lg font-bold text-navy">
          Ring oss — det er den raskeste veien til svar
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate">
          Kontaktskjemaet er midlertidig utilgjengelig. Ring oss for en
          uforpliktende samtale, eller send oss en e-post.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            data-cta="skjema-ring-fallback"
            className="pille"
          >
            Ring {site.phoneDisplay}
          </a>
          <a
            href={site.emailHref}
            data-cta="skjema-epost-fallback"
            className="inline-flex h-[52px] items-center justify-center rounded-full border border-navy/25 px-6 font-sans font-bold text-navy transition-colors hover:border-navy/50"
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
        className="rounded-2xl border border-teal/60 bg-mist p-8 text-center"
        role="status"
      >
        <p className="font-display text-xl font-bold text-navy">Takk for henvendelsen</p>
        <p className="mx-auto mt-2 max-w-md text-slate">
          Vi tar kontakt innen én arbeidsdag. Trenger du svar raskere, ring oss
          på{" "}
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
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-navy/30 bg-white px-3.5 py-2.5 text-ink outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-azure/30";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-navy/10 bg-surface p-6 sm:p-8">
      <div className="grid gap-4">
        <div>
          <label htmlFor={`${uid}-firma`} className="mb-1.5 block text-sm font-bold text-ink">
            Firmanavn / borettslag
          </label>
          <input id={`${uid}-firma`} name="firma" type="text" required autoComplete="organization" className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-epost`} className="mb-1.5 block text-sm font-bold text-ink">
              E-post
            </label>
            <input id={`${uid}-epost`} name="epost" type="email" required autoComplete="email" inputMode="email" className={inputClass} />
          </div>
          <div>
            <label htmlFor={`${uid}-telefon`} className="mb-1.5 block text-sm font-bold text-ink">
              Telefon
            </label>
            <input id={`${uid}-telefon`} name="telefon" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-melding`} className="mb-1.5 block text-sm font-bold text-ink">
            Kort om behovet ditt{" "}
            <span className="font-normal text-slate">(valgfritt)</span>
          </label>
          <textarea id={`${uid}-melding`} name="melding" rows={3} className={inputClass} />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${uid}-nettside`}>Nettside</label>
          <input id={`${uid}-nettside`} name="nettside" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Noe gikk galt med innsendingen. Prøv igjen — eller ring oss på{" "}
            <a href={site.phoneHref} className="underline">
              {site.phoneDisplay}
            </a>
            , så hjelper vi deg direkte.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          data-cta="skjema-send"
          className="pille disabled:opacity-60"
        >
          {status === "sending" ? "Sender …" : "Få et uforpliktende tilbud"}
        </button>
        <p className="text-xs text-slate">
          Vi bruker opplysningene kun til å svare deg, og deler dem ikke med
          andre.{" "}
          <a href="/personvern" className="underline hover:text-blue">
            Les personvernerklæringen
          </a>
          . Vi svarer innen én arbeidsdag.
        </p>
      </div>
    </form>
  );
}
