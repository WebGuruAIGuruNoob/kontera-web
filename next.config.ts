import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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
