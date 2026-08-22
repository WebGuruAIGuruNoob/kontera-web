import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Fase 7-forberedelse (MASTERPLAN §11): redirects fra gamle WordPress-stier.
  // Ligger klare nå, så DNS-cutover ikke krever kodeendringer.
  async redirects() {
    return [
      { source: "/moderne-regnskap", destination: "/tjenester", permanent: true },
      { source: "/jobbe-i-kontera", destination: "/jobb", permanent: true },
      { source: "/onsker-kontakt", destination: "/kontakt", permanent: true },
    ];
  },
  async headers() {
    // Staging-vern: alt på *.vercel.app skal ikke indekseres.
    // Ved DNS-cutover settes NEXT_PUBLIC_SITE_URL=https://kontera.no i Vercel,
    // og denne headeren forsvinner automatisk.
    if (!process.env.NEXT_PUBLIC_SITE_URL?.includes("kontera.no")) {
      return [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
