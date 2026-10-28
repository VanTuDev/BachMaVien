import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImage, type ImageName } from "@/data/images";
import { cn } from "@/lib/cn";

type Props = {
  name: ImageName;
  /** Tells the browser how wide the image renders so it downloads the right size. */
  sizes: string;
  priority?: boolean;
  /** Draws the brass hairline "framed print" treatment. */
  framed?: boolean;
  className?: string;
};

/**
 * Renders a photograph at its intrinsic ratio (width/height come from the image manifest),
 * so nothing is ever cropped. Alt text is looked up in messages/<locale>/images.json.
 */
export function Photo({ name, sizes, priority = false, framed = true, className }: Props) {
  const t = useTranslations("images");
  const { src, width, height } = getImage(name);

  return (
    <div className={cn(framed ? "photo-frame" : "photo overflow-hidden", className)}>
      <Image src={src} width={width} height={height} sizes={sizes} priority={priority} alt={t(name)} className="block h-auto w-full" />
    </div>
  );
}
