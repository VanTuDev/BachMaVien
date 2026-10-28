import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SafetyHero, SafetyStandards, SafetySteps } from "@/components/sections/safety/SafetySections";
import { PageCta } from "@/components/ui/PageCta";
import { bookingHref } from "@/data/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/safety">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "safety", "/safety");
}

function SafetyCta() {
  const t = useTranslations("safety.cta");
  return <PageCta eyebrow={t("eyebrow")} title={t("title")} text={t("text")} action={t("action")} href={bookingHref} />;
}

export default async function SafetyPage({ params }: PageProps<"/[locale]/safety">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <SafetyHero />
      <SafetyStandards />
      <SafetySteps />
      <SafetyCta />
    </>
  );
}
