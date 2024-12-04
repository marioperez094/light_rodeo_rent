import React from "react";
import { createRoot } from "react-dom/client";
import Success from "./success";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<Success />);
  document.body.appendChild(node);
});