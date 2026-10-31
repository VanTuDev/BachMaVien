import {
  Coffee,
  Crosshair,
  Gift,
  GraduationCap,
  Lasso,
  ParkingSquare,
  Camera,
  Route,
  Shirt,
  Ticket,
  Warehouse,
  Caravan,
  type LucideIcon,
} from "lucide-react";

export type ZoneKey =
  "intro" | "ring" | "stables" | "wagon" | "archery" | "lasso" | "costume" | "cafe" | "souvenirs" | "photo" | "welcome" | "parking";

/** Areas of the ranch. Names live in shared.zones.<key> (Vietnamese and the English names given by the client). */
export const zones: readonly { key: ZoneKey; icon: LucideIcon }[] = [
  { key: "welcome", icon: Ticket },
  { key: "intro", icon: GraduationCap },
  { key: "stables", icon: Warehouse },
  { key: "ring", icon: Route },
  { key: "wagon", icon: Caravan },
  { key: "archery", icon: Crosshair },
  { key: "lasso", icon: Lasso },
  { key: "costume", icon: Shirt },
  { key: "cafe", icon: Coffee },
  { key: "souvenirs", icon: Gift },
  { key: "photo", icon: Camera },
  { key: "parking", icon: ParkingSquare },
];
