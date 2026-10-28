import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { items: readonly string[]; tone?: "light" | "dark"; className?: string };

export function CheckList({ items, tone = "light", className }: Props) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex items-start gap-3 text-sm", tone === "light" ? "text-muted" : "text-sand/80")}>
          <CircleCheck aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "light" ? "text-brass-deep" : "text-brass")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
