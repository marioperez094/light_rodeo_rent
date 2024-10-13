import React from "react";
import { createRoot } from "react-dom/client";
import AdminService from "./adminService1";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");

  const params = document.getElementById("params");
  const data = JSON.parse(params.getAttribute("data-params"));
  
  const root = createRoot(node);
  root.render(<AdminService service_id={ data.service_id }/>);
  document.body.appendChild(node);
});