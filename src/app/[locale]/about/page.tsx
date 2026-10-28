import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AboutCollective } from "@/components/sections/about/AboutCollective";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutLeaders } from "@/components/sections/about/AboutLeaders";
import { AboutName } from "@/components/sections/about/AboutName";
import { AboutThesis } from "@/components/sections/about/AboutThesis";
import { AboutVision } from "@/components/sections/about/AboutVision";
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
  return <PageCta eyebrow={t("eyebrow")} title={t("title")} text={t("text")} action={t("action")} href={bookingHref} />;
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <AboutCollective />
      <AboutLeaders />
      <AboutThesis />
      <AboutName />
      <AboutVision />
      <AboutCta />
    </>
  );
}
