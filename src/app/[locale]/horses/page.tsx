import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { HerdList, HorsesHero, MascotSpotlight } from "@/components/horses/HorsesSections";
import { PageCta } from "@/components/ui/PageCta";
import { bookingHref } from "@/data/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/horses">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "horses", "/horses");
}

function HorsesCta() {
  const t = useTranslations("horses.cta");
  return <PageCta title={t("title")} action={t("action")} href={bookingHref} />;
}

export default async function HorsesPage({ params }: PageProps<"/[locale]/horses">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <HorsesHero />
      <MascotSpotlight />
      <HerdList />
      <HorsesCta />
    </>
  );
}
