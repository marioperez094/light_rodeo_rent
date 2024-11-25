import React from "react";
import { createRoot } from "react-dom/client";
import AdminHomepage from "./adminHomepage";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<AdminHomepage />);
  document.body.appendChild(node);
});