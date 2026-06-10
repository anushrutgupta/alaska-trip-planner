import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Alaska 2026 — Trip Planner",
        short_name: "Alaska 2026",
        description:
          "Anchorage–Homer–Seward–Talkeetna–Denali road trip · Jun 25 – Jul 5, 2026",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/pwa-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,json}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            // Map tiles: CacheFirst so the Alaska backcountry (no cell) works.
            // Tiles must be CORS responses (TileLayer crossOrigin) — opaque
            // responses are quota-accounted at ~7 MB each and would blow
            // storage. 60 days outlasts the trip.
            urlPattern: /^https:\/\/[a-d]\.basemaps\.cartocdn\.com\/.*\.png$/,
            handler: "CacheFirst",
            options: {
              cacheName: "carto-tiles",
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 60 * 60 * 24 * 60,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
