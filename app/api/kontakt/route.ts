import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/data/site";

const schema = z.object({
  firma: z.string().min(1).max(200),
  epost: z.string().email().max(200),
  telefon: z.string().min(5).max(30),
  melding: z.string().max(4000).optional().default(""),
  nettside: z.string().optional().default(""), // honeypot
});

/** Enkel best-effort rate limit per instans. */
const hits = new Map<string, { count: number; ts: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > 10 * 60_000) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Lead-sikkerhetsregel: uten konfigurert levering avviser vi eksplisitt
    // (skjemaet er da uansett erstattet av ring-oss-fallback i UI-et).
    return NextResponse.json({ error: "Skjema ikke aktivert" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "ukjent";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "For mange forsøk" }, { status: 429 });
  }

  let parsed;
  try {
    parsed = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Ugyldig innsending" }, { status: 400 });
  }

  // Honeypot utfylt → bot. Svar 200 så boten ikke lærer.
  if (parsed.nettside) {
    return NextResponse.json({ ok: true });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? "Kontera nettside <onboarding@resend.dev>",
    to: [process.env.LEAD_TO_EMAIL ?? site.email],
    replyTo: parsed.epost,
    subject: `Ny henvendelse fra ${parsed.firma}`,
    text: [
      `Firmanavn/borettslag: ${parsed.firma}`,
      `E-post: ${parsed.epost}`,
      `Telefon: ${parsed.telefon}`,
      ``,
      `Melding:`,
      parsed.melding || "(ingen melding)",
      ``,
      `— Sendt fra kontaktskjemaet på ${site.url}`,
    ].join("\n"),
  });

  if (error) {
    console.error("Lead-epost feilet:", error);
    return NextResponse.json({ error: "Kunne ikke sende" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
