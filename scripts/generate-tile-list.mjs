// Emits public/tiles-precache.json — CartoDB tile URLs covering the route,
// fetched on first online load (src/lib/warmTileCache.ts) so the map has
// offline coverage even on a freshly installed phone. Re-run via `npm run
// tiles` if stops move; commit the JSON.
//
// URL shape must match what Leaflet actually requests, or the cache keys
// miss: subdomain = ['a','b','c'][(x + y) % 3] (Leaflet default "abc"),
// and the @2x retina suffix (every iPhone has devicePixelRatio >= 2).

// Padded bounding box around all stops (lat 59.64–63.73, lng −152.82–−148.90).
const BBOX = { south: 59.3, north: 64.1, west: -153.3, east: -148.4 };
const OVERVIEW_ZOOMS = [6, 7, 8];

// 3×3 neighborhoods at z9–10 around each overnight/anchor area so tapping a
// stop and zooming in shows local detail offline.
const DETAIL_ZOOMS = [9, 10];
const DETAIL_CENTERS = [
  [61.174, -149.996], // Anchorage
  [59.643, -151.526], // Homer
  [60.104, -149.442], // Seward
  [62.323, -150.109], // Talkeetna
  [63.729, -148.913], // Denali entrance
  [60.194, -154.32], // Lake Clark (bear flight)
];

function lngToX(lng, z) {
  return Math.floor(((lng + 180) / 360) * 2 ** z);
}
function latToY(lat, z) {
  const r = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z,
  );
}
function tileUrl(x, y, z) {
  const s = ["a", "b", "c"][(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}@2x.png`;
}

const urls = new Set();

for (const z of OVERVIEW_ZOOMS) {
  const x0 = lngToX(BBOX.west, z);
  const x1 = lngToX(BBOX.east, z);
  const y0 = latToY(BBOX.north, z); // y grows southward
  const y1 = latToY(BBOX.south, z);
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++) urls.add(tileUrl(x, y, z));
}

for (const z of DETAIL_ZOOMS) {
  for (const [lat, lng] of DETAIL_CENTERS) {
    const cx = lngToX(lng, z);
    const cy = latToY(lat, z);
    for (let x = cx - 1; x <= cx + 1; x++)
      for (let y = cy - 1; y <= cy + 1; y++) urls.add(tileUrl(x, y, z));
  }
}

const list = [...urls];
const { writeFileSync } = await import("node:fs");
writeFileSync("public/tiles-precache.json", JSON.stringify(list, null, 0));
console.log(`✓ public/tiles-precache.json — ${list.length} tiles`);
