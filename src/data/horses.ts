import type { ImageName } from "./images";

export type HorseKey = "bong" | "bo" | "bach" | "bin" | "bolai" | "bi" | "bap" | "bisam" | "bun" | "bao";

/** What a visitor can filter the herd by. Labels live in horses.filters.* */
export type HorsePurpose = "beginner" | "family" | "wagon" | "photo";

export type Horse = {
  key: HorseKey;
  /** Proper name, shown as-is in every language (Bi and Bí, Bơ and Bo are different horses). */
  name: string;
  /** Coat colors for the portrait panel: gradient start/end and the mane tone. */
  coat: { from: string; to: string; mane: string };
  /** Text color that reads well on the coat. */
  ink: "light" | "dark";
  heightCm: number;
  weightKg: number;
  born: number;
  sex: "mare" | "gelding";
  source: "bavan" | "vifarm";
  purposes: readonly HorsePurpose[];
  /** The ranch mascot gets her own spotlight. */
  mascot?: boolean;
  /** A real photo. Until one exists the card shows a coat-colored portrait panel. */
  image?: ImageName;
  /** Where the subject sits in the photo (CSS object-position), used when a card crops it to fit. */
  focus?: string;
};

/** Profiles supplied by the ranch. Written copy lives in messages/<locale>/horses.json. */
export const horses: readonly Horse[] = [
  {
    key: "bong",
    name: "Bông",
    coat: { from: "#f6edd9", to: "#e4d3b0", mane: "#efe2bf" },
    ink: "dark",
    heightCm: 118,
    weightKg: 210,
    born: 2019,
    sex: "mare",
    source: "bavan",
    purposes: ["beginner", "family", "photo"],
    mascot: true,
    image: "horse-bong",
    focus: "60% 50%",
  },
  {
    key: "bo",
    name: "Bơ",
    coat: { from: "#e3e0d8", to: "#c4bfb3", mane: "#f1ead8" },
    ink: "dark",
    heightCm: 130,
    weightKg: 230,
    born: 2013,
    sex: "gelding",
    source: "bavan",
    purposes: ["beginner", "family"],
    image: "horse-bo",
    focus: "40% 50%",
  },
  {
    key: "bach",
    name: "Bách",
    coat: { from: "#7a3f28", to: "#4d2616", mane: "#17110d" },
    ink: "light",
    heightCm: 125,
    weightKg: 220,
    born: 2018,
    sex: "mare",
    source: "bavan",
    purposes: ["wagon"],
    image: "horse-bach",
    focus: "35% 50%",
  },
  {
    key: "bin",
    name: "Bin",
    coat: { from: "#a05a34", to: "#6e3720", mane: "#17110d" },
    ink: "light",
    heightCm: 132,
    weightKg: 240,
    born: 2021,
    sex: "gelding",
    source: "bavan",
    purposes: [],
    image: "horse-bin",
    focus: "40% 50%",
  },
  {
    key: "bolai",
    name: "Bo",
    coat: { from: "#b3552a", to: "#7e3216", mane: "#a34a22" },
    ink: "light",
    heightCm: 142,
    weightKg: 350,
    born: 2017,
    sex: "gelding",
    source: "bavan",
    purposes: ["wagon", "photo"],
    image: "horse-bolai",
    focus: "45% 50%",
  },
  {
    key: "bi",
    name: "Bi",
    coat: { from: "#d6a757", to: "#a97a32", mane: "#17110d" },
    ink: "dark",
    heightCm: 135,
    weightKg: 280,
    born: 2020,
    sex: "gelding",
    source: "vifarm",
    purposes: ["photo"],
    image: "horse-bi",
    focus: "50% 50%",
  },
  {
    key: "bap",
    name: "Bắp",
    coat: { from: "#94502f", to: "#5f2f1b", mane: "#17110d" },
    ink: "light",
    heightCm: 128,
    weightKg: 230,
    born: 2017,
    sex: "gelding",
    source: "bavan",
    purposes: ["family"],
    image: "horse-bap",
    focus: "50% 58%",
  },
  {
    key: "bisam",
    name: "Bí",
    coat: { from: "#6d3a24", to: "#42210f", mane: "#17110d" },
    ink: "light",
    heightCm: 130,
    weightKg: 240,
    born: 2018,
    sex: "mare",
    source: "bavan",
    purposes: ["beginner"],
    image: "horse-bisam",
    focus: "50% 58%",
  },
  {
    key: "bun",
    name: "Bún",
    coat: { from: "#9b5230", to: "#63301a", mane: "#17110d" },
    ink: "light",
    heightCm: 145,
    weightKg: 380,
    born: 2019,
    sex: "gelding",
    source: "bavan",
    purposes: ["photo"],
    image: "horse-bun",
    focus: "50% 30%",
  },
  {
    key: "bao",
    name: "Bao",
    coat: { from: "#b8683a", to: "#86421f", mane: "#a35a30" },
    ink: "light",
    heightCm: 142,
    weightKg: 330,
    born: 2015,
    sex: "mare",
    source: "bavan",
    purposes: ["beginner", "photo"],
    image: "horse-bao",
    focus: "45% 50%",
  },
];

export const purposes = ["beginner", "family", "wagon", "photo"] as const satisfies readonly HorsePurpose[];

export const mascot = horses.find((horse) => horse.mascot)!;
