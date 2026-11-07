import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { getImage } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

type Props = {
  horse: Horse;
  /** card: 4:3 panel, feature: tall panel for the mascot, mini: square tile for the home teaser. */
  variant?: "card" | "feature" | "mini";
  sizes: string;
  className?: string;
};

const ratio = { card: "aspect-[4/3]", feature: "aspect-[4/5]", mini: "aspect-square" } as const;

/**
 * Real photo when the ranch has one, otherwise a portrait panel in the horse's own coat colors
 * with the mane tone and the brand mark, so every horse still has a face.
 */
export function HorsePortrait({ horse, variant = "card", sizes, className }: Props) {
  const t = useTranslations("horses");
  const tImg = useTranslations("images");
  const light = horse.ink === "light";
  const logo = getImage(light ? "logo-white" : "logo");

  if (horse.image) {
    // Every photo is shown whole, never cropped. Frames keep a fixed ratio so grid rows line up; any spare
    // space is filled with a blurred copy of the same photo instead of a flat bar.
    if (variant === "feature") return <Photo name={horse.image} framed={false} sizes={sizes} className={className} />;
    const photo = getImage(horse.image);
    return (
      <div className={cn("photo relative isolate overflow-hidden bg-sand", ratio[variant], className)}>
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="120px"
          aria-hidden
          className="-z-10 scale-125 object-cover opacity-60 blur-xl saturate-125"
        />
        <Image src={photo.src} alt={tImg(horse.image)} fill sizes={sizes} className="object-contain" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={horse.name}
      className={cn("relative isolate overflow-hidden", ratio[variant], light ? "text-cream" : "text-espresso", className)}
      style={{ backgroundImage: `linear-gradient(150deg, ${horse.coat.from}, ${horse.coat.to})` }}
    >
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt=""
        sizes={sizes}
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-sm",
          variant === "mini" ? "w-[62%]" : "w-[46%]",
          light ? "opacity-80" : "opacity-90",
        )}
      />
      {variant !== "mini" && (
        <>
          <span aria-hidden className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="size-3.5 rounded-full ring-2 ring-white/60" style={{ backgroundColor: horse.coat.to }} />
            <span className="size-3.5 rounded-full ring-2 ring-white/60" style={{ backgroundColor: horse.coat.mane }} />
          </span>
          <span className="absolute right-3 bottom-3 type-label-sm opacity-70">{t("photoSoon")}</span>
        </>
      )}
    </div>
  );
}
