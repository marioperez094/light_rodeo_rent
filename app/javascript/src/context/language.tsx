//External Imports
import React, { useState, useContext, createContext, ReactNode } from "react";

type LanguageContextType = null | "Español" | "English";

const LanguageContext = createContext<LanguageContextType>("English");
const local: string = localStorage.getItem("languagePreference")

function LanguageProvider (
  { children } : { children: ReactNode }
) {
  const [language, changeLanguage] = useState<LanguageContextType>(local ? local : "English");

  function setLanguage(language: LanguageContextType) {
    localStorage.setItem("languagePreference", language); 
    changeLanguage(language);
  } ;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      { children }
    </LanguageContext.Provider>
  );
};

function useLanguage() {
  return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage }