import { useTranslations } from "next-intl";
import { getImage, type ImageName } from "@/data/images";
import { Carousel } from "@/components/ui/Carousel";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const photos: ImageName[] = [
  "stable-5",
  "stable-2",
  "stable-6",
  "stable-4",
  "safety-2",
  "stable-1",
  "brand-3",
  "stable-3",
  "brand-2",
  "safety-3",
];

/** Home-page photo carousel. Labels are resolved here because the carousel itself is a client component. */
export function HomeGallery() {
  const t = useTranslations("home.gallery");
  const tImg = useTranslations("images");

  const slides = photos.map((name) => ({ ...getImage(name), alt: tImg(name) }));
  const labels = {
    region: t("region"),
    prev: t("prev"),
    next: t("next"),
    pause: t("pause"),
    play: t("play"),
    goTo: photos.map((_, index) => t("goTo", { n: index + 1 })),
    slide: photos.map((_, index) => t("slide", { current: index + 1, total: photos.length })),
  };

  return (
    <Section tone="dark" labelledBy="home-gallery-title" className="overflow-hidden">
      <SectionHeader
        id="home-gallery-title"
        tone="dark"
        align="split"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Carousel slides={slides} labels={labels} />
    </Section>
  );
}
