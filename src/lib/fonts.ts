import { Be_Vietnam_Pro, Merriweather } from "next/font/google";

/**
 * Both families ship a dedicated Vietnamese subset, so tone marks stack
 * correctly and never fall back to a different typeface mid-word.
 */
export const fontSans = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const fontSerif = Merriweather({
  subsets: ["vietnamese", "latin", "latin-ext"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});
