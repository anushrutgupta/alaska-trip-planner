// One-off PWA icon generation from public/favicon.svg.
// Run `npm run icons` after changing the favicon; commit the PNGs.
import sharp from "sharp";

const SVG = "public/favicon.svg";
const BLUE = "#2563eb";

// Standard manifest icons — the SVG's own rounded-rect background shows.
await sharp(SVG).resize(192, 192).png().toFile("public/pwa-192.png");
await sharp(SVG).resize(512, 512).png().toFile("public/pwa-512.png");

// Maskable: artwork inside the ~80% safe zone on a solid background,
// so launchers can crop to any shape without clipping the mountain.
const inner = await sharp(SVG).resize(410, 410).png().toBuffer();
await sharp({
  create: { width: 512, height: 512, channels: 4, background: BLUE },
})
  .composite([{ input: inner, gravity: "center" }])
  .png()
  .toFile("public/pwa-512-maskable.png");

// iOS home-screen icon: no transparency, solid corners (iOS rounds it).
const appleInner = await sharp(SVG).resize(150, 150).png().toBuffer();
await sharp({
  create: { width: 180, height: 180, channels: 4, background: BLUE },
})
  .composite([{ input: appleInner, gravity: "center" }])
  .png()
  .toFile("public/apple-touch-icon.png");

console.log("✓ pwa-192, pwa-512, pwa-512-maskable, apple-touch-icon written");
