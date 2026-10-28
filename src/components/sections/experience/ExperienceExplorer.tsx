import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getImage } from "@/data/images";
import { tourStops, tourZones } from "@/data/tour";
import { TourViewer, type TourLabels, type TourStopData } from "./TourViewer";

/** Resolves every string on the server so the interactive viewer needs no message catalogue on the client. */
export function ExperienceExplorer() {
  const t = useTranslations("experience");
  const tImg = useTranslations("images");

  const stops: TourStopData[] = tourStops.map((stop) => ({
    key: stop.key,
    zone: stop.zone,
    title: t(`stops.${stop.key}.title`),
    subtitle: t(`stops.${stop.key}.subtitle`),
    text: t(`stops.${stop.key}.text`),
    views: stop.views.map((name) => {
      const { src, width, height } = getImage(name);
      return { src, width, height, alt: tImg(name), label: t(`views.${name}`) };
    }),
    link: stop.link && { href: stop.link.href, label: t(`explorer.links.${stop.link.kind}`) },
  }));

  const zones = tourZones.map((zone) => ({ key: zone, label: t(`explorer.zones.${zone}`) }));

  const labels: TourLabels = {
    stageLabel: t("explorer.stageLabel"),
    sceneStatus: t.raw("explorer.sceneStatus"),
    stopStatus: t.raw("explorer.stopStatus"),
    prev: t("explorer.prev"),
    next: t("explorer.next"),
    zoomIn: t("explorer.zoomIn"),
    zoomOut: t("explorer.zoomOut"),
    resetZoom: t("explorer.resetZoom"),
    fullscreen: t("explorer.fullscreen"),
    exitFullscreen: t("explorer.exitFullscreen"),
    autoplay: t("explorer.autoplay"),
    pause: t("explorer.pause"),
    hint: t("explorer.hint"),
    hintTouch: t("explorer.hintTouch"),
    viewsLabel: t("explorer.viewsLabel"),
    routeLabel: t("explorer.routeLabel"),
    disclaimer: t("explorer.disclaimer"),
  };

  return (
    <Section id="tour" tone="cream" labelledBy="tour-title">
      <SectionHeader
        id="tour-title"
        eyebrow={t("explorer.eyebrow")}
        title={t("explorer.title")}
        description={t("explorer.description")}
        align="split"
      />
      <TourViewer stops={stops} zones={zones} labels={labels} />
    </Section>
  );
}
