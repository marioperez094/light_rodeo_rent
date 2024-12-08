//External Imports
import React from "react";

//Types
import { serviceType } from "@utils/types";

//Context 
import { useLanguage } from "@context/language";

import { logo } from "@utils/constants";

export default function TagBox({ service } : { service: serviceType }) {
  const { language } = useLanguage();
  const image = service.images[0] ? service.images[0].image_url : logo;

  return (
    <a
      id="tag-list"
      href={ `/service/${ service.id }` } 
    >
      <div
        className="aspect-ratio rounded service-image mx-3 mt-2 mb-1"
        style={{ backgroundImage: `url(${ image })` }}
      />
      <header>
        <h2 className="heading-text text-outline text-center mx-3">{ service[`${ language }_name`] }</h2>
      </header>
      <hr />
      <p className="description-box mx-2">
        { service[`${ language }_description`] }
      </p>
    </a>
  )
};