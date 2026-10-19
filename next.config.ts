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
    return [{
      source: "/:path*",
      headers: [
        { key: "Link", value: '</llms.txt>; rel="describedby"' },
        { key: "X-Robots-Tag", value: "index, follow" },
      ],
    }];
  },
};

export default nextConfig;
