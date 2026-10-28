import type { ImageName } from "./images";

/** Scenes shown in the 3D tour viewer on /experience. Order is the suggested visiting route. */
export type TourZone = "arrival" | "town" | "stable";

export const tourZones = ["arrival", "town", "stable"] as const satisfies readonly TourZone[];

export type TourStopKey =
  | "aerial"
  | "entrance"
  | "welcome"
  | "archery"
  | "photoZone"
  | "souvenirs"
  | "costume"
  | "cafe"
  | "horseClass"
  | "lasso"
  | "stables"
  | "ridingRing";

export type SceneImage = Extract<ImageName, `scene-${string}`>;

export type TourStop = {
  key: TourStopKey;
  zone: TourZone;
  /** One or two camera angles of the same place. Labels live in experience.views.<image>. */
  views: readonly SceneImage[];
  /** Related page: a package on /services or the menu. */
  link?: { kind: "package" | "menu"; href: string };
};

export const tourStops: readonly TourStop[] = [
  { key: "aerial", zone: "arrival", views: ["scene-aerial-wide", "scene-aerial-close"] },
  { key: "entrance", zone: "arrival", views: ["scene-entrance"] },
  { key: "welcome", zone: "arrival", views: ["scene-welcome"] },
  { key: "archery", zone: "town", views: ["scene-archery-facade", "scene-archery-lane", "scene-archery-indoor"] },
  { key: "photoZone", zone: "town", views: ["scene-photo-zone"], link: { kind: "package", href: "/services#photo-tour" } },
  { key: "souvenirs", zone: "town", views: ["scene-souvenirs"] },
  { key: "costume", zone: "town", views: ["scene-costume"], link: { kind: "package", href: "/services#wild-west" } },
  { key: "cafe", zone: "town", views: ["scene-cafe-front", "scene-cafe-inside"], link: { kind: "menu", href: "/menu" } },
  { key: "horseClass", zone: "stable", views: ["scene-horse-class"], link: { kind: "package", href: "/services#horse-basics" } },
  { key: "lasso", zone: "stable", views: ["scene-lasso"] },
  { key: "stables", zone: "stable", views: ["scene-stables"], link: { kind: "package", href: "/services#workshop" } },
  { key: "ridingRing", zone: "stable", views: ["scene-riding-ring"], link: { kind: "package", href: "/services#wild-west" } },
];

export const tourViewCount = tourStops.reduce((sum, stop) => sum + stop.views.length, 0);

export const tourVideo = {
  src: "/video/bach-ma-vien-tour.mp4",
  poster: "/video/bach-ma-vien-tour-poster.jpg",
  width: 1920,
  height: 1080,
  /** Seconds. */
  duration: 139,
  /** ISO 8601, for structured data. */
  isoDuration: "PT2M19S",
  uploadDate: "2026-10-10",
} as const;

export type VideoChapterKey =
  "entrance" | "welcome" | "archery" | "photoZone" | "souvenirs" | "costume" | "cafe" | "horseClass" | "lasso" | "stables" | "ridingRing";

/** Start times in seconds, read from the burned-in captions of the demo video. Keys live in experience.video.chapters. */
export const videoChapters: readonly { key: VideoChapterKey; time: number }[] = [
  { key: "entrance", time: 0 },
  { key: "welcome", time: 22 },
  { key: "archery", time: 33 },
  { key: "photoZone", time: 58 },
  { key: "souvenirs", time: 68 },
  { key: "costume", time: 73 },
  { key: "cafe", time: 82 },
  { key: "horseClass", time: 93 },
  { key: "lasso", time: 98 },
  { key: "stables", time: 104 },
  { key: "ridingRing", time: 113 },
];
