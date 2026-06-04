import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrintView } from "./components/PrintView";
import "./index.css";

// `?print` renders the standalone PDF packet instead of the interactive app.
const isPrint = new URLSearchParams(window.location.search).has("print");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isPrint ? <PrintView /> : <App />}</React.StrictMode>,
);
