import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Tone = "cream" | "low" | "mid" | "dark";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-espresso",
  low: "bg-surface-low text-espresso",
  mid: "bg-surface-mid text-espresso",
  dark: "bg-espresso text-cream",
};

const sizeClass = {
  /** Full-height content sections. */
  default: "py-16 sm:py-20 lg:py-28",
  /** Shorter bands such as opening hours. */
  compact: "py-12 sm:py-14 lg:py-16",
  /** Slim call-to-action rows. */
  slim: "py-8 sm:py-10",
} as const;

type Props = {
  id?: string;
  tone?: Tone;
  /** Vertical padding. Use this instead of overriding with className: Tailwind orders py-28 after py-10, so an override loses at lg. */
  size?: keyof typeof sizeClass;
  className?: string;
  containerClassName?: string;
  /** Id of the section's heading, giving the region an accessible name. */
  labelledBy?: string;
  children: ReactNode;
};

export function Section({ id, tone = "cream", size = "default", className, containerClassName, labelledBy, children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative", sizeClass[size], toneClass[tone], className)}>
      <Container className={cn("reveal-children", containerClassName)}>{children}</Container>
    </section>
  );
}
