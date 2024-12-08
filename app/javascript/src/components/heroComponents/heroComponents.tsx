//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

import { translationText } from "@utils/constants";

//Stylesheets
import "./heroComponents.scss";

import { phoneNumber } from "@utils/constants";

export function PhoneNumber() {
  const { language } = useLanguage();
  
  return (
    <div className="phone-number-container d-lg-none">
      <div className="phone-number heading-text text-outline text-end">
        <span className="text-outline">
          { translationText.rentNow[language] }
        </span>
        <a
          className="btn btn-warning d-block"
          href="/contact"
        >
          { phoneNumber }
        </a>
      </div>
    </div>
  )
};

export function Slogan() {
  const { language } = useLanguage();

  return (
    <h1 className="slogan heading-text text-outline text-center">
      { translationText.slogan[language] }
    </h1>
  )
};

export function HeroTitle({ 
  title,
} : { 
  title: string;
}) {

  return (
    <div className="hero-title-container rounded">
      <h1 className="hero-title heading-text text-outline text-center">
        { title }
      </h1>
    </div>
  )
};