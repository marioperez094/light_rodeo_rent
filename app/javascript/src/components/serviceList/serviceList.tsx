//External Imports
import React from "react";

//Components
import ServiceBox from "./serviceBox";

//Types
import { cardType } from "@utils/types";

export default function ServiceList({
  cards
} : {
  cards: cardType[];
}) {
  const serviceBoxArray = [0, 1, 2, 3, 4, 5]
  const serviceCards = cards.filter(card => !card.isCarousel);

  return(
    <div
      className="container-fluid service-list pt-3 pt-lg-4 pt-xl-5"
    >
      <div className="row pt-2">
        { serviceBoxArray.map((num: number) =>
          <React.Fragment key={ num }>
            <ServiceBox
              card={serviceCards[num]}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  )
};