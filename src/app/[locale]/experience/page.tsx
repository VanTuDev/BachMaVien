import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ExperienceExplorer } from "@/components/sections/experience/ExperienceExplorer";
import { ExperienceHero } from "@/components/sections/experience/ExperienceHero";
import { ExperienceVideo } from "@/components/sections/experience/ExperienceVideo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCta } from "@/components/ui/PageCta";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { tourVideo } from "@/data/tour";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/experience">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return buildMetadata(locale, "experience", "/experience");
}

function ExperienceCta() {
  const t = useTranslations("experience.cta");
  return <PageCta eyebrow={t("eyebrow")} title={t("title")} text={t("text")} action={t("action")} href={bookingHref} />;
}

/** schema.org VideoObject so the demo can appear as a video result. */
function VideoJsonLd() {
  const t = useTranslations("experience.video");

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: t("videoName"),
        description: t("videoDescription"),
        thumbnailUrl: `${siteConfig.url}${tourVideo.poster}`,
        contentUrl: `${siteConfig.url}${tourVideo.src}`,
        uploadDate: tourVideo.uploadDate,
        duration: tourVideo.isoDuration,
        width: tourVideo.width,
        height: tourVideo.height,
      }}
    />
  );
}

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <ExperienceHero />
      <ExperienceExplorer />
      <ExperienceVideo />
      <ExperienceCta />
      <VideoJsonLd />
    </>
  );
}
