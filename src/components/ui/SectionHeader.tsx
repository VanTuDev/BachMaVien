import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center" | "split";
  as?: "h1" | "h2";
  className?: string;
};

/** Eyebrow + heading + intro paragraph. `split` puts the intro beside the title on large screens. */
export function SectionHeader({ id, eyebrow, title, description, tone = "light", align = "left", as: Heading = "h2", className }: Props) {
  const dark = tone === "dark";
  const center = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-14",
        align === "split" && "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        center && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "split" && "lg:max-w-2xl", center && "items-center")}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <Heading id={id} className={cn("type-headline-lg", dark ? "text-cream" : "text-espresso")}>
          {title}
        </Heading>
      </div>
      {description && <p className={cn("max-w-xl", dark ? "text-sand/80" : "text-muted", align === "split" && "lg:pb-1")}>{description}</p>}
    </div>
  );
}
