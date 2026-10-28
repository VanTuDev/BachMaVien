import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Variant = "primary" | "brass" | "outline" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-espresso text-cream hover:bg-chestnut shadow-[0_2px_8px_rgb(48_37_31/0.15)]",
  brass: "bg-brass text-espresso hover:bg-sand shadow-lg",
  outline: "border border-brass text-espresso hover:bg-sand/50",
  "outline-light": "border border-sand/40 text-cream hover:bg-sand/10",
};

const base =
  "btn-shine inline-flex items-center justify-center gap-2.5 rounded-sm px-6 py-3.5 text-center type-label transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  /** Pass `false` to hide the trailing arrow, or a custom icon to replace it. */
  icon?: ReactNode | false;
  className?: string;
};

export function ButtonLink({ variant = "primary", icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {icon !== false && (icon ?? <ArrowRight aria-hidden className="size-4 shrink-0" />)}
    </Link>
  );
}

type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
  className?: string;
};

export function Button({ variant = "primary", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />;
}

/** Inline link with a persistent brass underline, used for "read more" actions. */
export function TextLink({ className, children, ...props }: Omit<ComponentProps<typeof Link>, "className"> & { className?: string }) {
  return (
    <Link
      className={cn("group inline-flex items-center gap-2 type-label text-chestnut transition-colors hover:text-espresso", className)}
      {...props}
    >
      <span className="underline decoration-brass underline-offset-[6px]">{children}</span>
      <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
