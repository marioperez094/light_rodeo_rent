//External Imports
import React from "react";

//Components
import HomeLayout from "@components/homeLayout/homeLayout";
import HomeNoListings from "@components/headers/homeNoListings";

//Context
import { useLanguage } from "@context/language";

import { generalServices } from "@utils/constants";

//Stylesheets
import "./noResults.scss";


export default function NoResults() {
  const { language } = useLanguage();
  return (
    <HomeLayout>
      <div className="spacer d-flex justify-content-center align-items-center" >
        <HomeNoListings listing={ generalServices.services[language] } />
      </div>
    </HomeLayout>
  )
};