import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { tourVideo, videoChapters } from "@/data/tour";
import { TourVideo } from "./TourVideo";

export function ExperienceVideo() {
  const t = useTranslations("experience.video");

  return (
    <Section id="video" tone="low" labelledBy="video-title">
      <SectionHeader id="video-title" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} align="split" />
      <TourVideo
        src={tourVideo.src}
        poster={tourVideo.poster}
        width={tourVideo.width}
        height={tourVideo.height}
        chapters={videoChapters.map(({ key, time }) => ({ key, time, title: t(`chapters.${key}`) }))}
        labels={{ playerLabel: t("playerLabel"), play: t("play"), chaptersLabel: t("chaptersLabel"), unsupported: t("unsupported") }}
      />
    </Section>
  );
}
