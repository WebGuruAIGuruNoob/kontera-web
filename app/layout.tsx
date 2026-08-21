import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kontera Regnskap AS | Regnskapsfører med fast kontaktperson",
    template: "%s | Kontera Regnskap AS",
  },
  description:
    "Lite regnskapsbyrå med statsautoriserte regnskapsførere. Fast regnskapsfører som kjenner deg, backup som stiller opp, og ingen faktura for korte spørsmål. Ring 960 00 400.",
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
    <html lang="nb" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
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
        <StickyCallBar />
      </body>
    </html>
  );
}
