import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { MotionInit } from "@/components/motion/MotionInit";
import { organizationSchema } from "@/lib/schema";
import { leadEnabled } from "@/lib/lead";

const serifDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
});

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: { index: true, follow: true },
  title: {
    default: "Kontera Regnskap AS | Regnskapsfører med fast kontaktperson",
    template: "%s | Kontera Regnskap AS",
  },
  description:
    "Regnskapsbyrå med statsautoriserte regnskapsførere. Du får en fast regnskapsfører og en fast stedfortreder, og korte spørsmål er inkludert. Ring 960 00 400.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: site.legalName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${serifDisplay.variable} ${grotesk.variable}`}>
      <head><meta name="tdm-reservation" content="0" /><link rel="license" type="text/plain" href="/bot-policy.txt" /></head><body>
        <a
          href="#innhold"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded bg-blue px-4 py-2 font-semibold text-white"
        >
          Hopp til innhold
        </a>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="innhold">{children}</main>
        <Footer />
        <StickyCallBar leadEnabled={leadEnabled()} />
        <MotionInit />
      </body>
    </html>
  );
}
