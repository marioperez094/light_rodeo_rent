import React from "react";
import { createRoot } from "react-dom/client";
import AdminServices from "./adminServices";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<AdminServices />);
  document.body.appendChild(node);
});