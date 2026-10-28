export const mainNav = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "experience", href: "/experience" },
  { key: "menu", href: "/menu" },
  { key: "safety", href: "/safety" },
] as const;

export const bookingHref = "/booking" as const;
export type NavKey = (typeof mainNav)[number]["key"];
