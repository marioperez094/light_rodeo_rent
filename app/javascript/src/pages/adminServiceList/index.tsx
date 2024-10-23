import React from "react";
import { createRoot } from "react-dom/client";
import AdminServiceList from "./adminServiceList";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(<AdminServiceList />);
  document.body.appendChild(node);
});