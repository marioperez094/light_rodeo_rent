import React from "react";
import { createRoot } from "react-dom/client";
import Service from "./service";
import { LanguageProvider, useLanguage } from "@context/language";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");

  const params = document.getElementById("params");
  const data = JSON.parse(params.getAttribute("data-params"));
  
  const root = createRoot(node);
  root.render(
    <LanguageProvider>
      <ServiceLanguage service_id={ data.service_id } />
    </LanguageProvider>
  );
  document.body.appendChild(node);
});

function ServiceLanguage({ service_id } : { service_id: number }) {
  const { language } = useLanguage();
  
  return(
    <Service
      service_id={ service_id }
      language={ language }
    />
  )
};