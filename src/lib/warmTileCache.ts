// Pre-warms the map-tile cache so the route is visible offline even if the
// map was never browsed. Tiles fetched here pass through the service worker's
// CacheFirst route (vite.config.ts) and land in `carto-tiles` with the same
// cache keys live browsing produces. Failure-tolerant by design: each tile is
// independent, so a flaky fetch costs one tile, not the install.

const FLAG = "alaska.tilesWarmed.v1";

export function warmTileCache() {
  if (!navigator.onLine) return;
  if (!("serviceWorker" in navigator)) return;

  // Defer until the page is idle and the SW is in control of fetches.
  const kickoff = () => {
    navigator.serviceWorker.ready.then(async () => {
      try {
        const res = await fetch("/tiles-precache.json");
        if (!res.ok) return;
        const urls: string[] = await res.json();

        // Skip if we already warmed this exact list (hash = length + first/last).
        const stamp = `${urls.length}:${urls[0]}:${urls[urls.length - 1]}`;
        if (localStorage.getItem(FLAG) === stamp) return;

        const queue = [...urls];
        const worker = async () => {
          for (let url = queue.shift(); url; url = queue.shift()) {
            try {
              await fetch(url, { mode: "cors" });
            } catch {
              /* one tile lost, keep going */
            }
          }
        };
        await Promise.all(Array.from({ length: 6 }, worker));
        try {
          localStorage.setItem(FLAG, stamp);
        } catch {
          /* quota/private mode — we'll just warm again next launch */
        }
      } catch {
        /* offline or list missing — try again next launch */
      }
    });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(kickoff, { timeout: 5000 });
  } else {
    setTimeout(kickoff, 3000);
  }
}
