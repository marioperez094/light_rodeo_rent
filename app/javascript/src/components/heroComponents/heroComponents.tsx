//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

import { translationText } from "@utils/constants";

//Stylesheets
import "./heroComponents.scss";

export function PhoneNumber() {
  const { language } = useLanguage();
  
  return (
    <div className="phone-number-container d-lg-none">
      <h3 className="phone-number heading-text text-end">
        <span className="text-outline">
          { translationText.rentNow[language] }
        </span>
        <a
          className="btn btn-warning d-block"
          href="/contact"
        >
          (480) 658-7150
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
        { translationText.slogan[language] }
      </h3>
    </div>
  )
};

export function HeroTitle({ 
  title,
} : { 
  title: string;
}) {
  const { language } = useLanguage();
  

  return (
    <div className="hero-title-container rounded">
      <h1 className="hero-title heading-text text-outline text-center">
        { title }
      </h1>
    </div>
  )
};