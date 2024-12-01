//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { languageType } from "@utils/types";

export default function HomeNoListings({ listing } : { listing: string }) {
  const { language } = useLanguage();
  return(
    <div className="text-center my-3">
      <h5>{ homeNoListings[language] } <span className="text-danger">{ listing }</span>.</h5>
    </div>
  )
};

const homeNoListings: languageType = {
  "english": "There are no results for these",
  "spanish": "No ahi resultados de"
}