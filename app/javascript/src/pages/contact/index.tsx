import React from "react";
import { createRoot } from "react-dom/client";
import Contact from "./contact";
import { LanguageProvider, useLanguage } from "@context/language";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.createElement("div");
  const root = createRoot(node);
  root.render(
    <LanguageProvider>
        <ContactLanguage />
    </LanguageProvider>
    
  );
  document.body.appendChild(node);
});

function ContactLanguage() {
  const { language } = useLanguage();

  return (
    <Contact
      language={ language }
    />
  )
};