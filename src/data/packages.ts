import { Brush, Camera, DoorOpen, PawPrint, Shirt, Timer, Trophy, UserCheck, Users, Warehouse, Wheat, type LucideIcon } from "lucide-react";
import type { ImageName } from "./images";
import { packagePrices, type PackageKey } from "./package-prices";

export type { PackageKey };

export type ExperiencePackage = {
  key: PackageKey;
  /** Anchor id on /services, also used by deep links from the home page. */
  id: string;
  /** Price in VND. Single source of truth for cards, comparison table and the booking form. */
  price: number;
  featured?: boolean;
  tone: "cream" | "dark" | "low";
  images: readonly ImageName[];
  /** Keys under services.packages.<key>.highlights */
  highlights: readonly { key: string; icon: LucideIcon }[];
  /** Keys under services.packages.<key>.features */
  features: readonly string[];
};

export const packages: readonly ExperiencePackage[] = [
  {
    key: "basics",
    id: "horse-basics",
    price: packagePrices.basics,
    tone: "cream",
    images: ["safety-4", "stable-4", "safety-2"],
    highlights: [
      { key: "duration", icon: Timer },
      { key: "method", icon: UserCheck },
    ],
    features: ["f1", "f2", "f3"],
  },
  {
    key: "wildWest",
    id: "wild-west",
    price: packagePrices.wildWest,
    featured: true,
    tone: "dark",
    images: ["stable-5", "stable-6", "brand-4"],
    highlights: [
      { key: "outfit", icon: Shirt },
      { key: "arena", icon: Trophy },
    ],
    features: ["f1", "f2", "f3"],
  },
  {
    key: "photo",
    id: "photo-tour",
    price: packagePrices.photo,
    tone: "low",
    images: ["team-banner", "member-boi-ngoc", "member-hoang-lam"],
    highlights: [
      { key: "duration", icon: Camera },
      { key: "crew", icon: Users },
      { key: "horses", icon: PawPrint },
      { key: "room", icon: DoorOpen },
    ],
    features: [],
  },
  {
    key: "workshop",
    id: "workshop",
    price: packagePrices.workshop,
    tone: "cream",
    images: ["stable-3", "stable-1", "stable-2"],
    highlights: [
      { key: "feed", icon: Wheat },
      { key: "groom", icon: Brush },
      { key: "stable", icon: Warehouse },
    ],
    features: [],
  },
];
