//External Imports
import React from "react";

//Components
import { ServiceBoxContainer, ListBackground } from "./ListBackground";
import ServiceBox from "./serviceBox";

//Types
import { cardType } from "@utils/types";

export default function ServiceList({ 
  cards
} : { 
  cards: cardType[];
}) {
  const serviceBoxArray = [0, 1, 2, 3, 4, 5]
  
  return(
    <ListBackground>
      { serviceBoxArray.map((num: number) => {
        return(
          <ServiceBoxContainer key={ num }>
            <ServiceBox
              card={ cards[num] }
            />
          </ServiceBoxContainer>
        )
      })}
    </ListBackground>
  )
};

