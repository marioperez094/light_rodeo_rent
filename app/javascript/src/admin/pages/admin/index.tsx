import React from "react";
import { createRoot } from "react-dom/client";
import Admin from "./admin";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<Admin />);
  document.body.appendChild(node);
});