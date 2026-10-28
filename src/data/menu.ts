import { Citrus, Coffee, CupSoda, GlassWater, Leaf, type LucideIcon } from "lucide-react";
import type { ImageName } from "./images";

export type MenuItem = {
  id: string;
  /** Price in VND, as printed on the menu poster. */
  price: number;
  /** Menu item names are brand names, so both languages are kept here rather than in the messages. */
  name: { vi: string; en: string };
  bestSeller?: boolean;
};

export type MenuCategory = {
  key: "cafe" | "tea" | "soda" | "juice" | "classic";
  icon: LucideIcon;
  image: ImageName;
  items: readonly MenuItem[];
};

/** Mirrors the printed menu poster (public/images/menu-poster.jpg). Update both together. */
export const menuCategories: readonly MenuCategory[] = [
  {
    key: "cafe",
    icon: Coffee,
    image: "drink-black-coffee",
    items: [
      { id: "cowboy-black", price: 25_000, name: { vi: "Cà Phê Đen Cowboy", en: "Cowboy Black Coffee" } },
      { id: "cowboy-milk", price: 30_000, name: { vi: "Cà Phê Sữa Cowboy", en: "Cowboy Milk Coffee" } },
      { id: "coconut", price: 40_000, bestSeller: true, name: { vi: "Cà Phê Dừa Bách Mã", en: "Bach Ma Coconut Coffee" } },
      { id: "sheriff", price: 45_000, name: { vi: "Latte Cảnh Sát Trưởng", en: "Sheriff Latte" } },
      { id: "mocha", price: 45_000, name: { vi: "Mocha Miền Tây Hoang Dã", en: "Wild West Mocha" } },
    ],
  },
  {
    key: "tea",
    icon: Leaf,
    image: "drink-passion-tea",
    items: [
      { id: "lemon-tea", price: 35_000, name: { vi: "Trà Chanh Cowboy", en: "Cowboy Iced Tea" } },
      { id: "peach-tea", price: 35_000, name: { vi: "Trà Đào Hoàng Hôn", en: "Peach Sunset Tea" } },
      { id: "passion-tea", price: 35_000, name: { vi: "Trà Chanh Dây Bách Mã", en: "Bach Ma Passion Tea" } },
    ],
  },
  {
    key: "soda",
    icon: GlassWater,
    image: "drink-mojito",
    items: [
      { id: "lemonade", price: 35_000, name: { vi: "Nước Chanh Cowboy", en: "Cowboy Lemonade" } },
      { id: "orange-fizz", price: 35_000, name: { vi: "Cam Soda Miền Tây", en: "Western Orange Fizz" } },
      { id: "wild-fizz", price: 40_000, name: { vi: "Soda Miền Tây Hoang Dã", en: "Wild West Fizz" } },
      { id: "mojito", price: 40_000, name: { vi: "Mojito Cowboy", en: "Cowboy Mojito" } },
    ],
  },
  {
    key: "juice",
    icon: Citrus,
    image: "drink-orange",
    items: [
      { id: "orange-juice", price: 40_000, name: { vi: "Nước Ép Cam", en: "Fresh Orange Juice" } },
      { id: "pineapple-juice", price: 35_000, name: { vi: "Nước Ép Dứa", en: "Fresh Pineapple Juice" } },
      { id: "watermelon-juice", price: 35_000, name: { vi: "Nước Ép Dưa Hấu", en: "Fresh Watermelon Juice" } },
      { id: "passion-juice", price: 35_000, name: { vi: "Nước Chanh Dây", en: "Fresh Passion Fruit" } },
    ],
  },
  {
    key: "classic",
    icon: CupSoda,
    image: "drink-coconut-water",
    items: [
      { id: "soft-drinks", price: 15_000, name: { vi: "Coca-Cola / Sprite / Soda", en: "Coca-Cola / Sprite / Soda" } },
      { id: "water", price: 10_000, name: { vi: "Nước Suối", en: "Mineral Water" } },
      { id: "coconut-water", price: 30_000, name: { vi: "Nước Dừa", en: "Coconut Water" } },
    ],
  },
];
