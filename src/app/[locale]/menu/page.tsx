import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { MenuCategories } from "@/components/sections/menu/MenuCategories";
import { MenuHero } from "@/components/sections/menu/MenuHero";
import { MenuPoster } from "@/components/sections/menu/MenuPoster";
import { PageCta } from "@/components/ui/PageCta";
import { menuCategories } from "@/data/menu";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/menu">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "menu", "/menu");
}

function MenuCta() {
  const t = useTranslations("menu.cta");
  return <PageCta eyebrow={t("eyebrow")} title={t("title")} text={t("text")} action={t("action")} href="/services" />;
}

async function MenuJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "menu.categories" });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Bách Mã Café",
        url: localizedUrl(locale, "/menu"),
        inLanguage: locale,
        hasMenuSection: menuCategories.map((category) => ({
          "@type": "MenuSection",
          name: t(`${category.key}.title`),
          hasMenuItem: category.items.map((item) => ({
            "@type": "MenuItem",
            name: item.name[locale === "vi" ? "vi" : "en"],
            offers: { "@type": "Offer", price: item.price, priceCurrency: "VND" },
          })),
        })),
      }}
    />
  );
}

export default async function MenuPage({ params }: PageProps<"/[locale]/menu">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <MenuHero />
      <MenuCategories />
      <MenuPoster />
      <MenuCta />
      <MenuJsonLd locale={locale} />
    </>
  );
}
