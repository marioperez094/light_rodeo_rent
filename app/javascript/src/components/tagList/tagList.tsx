//External Imports
import React from "react";

//Components
import { ListBackground, TagBoxContainer } from "../serviceList/ListBackground";
import HomeNoListings from "@components/headers/homeNoListings";

//Context
import { useLanguage } from "@context/language";

//Types
import { tagType, serviceType } from "@utils/types";

//Stylesheets
import "./tagList.scss";

import { generalServices } from "@utils/constants";

export default function TagList({
  tag
} : {
  tag: tagType
}) {
  const { language } = useLanguage();

  if (!tag) return (
    <HomeNoListings listing={ generalServices.services[language] }/>
  )

  return(
    <ListBackground>
      { tag.services.map((service: serviceType) => {
        return(
          <TagBoxContainer key={ service.id }>
            <a
              id="tag-list"
              href={ `/service/${ service.id }` }
            >
              <div
                className="aspect-ratio rounded service-image mx-3 mt-2 mb-1"
                style={{ backgroundImage: `url(${ service.images[0].image_url })` }}
              />
              <header>
                <h4 className="heading-text text-center mx-3">{ service[`${ language }_name`] }</h4>
              </header>
              <hr />
              <p className="description-box mx-2">
                { service[`${ language }_description`] }
              </p>
            </a>
          </TagBoxContainer>
        )
      })}
    </ListBackground>
  )
}