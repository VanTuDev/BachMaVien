import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ComparisonTable } from "@/components/sections/services/ComparisonTable";
import { PackageSection } from "@/components/sections/services/PackageSection";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { Gallery, MenuTeaser, TicketsStrip } from "@/components/sections/services/ServicesExtras";
import { PageCta } from "@/components/ui/PageCta";
import { bookingHref } from "@/data/navigation";
import { packages } from "@/data/packages";
import { routing } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "services", "/services");
}

function ServicesCta() {
  const t = useTranslations("services.cta");
  return <PageCta eyebrow={t("eyebrow")} title={t("title")} text={t("text")} action={t("action")} href={bookingHref} />;
}

/** schema.org Offer list so search engines can show package names and prices. */
function PackagesJsonLd({ locale }: { locale: string }) {
  const t = useTranslations("services.packages");
  const url = localizedUrl(locale as "vi" | "en", "/services");

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: packages.map((pkg, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: t(`${pkg.key}.title`),
            description: t(`${pkg.key}.text`),
            url: `${url}#${pkg.id}`,
            offers: { "@type": "Offer", price: pkg.price, priceCurrency: "VND", availability: "https://schema.org/InStock" },
          },
        })),
      }}
    />
  );
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <ServicesHero />
      {packages.map((pkg, index) => (
        <PackageSection key={pkg.key} pkg={pkg} reversed={index % 2 === 1} />
      ))}
      <ComparisonTable />
      <MenuTeaser />
      <TicketsStrip />
      <Gallery />
      <ServicesCta />
      <PackagesJsonLd locale={locale} />
    </>
  );
}
