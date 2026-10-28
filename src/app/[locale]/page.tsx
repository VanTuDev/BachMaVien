import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeGallery } from "@/components/sections/home/HomeGallery";
import { HomeMarquee } from "@/components/sections/home/HomeMarquee";
import { HomeBrand } from "@/components/sections/home/HomeBrand";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomePillars } from "@/components/sections/home/HomePillars";
import { HomeTeam } from "@/components/sections/home/HomeTeam";
import { HomeWelfare } from "@/components/sections/home/HomeWelfare";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "home", "/");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeBrand />
      <HomePillars />
      <HomeGallery />
      <HomeWelfare />
      <HomeTeam />
      <CtaBand />
    </>
  );
}
