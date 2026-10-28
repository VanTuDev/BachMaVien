import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/data/site";
import { localeMeta, routing, type Locale } from "@/i18n/routing";

export type PageKey = "home" | "about" | "services" | "experience" | "menu" | "safety" | "booking";

/** Absolute URL of a page in a given language, e.g. https://site.com/en/services */
export function localizedUrl(locale: Locale, path = "") {
  return `${siteConfig.url}/${locale}${path === "/" ? "" : path}`;
}

/** hreflang map used by <link rel="alternate">, including x-default for search engines. */
function languageAlternates(path: string) {
  const languages: Record<string, string> = Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(locale, path)]));
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

/** Title, description, canonical, hreflang, Open Graph and Twitter tags for one page. */
export async function buildMetadata(locale: Locale, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const url = localizedUrl(locale, path);
  const image = { url: "/og-default.jpg", width: 1200, height: 630, alt: t("ogImageAlt") };

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
