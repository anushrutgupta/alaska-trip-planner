import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import { PrintView } from "./components/PrintView";
import { warmTileCache } from "./lib/warmTileCache";
import "./index.css";

// `?print` renders the standalone PDF packet instead of the interactive app.
const isPrint = new URLSearchParams(window.location.search).has("print");

// New builds download in the background and take over on the next launch —
// no update UI for friends to deal with.
registerSW({ immediate: true });

if (!isPrint) {
  // Best-effort: ask the browser not to evict our caches/localStorage.
  navigator.storage?.persist?.();
  warmTileCache();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isPrint ? <PrintView /> : <App />}</React.StrictMode>,
);
