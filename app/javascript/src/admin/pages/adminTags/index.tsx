import React from "react";
import { createRoot } from "react-dom/client";
import AdminTags from "./adminTags";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<AdminTags />);
  document.body.appendChild(node);
});