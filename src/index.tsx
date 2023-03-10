import React from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import "./index.scss";
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
