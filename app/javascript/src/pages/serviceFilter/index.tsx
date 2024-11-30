import React from "react";
import { createRoot } from "react-dom/client";
import ServiceFilter from "./serviceFilter";
import { LanguageProvider, useLanguage } from "@context/language";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");

  const params = document.getElementById("params");
  const data = JSON.parse(params.getAttribute("data-params"));
  
  const root = createRoot(node);
  root.render(
    <LanguageProvider>
      <ServiceFilterLanguage tag_id={ data.tag_id } />
    </LanguageProvider>
  );
  document.body.appendChild(node);
});

function ServiceFilterLanguage({ tag_id } : { tag_id: number }) {
  const { language } = useLanguage();
  
  return(
    <ServiceFilter
      tag_id={ tag_id }
      language={ language }
    />
  )
};