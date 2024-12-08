//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

//Types
import { imagesType } from "@utils/types";

//Stylesheet
import "./imageCarousel.scss";

export default function CarouselButtons(
  {
    images,
    showPrevImage,
    showNextImage,
  } : {
    images: imagesType[];
    showPrevImage: () => void
    showNextImage: () => void
  }
) {
  if (images.length < 2) return;
  return (
    <>
      <button
        onClick={ showPrevImage }
        className="btn-slider d-block"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <FontAwesomeIcon
          className="slider-arrow"
          icon={ faArrowAltCircleLeft }
        />
      </button>
      <button
        onClick={ showNextImage }
        className="btn-slider"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <FontAwesomeIcon
          className="slider-arrow"
          icon={ faArrowAltCircleRight }
        />
      </button>
    </>
  );
};