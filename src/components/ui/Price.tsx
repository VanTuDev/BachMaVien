import { useLocale } from "next-intl";
import { formatVnd } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = { amount: number; className?: string };

export function Price({ amount, className }: Props) {
  const locale = useLocale();
  return <span className={cn("tabular-nums", className)}>{formatVnd(amount, locale)}</span>;
}
