import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Small uppercase kicker above headings, trailed by a hairline rule. */
export function Eyebrow({ children, tone = "light", className }: Props) {
  const dark = tone === "dark";
  return (
    <p className={cn("flex items-center gap-3 type-label-sm", dark ? "text-brass" : "text-chestnut", className)}>
      <span>{children}</span>
      <span aria-hidden className={cn("reveal-line h-px w-8 shrink-0", dark ? "bg-brass/50" : "bg-chestnut/40")} />
    </p>
  );
}
