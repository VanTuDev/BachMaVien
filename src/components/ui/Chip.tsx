import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { children: ReactNode; tone?: "light" | "dark"; className?: string };

export function Chip({ children, tone = "light", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2.5 py-1 type-label-sm",
        tone === "light" ? "border border-brass/40 bg-sand text-chestnut" : "bg-sand/15 text-brass",
        className,
      )}
    >
      {children}
    </span>
  );
}
