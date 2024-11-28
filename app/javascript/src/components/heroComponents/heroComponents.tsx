//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

import { frontPageText } from "@utils/pageText";

export function PhoneNumber() {
  const { language } = useLanguage();

  return (
    <div className="phone-number-container d-lg-none">
      <h3 className="phone-number heading-text text-end">
        <span className="text-outline">
          { frontPageText.rentNow[language] }
        </span>
        <a
          className="btn btn-warning d-block"
          href="#"
        >
          (602) 435-6640
        </a>
      </h3>
    </div>
  )
};

export function Slogan() {
  const { language } = useLanguage();

  return (
    <div className="slogan-container d-none d-lg-block">
      <h3 className="slogan heading-text text-outline text-center">
        { frontPageText.slogan[language] }
      </h3>
    </div>
  )
};