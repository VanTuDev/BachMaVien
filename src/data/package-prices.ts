/**
 * Prices in VND. Kept in a tiny dependency-free file so the booking form (a client component)
 * and the API route can share them without pulling in icons or images.
 */
export const packagePrices = {
  basics: 450_000,
  wildWest: 850_000,
  photo: 1_500_000,
  workshop: 300_000,
} as const;

export type PackageKey = keyof typeof packagePrices;

export const packageKeys = Object.keys(packagePrices) as PackageKey[];
