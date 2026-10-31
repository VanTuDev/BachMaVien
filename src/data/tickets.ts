import type { ImageName } from "./images";

/** Three wristband tickets. Single source of truth for prices, contents, cards and the booking form. */
export const ticketKeys = ["visit", "cowboy", "realCowboy"] as const;
export type TicketKey = (typeof ticketKeys)[number];

/** VND per person ("giá dự kiến"). */
export const ticketPrices: Record<TicketKey, number> = {
  visit: 199_000,
  cowboy: 399_000,
  realCowboy: 539_000,
};

/** Keys under shared.tickets.include.* */
export type IncludeKey = "guide" | "drink" | "intro" | "wagon" | "lasso" | "costume" | "ride30" | "ride40" | "archery";

export const tickets: readonly {
  key: TicketKey;
  image: ImageName;
  featured?: boolean;
  include: readonly IncludeKey[];
}[] = [
  { key: "visit", image: "ticket-visit-the-farm", include: ["guide", "drink"] },
  { key: "cowboy", image: "ticket-cowboy", featured: true, include: ["intro", "wagon", "lasso", "drink", "costume", "ride30"] },
  { key: "realCowboy", image: "ticket-real-cowboy", include: ["intro", "wagon", "lasso", "drink", "costume", "ride40", "archery"] },
];

export function isTicketKey(value: string | null | undefined): value is TicketKey {
  return !!value && (ticketKeys as readonly string[]).includes(value);
}
