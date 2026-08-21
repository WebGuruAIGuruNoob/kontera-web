import type { MetadataRoute } from "next";
import { fylker } from "@/lib/geo";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const erProduksjon = site.url.includes("kontera.no");
  return {
    rules: erProduksjon
      ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }]
      : // Staging-vern: hele *.vercel.app-siten holdes ute av indeksen
        [{ userAgent: "*", disallow: "/" }],
    sitemap: [
      `${site.url}/sitemap/kjerne.xml`,
      ...fylker.map((f) => `${site.url}/sitemap/${f.slug}.xml`),
    ],
  };
}
