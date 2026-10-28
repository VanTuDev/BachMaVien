import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Centered page column: 20px gutter on phones, 32px on tablets, 48px on desktop. */
export function Container({ as: Tag = "div", className, children }: Props) {
  return <Tag className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>{children}</Tag>;
}
