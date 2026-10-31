import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl, type PageKey } from "@/lib/seo";

const pages: { key: PageKey; path: string; priority: number }[] = [
  { key: "home", path: "/", priority: 1 },
  { key: "services", path: "/services", priority: 0.9 },
  { key: "booking", path: "/booking", priority: 0.9 },
  { key: "experience", path: "/experience", priority: 0.8 },
  { key: "about", path: "/about", priority: 0.7 },
  { key: "menu", path: "/menu", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
      },
    })),
  );
}
