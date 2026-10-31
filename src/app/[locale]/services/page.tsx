import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Extras } from "@/components/sections/Extras";
import { Hours } from "@/components/sections/Hours";
import { Tickets } from "@/components/sections/Tickets";
import { Zones } from "@/components/sections/Zones";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { bookingHref } from "@/data/navigation";
import { ticketKeys, ticketPrices } from "@/data/tickets";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "services", "/services");
}

function ServicesHero() {
  const t = useTranslations("services.hero");
  return <PageHero eyebrow={<span className="type-label-sm text-chestnut">{t("eyebrow")}</span>} title={t("title")} lead={t("lead")} />;
}

function ServicesZones() {
  const t = useTranslations("services.zones");
  return <Zones eyebrow={t("eyebrow")} title={t("title")} />;
}

function ServicesCta() {
  const t = useTranslations("services.cta");
  return <PageCta title={t("title")} action={t("action")} href={bookingHref} />;
}

/** schema.org Offer list so search engines can show ticket names and prices. */
function TicketsJsonLd({ locale }: { locale: Locale }) {
  const t = useTranslations("shared.tickets.names");

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: ticketKeys.map((key, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: t(key),
            url: `${localizedUrl(locale, "/services")}#tickets`,
            offers: { "@type": "Offer", price: ticketPrices[key], priceCurrency: "VND", availability: "https://schema.org/InStock" },
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
      <Tickets />
      <Hours />
      <ServicesZones />
      <Extras />
      <ServicesCta />
      <TicketsJsonLd locale={locale} />
    </>
  );
}
