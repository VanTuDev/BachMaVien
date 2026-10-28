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

type Props = {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  /** Id of the section's heading, giving the region an accessible name. */
  labelledBy?: string;
  children: ReactNode;
};

export function Section({ id, tone = "cream", className, containerClassName, labelledBy, children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-16 sm:py-20 lg:py-28", toneClass[tone], className)}>
      <Container className={cn("reveal-children", containerClassName)}>{children}</Container>
    </section>
  );
}
