type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Tailwind classes are written to avoid conflicts, so no merge step is needed. */
export function cn(...values: ClassValue[]) {
  return values.filter(Boolean).join(" ");
}
