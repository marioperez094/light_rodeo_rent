//External Imports
import React, { useEffect, useRef } from "react";

//Components
import CheckMark from "./checkMark";

//Context
import { useLanguage } from "@context/language";


import { translationText } from "@utils/constants";

export default function SuccessWidget() {
  const { language } = useLanguage();
  const successWidgetRef = useRef(null);
  useEffect(() => {
    if (successWidgetRef.current) {
      successWidgetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return(
    <div
      ref={ successWidgetRef } 
      className="col-12 py-4 px-lg-5"
    >
      <div
        id="success-widget" 
        className="success-widget shadow-lg rounded p-5"
      >
        <CheckMark />
        <h3 className="text-center">{ translationText.thankYou[language] }</h3>
      </div>
    </div>
  )
};