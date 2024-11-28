//External Imports
import React from "react";

//Components
import FooterContent from "./footerContent";

//Context
import { useLanguage } from "@context/language";

import { generalServices, services } from "@utils/services";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer>
      <div className="container-fluid">
        <FooterContent
          title={ generalServices.inflatables[language] }
          links={ [services.jumpers[language], services.themed[language]] }
        />
      </div>
    </footer>
  )
};