//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

//Components
import FooterContent from "./footerContent";

//Context
import { useLanguage } from "@context/language";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./footer.scss";

import { generalServices } from "@utils/services";
import { navTitles } from "@utils/pageText";

export default function Footer({ 
  inflatableTags,
  serviceTags,
} : {
  inflatableTags: tagType[];
  serviceTags: tagType[];
}) {
  const { language } = useLanguage();
  
  return (
    <footer
      aria-label="Footer"
      role="Footer"
    >
      <div className="container-fluid">
        <div className="row">
          <FooterContent
            title={ generalServices.inflatables[language] }
            tags={ inflatableTags }
          />
          <FooterContent
            title={ generalServices.services[language] }
            tags={ serviceTags }
          />
          <hr className="d-xl-none" />
          <div className="col-12 col-xl-4">
            <div className="row">
              <div className="col-12 col-sm-4 col-xl-12">
                <h6>
                  <a href="#">{ navTitles.aboutUs[language] }</a>
                </h6>
              </div>
            </div>
            <div className="row">
              <hr className="mt-3" />
              <div className="col-12 col-xl-6 order-xl-2">
                <h6 className="contacts d-sm-inline">{}</h6>
                <p className="d-sm-inline">(480) 658-7150 | <a 
                    href="https://www.facebook.com/martina0771"
                    target="_blank"
                  >
                  <FontAwesomeIcon icon={ faFacebook } />
                  </a>
                </p>
              </div>
              <div className="col-12 col-xl-6 order-xl-1">
                <small className="d-xl-block d-none">&copy; 2024 Marking Tech.</small>
                <small className="d-xl-block d-none">All rights reserved.</small>
                <small className="d-xl-none">&copy; 2024 Marking Tech. All rights reserved.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
};