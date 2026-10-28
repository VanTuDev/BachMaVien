/**
 * Encodes the 4K HEVC demo from ../DataImage/3D Video into a web-friendly 1080p H.264 MP4
 * (public/video/bach-ma-vien-tour.mp4) plus its poster frame. Needs `ffmpeg` on PATH.
 *
 * The original is ~500 MB and HEVC, which many browsers cannot play. Run with `npm run video`.
 */
import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(root, "..", "DataImage", "3D Video", "Bach ma vien op 2_.mov");
const outDir = path.join(root, "public", "video");
const mp4 = path.join(outDir, "bach-ma-vien-tour.mp4");
const poster = path.join(outDir, "bach-ma-vien-tour-poster.jpg");

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-y", ...args], { stdio: "inherit" });
  if (result.error || result.status !== 0) {
    console.error("ffmpeg failed. Is it installed and on PATH?");
    process.exit(1);
  }
}

await mkdir(outDir, { recursive: true });

ffmpeg([
  ...["-i", source],
  ...["-vf", "fps=30,scale=1920:-2:flags=lanczos"],
  ...["-c:v", "libx264", "-preset", "slow", "-crf", "30", "-maxrate", "3000k", "-bufsize", "6000k"],
  ...["-profile:v", "high", "-pix_fmt", "yuv420p"],
  ...["-c:a", "aac", "-b:a", "96k"],
  ...["-movflags", "+faststart", mp4],
]);

// Poster = the gate shot with the "Welcome to Bach Ma Vien" caption, 5 s in.
ffmpeg(["-ss", "5", "-i", mp4, "-frames:v", "1", "-q:v", "4", poster]);
