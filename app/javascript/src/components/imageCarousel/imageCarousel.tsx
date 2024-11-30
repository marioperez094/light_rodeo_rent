//External Imports
import React, { ReactNode, useEffect, useState } from "react";

//Types
import { cardType } from "@utils/types";

//Context
import { useLanguage } from "@context/language";

//Stylesheets
import "./imageCarousel.scss";

export default function ImageCarousel({
  cards,
  children,
}:{
  cards: cardType[];
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const [cardIndex, setCardIndex] = useState(0);

  const carouselCards = cards.filter(card => card.isCarousel);
  const logo = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;

  useEffect(() => {
    const timePerImage: number = 15000
    const imageCarouselTimer = setInterval(() => {
      showNextImage();
    }, timePerImage);
    return () => {
      clearInterval(imageCarouselTimer);
    };
  }, [carouselCards]);

  function showNextImage() {
    if (cardIndex === carouselCards.length - 1) return setCardIndex(0);
    return setCardIndex(prevIndex => prevIndex + 1)
  };

  if (cards.length === 0) return (
    <CarouselContainer>
      <div className="carousel d-flex justify-content-center">
        <img
          src={ logo }
          className="m-3"
        />
        { children }
      </div>
    </CarouselContainer>
  )

  return (
    <CarouselContainer>
      {/* Expands images to fit 100% of the screen */}
      <div className="carousel d-flex w-100">
        { carouselCards.map((card, index) => {
          { /* Aria-hidden hides unseen images for screen readers. Translate moves screen left or right by 100% image width */}
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
    </CarouselContainer>
  )
};

function CarouselContainer({
  children,
}: {
  children: ReactNode;
}) {
  return(
    <section
      aria-label="Inflatables Carousel Image Library"
      className="container-fluid carousel-container"
    >
      <div className="row gx-0">
        <div className="col-12">
          <div className="carousel-section w-100">
            { children }
          </div>
        </div>
      </div>
    </section>
  )
};

export function TagImage({ 
  image,
  children,
} : { 
  image: string;
  children: ReactNode; 
}) {
  return(
    <CarouselContainer>
      <div className="carousel d-flex justify-content-center">
          <img
            src={ image }
            className="img-slider d-block"
          />
          { children }
        </div>
    </CarouselContainer>
  )
};