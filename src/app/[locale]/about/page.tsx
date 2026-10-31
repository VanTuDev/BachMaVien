import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AboutHero, AboutName, AboutTeam } from "@/components/sections/about/AboutSections";
import { PageCta } from "@/components/ui/PageCta";
import { bookingHref } from "@/data/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "about", "/about");
}

function AboutCta() {
  const t = useTranslations("about.cta");
  return <PageCta title={t("title")} action={t("action")} href={bookingHref} />;
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutName />
      <AboutTeam />
      <AboutCta />
    </>
  );
}
