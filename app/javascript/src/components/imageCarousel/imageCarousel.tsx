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
import CarouselDots from "./carouselDots";


export default function ImageCarousel({ 
  cards = [],
  image = logo,
  timer = false,
  imageUX = false,
  children,
} : { 
  cards?: cardType[];
  image?: string;
  timer?: boolean;
  imageUX?: boolean;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const timePerImage: number = 15000;
    let imageCarouselTimer;

    if (timer) {
      imageCarouselTimer = setInterval(() => {
        showNextImage();
      }, timePerImage)
    }
    return () => {
      clearInterval(imageCarouselTimer);
    };
  }, [cards, cardIndex]);

  function showNextImage() {
    if (cardIndex > cards.length - 2) return setCardIndex(0);
    return setCardIndex(prevState => prevState + 1);
  };

  function setImageIndex(index) {
    return setCardIndex(index);
  }

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
        { imageUX && 
          <CarouselDots
            images={ cards }
            imageIndex={ cardIndex }
            setImageIndex={ setCardIndex }
          />
        }
        { children }
      </div>
    </ImageContainer>
  )
};