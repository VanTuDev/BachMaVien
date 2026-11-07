/**
 * Copies the original artwork from ../DataImage (and the Stitch hero) into
 * public/images with ASCII file names and web-friendly sizes.
 *
 * Images are only ever resized (never cropped), so every photo keeps its
 * original aspect ratio. Re-run with `npm run images` after changing sources.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = path.resolve(root, "..", "DataImage");
const stitch = path.resolve(root, "..", "stitch_b_ch_m_vi_n_equestrian_website");
const out = path.join(root, "public", "images");

/** [source path, output name (no extension), max width, format] */
const jobs = [
  // Hero
  [path.join(stitch, "a_majestic_cinematic_wide_hero_banner_photograph_of_noble_horses_galloping", "screen.png"), "hero", 1920, "jpg"],

  // Safety
  [path.join(data, "AN TOÀN LÀ ĐIỀU ĐẦU TIÊN", "1.jpg"), "safety-1", 1400, "jpg"],
  [path.join(data, "AN TOÀN LÀ ĐIỀU ĐẦU TIÊN", "2.jpg"), "safety-2", 1400, "jpg"],
  [path.join(data, "AN TOÀN LÀ ĐIỀU ĐẦU TIÊN", "3.jpg"), "safety-3", 1400, "jpg"],
  [path.join(data, "AN TOÀN LÀ ĐIỀU ĐẦU TIÊN", "4.jpg"), "safety-4", 1400, "jpg"],

  // Stables & arenas
  ...[1, 2, 3, 4, 5, 6].map((n) => [path.join(data, "CHUỒNG NGỰA VÀ SÂN NGỰA", `${n}.jpg`), `stable-${n}`, 1400, "jpg"]),

  // Brand story
  ...[1, 2, 3, 4].map((n) => [path.join(data, "GIỚI THIỆU BRAND", `${n}.jpg`), `brand-${n}`, 1400, "jpg"]),
  [path.join(data, "GIỚI THIỆU BRAND", "giới thiệu brand.jpg"), "brand-overview", 1600, "jpg"],

  // Team
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "1.jpg"), "team-1", 1400, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "2.jpg"), "team-2", 1400, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "bìa.jpg"), "team-banner", 2400, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "UYEN PHUONG.jpg"), "member-uyen-phuong", 1100, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "KHOA LE.jpg"), "member-khoa-le", 1100, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "HOANG LAM.jpg"), "member-hoang-lam", 1100, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "BOI NGOC.jpg"), "member-boi-ngoc", 1100, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "ANH THU 1.jpg"), "member-anh-thu-ops", 1100, "jpg"],
  [path.join(data, "GIỚI THIỆU THÀNH VIÊN", "ANH THU 2.jpg"), "member-anh-thu-brand", 1100, "jpg"],

  // Brand identity
  [path.join(data, "LOGO", "logo màu tách nền.png"), "logo", 900, "png"],
  [path.join(data, "LOGO", "logo trắng tách nền.png"), "logo-white", 900, "png"],
  [path.join(data, "AVA", "ava fb.jpg"), "brand-avatar", 1000, "jpg"],
  [path.join(data, "BÌA FB", "bìa fb k chữ.jpg"), "banner-clean", 2400, "jpg"],
  [path.join(data, "BÌA FB", "slogan.jpg"), "banner-slogan", 2400, "jpg"],
  [path.join(data, "BÌA KL", "bìa kl.jpg"), "thesis-cover", 1080, "jpg"],

  // Menu
  [path.join(data, "MENU", "menu.jpg"), "menu-poster", 1920, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_l3qz4ol3qz4ol3qz.png"), "drink-coconut-coffee", 1100, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_u0dvk4u0dvk4u0dv.png"), "drink-black-coffee", 1100, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_nghp8lnghp8lnghp.png"), "drink-passion-tea", 1100, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_bwdnitbwdnitbwdn.png"), "drink-mojito", 1100, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_ujenjnujenjnujen.png"), "drink-orange", 1100, "jpg"],
  [path.join(data, "MENU", "Gemini_Generated_Image_8u2cot8u2cot8u2c.png"), "drink-coconut-water", 1100, "jpg"],

  // 3D tour scenes (renders, 3840 px wide at source; 2560 keeps detail for the zoom/pan viewer)
  ...[
    ["Bird’s-eye View.png", "scene-aerial-wide"],
    ["Bird’s-eye View(1).png", "scene-aerial-close"],
    ["Main Entrance.png", "scene-entrance"],
    ["Welcome Station.png", "scene-welcome"],
    ["Outdoor Bounty Hunter Archery.png", "scene-archery-facade"],
    ["Outdoor Bounty Hunter Archery(1).png", "scene-archery-lane"],
    ["Indoor Bounty Hunter Archery.png", "scene-archery-indoor"],
    ["Cowboy Town Photo Zone.png", "scene-photo-zone"],
    ["Souvenirs & Shopping.png", "scene-souvenirs"],
    ["Costume Rental.png", "scene-costume"],
    ["Bach Ma Café(1).png", "scene-cafe-front"],
    ["Bach Ma Café.png", "scene-cafe-inside"],
    ["Horse Basics Class.png", "scene-horse-class"],
    ["Lasso & horseshoe corner.png", "scene-lasso"],
    ["Stables.png", "scene-stables"],
    ["Riding Ring.png", "scene-riding-ring"],
  ].map(([file, name]) => [path.join(data, "3D Images", file), name, 2560, "jpg"]),

  // Horses (photos supplied by the ranch)
  [path.join(data, "NGỰA", "bong.png"), "horse-bong", 1600, "jpg"],
  [path.join(data, "NGỰA", "bo.png"), "horse-bo", 1600, "jpg"],
  [path.join(data, "NGỰA", "bach.png"), "horse-bach", 1600, "jpg"],
  [path.join(data, "NGỰA", "bin.png"), "horse-bin", 1600, "jpg"],
  [path.join(data, "NGỰA", "bolai.png"), "horse-bolai", 1600, "jpg"],
  [path.join(data, "NGỰA", "bi.png"), "horse-bi", 1600, "jpg"],
  [path.join(data, "NGỰA", "bap.png"), "horse-bap", 1600, "jpg"],
  [path.join(data, "NGỰA", "bisam.png"), "horse-bisam", 1600, "jpg"],
  [path.join(data, "NGỰA", "bun.png"), "horse-bun", 1600, "jpg"],

  // Wristband tickets
  [path.join(data, "VÉ", "visit the farm.jpg"), "ticket-visit-the-farm", 1181, "jpg"],
  [path.join(data, "VÉ", "cowboy package.jpg"), "ticket-cowboy", 1181, "jpg"],
  [path.join(data, "VÉ", "real cowboy package.jpg"), "ticket-real-cowboy", 1181, "jpg"],
];

await mkdir(out, { recursive: true });

const manifest = {};
for (const [src, name, maxWidth, format] of jobs) {
  const input = await readFile(src);
  let pipeline = sharp(input).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  pipeline =
    format === "png"
      ? pipeline.png({ compressionLevel: 9, palette: false })
      : pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: 82, mozjpeg: true });

  const { data: buffer, info } = await pipeline.toBuffer({ resolveWithObject: true });
  const file = `${name}.${format}`;
  await writeFile(path.join(out, file), buffer);
  manifest[name] = { src: `/images/${file}`, width: info.width, height: info.height };
  console.log(`${file.padEnd(34)} ${info.width}x${info.height}  ${(buffer.length / 1024).toFixed(0)} KB`);
}

// Intrinsic sizes are consumed by src/data/images.ts so <Image> never has to guess ratios.
await writeFile(path.join(root, "scripts", "images.manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Social preview (1200x630) and favicons. The social card is the only place a photo is cropped,
// because Open Graph requires a fixed 1.91:1 frame.
const heroBuffer = await readFile(path.join(out, "hero.jpg"));
const logoWhite = await sharp(path.join(out, "logo-white.png")).resize({ height: 230 }).toBuffer();
const shade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.35" stop-color="#30251f" stop-opacity="0"/><stop offset="1" stop-color="#30251f" stop-opacity="0.92"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`,
);
await sharp(heroBuffer)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([{ input: shade }, { input: logoWhite, left: 60, top: 630 - 230 - 40 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(root, "public", "og-default.jpg"));
console.log("og-default.jpg                     1200x630");

const logoSource = await readFile(path.join(out, "logo.png"));
await sharp(logoSource)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(root, "src", "app", "icon.png"));
await sharp(logoSource)
  .resize(180, 180, { fit: "contain", background: "#f8f5ef" })
  .flatten({ background: "#f8f5ef" })
  .png()
  .toFile(path.join(root, "src", "app", "apple-icon.png"));
console.log("icon.png, apple-icon.png");
