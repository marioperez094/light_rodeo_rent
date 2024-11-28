//External Imports
import React, { ReactNode, useEffect, useState } from "react";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./imageCarousel.scss";

export default function ImageCarousel({
  cards,
  children,
}:{
  cards: cardType[];
  children: ReactNode;
}) {
  const [cardIndex, setCardIndex] = useState(0);
  const logo = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;
  
  useEffect(() => {
    const imageCarouselTimer = setInterval(() => {
      showNextImage();
    }, 1500);

    return () => {
      clearInterval(imageCarouselTimer);
    };
  }, []);

  function showNextImage() {
    if (cardIndex === cards.length) {
      setCardIndex(0);
    }
    return setCardIndex(prevIndex => prevIndex + 1);
  }

  if (cards.length === 0) return (
    <CarouselContainer>
      <div className="carousel d-flex justify-content-center">
        <img
          src={ logo }
          className="m-3"
        />
        { cardIndex }
        { children }
      </div>
    </CarouselContainer>
  )

  return (
    <CarouselContainer>

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