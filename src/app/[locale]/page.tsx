import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/sections/CtaBand";
import { Extras } from "@/components/sections/Extras";
import { Tickets } from "@/components/sections/Tickets";
import { HomeGallery } from "@/components/sections/home/HomeGallery";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeAbout, HomeExperience, HomeServices } from "@/components/sections/home/HomeSections";
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
      <HomeAbout />
      <HomeServices />
      <Tickets />
      <HomeExperience />
      <HomeGallery />
      <Extras />
      <CtaBand />
    </>
  );
}
