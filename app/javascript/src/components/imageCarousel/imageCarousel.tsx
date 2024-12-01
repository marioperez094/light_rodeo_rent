//External Imports
import React, { ReactNode, useEffect, useState } from "react";

//Components
import ImageContainer from "./imageContainer";

//Context
import { useLanguage } from "@context/language";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./imageCarousel.scss";

import { logo } from "@utils/constants";


export default function ImageCarousel({ 
  cards = [],
  image = logo,
  children,
} : { 
  cards?: cardType[];
  image?: string;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const timePerImage: number = 15000;
    const imageCarouselTimer = setInterval(() => {
      showNextImage();
    }, timePerImage);
    
    return () => {
      clearInterval(imageCarouselTimer);
    };
  }, [cards, cardIndex]);

  function showNextImage() {
    if (cardIndex > cards.length - 2) return setCardIndex(0);
    return setCardIndex(prevState => prevState + 1);
  };

  if (cards.length === 0) return (
    <ImageContainer>
      <div className="carousel d-flex justify-content-center">
        <img
          src={ image }
          className="img-slider d-block"
        />
        { children }
      </div>
    </ImageContainer>
  )

  return (
    <ImageContainer>
      <div>{ cardIndex }</div>
      <div className="carousel d-flex w-100">
        { cards.map((card, index) => {
          return(
            <img
              key={ card.id }
              src={ card.image_url }
              alt={ card.tag[`${ language }_name`]}
              aria-hidden={ cardIndex !== index }
              className="img-slider d-block"
              style={{ translate: `${ -100 * cardIndex }%` }}
            />
          )
        })}
        { children }
      </div>
    </ImageContainer>
  )
};