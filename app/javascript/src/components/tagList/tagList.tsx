//External Imports
import React from "react";

//Components
import { ListBackground, TagBoxContainer } from "../serviceList/ListBackground";
import HomeNoListings from "@components/headers/homeNoListings";
import TagBox from "./tagBox";

//Context
import { useLanguage } from "@context/language";

//Types
import { tagType, serviceType } from "@utils/types";

//Stylesheets
import "./tagList.scss";

import { translationText } from "@utils/constants";

export default function TagList({
  tag
} : {
  tag: tagType
}) {
  const { language } = useLanguage();

  console.log(tag.services)
  if (tag.services.length === 0) return (
    <HomeNoListings listing={ translationText.services[language] }/>
  )

  return(
    <ListBackground>
      { tag.services.map((service: serviceType) => {
        return(
          <TagBoxContainer key={ service.id }>
            <TagBox 
              service={ service }
            />
          </TagBoxContainer>
        )
      })}
    </ListBackground>
  )
}