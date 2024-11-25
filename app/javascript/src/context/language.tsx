//External Imports
import React, { useState, useContext, createContext, ReactNode } from "react";

type LanguageContextType = null | "spanish" | "english";

const LanguageContext = createContext<LanguageContextType>("english");
const local: string = localStorage.getItem("languagePreference")

function LanguageProvider (
  { children } : { children: ReactNode }
) {
  const [language, changeLanguage] = useState<LanguageContextType>(local ? local : "english");

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