//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { languageType } from "@utils/types";

export default function ServiceWidget() {
  const { language } = useLanguage();

  return(
    <div>Hi</div>
  )
};