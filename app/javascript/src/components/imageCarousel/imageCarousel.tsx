//External Imports
import React, { ReactNode } from "react";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./imageCarousel.scss";

export default function ImageCarousel({
  cards,
  cardIndex,
  children,
}:{
  cards: cardType[];
  cardIndex: number;
  children: ReactNode;
}) {
  const logo = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;

  console.log(cards)

  if (cards.length === 0) return (
    <CarouselContainer>
      <div className="carousel d-flex justify-content-center shadow">
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