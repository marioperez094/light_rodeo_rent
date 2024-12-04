//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

//Stylesheet
import "./imageCarousel.scss";

export default function CarouselButtons(
  {
    showPrevImage,
    showNextImage,
  } : {
    showPrevImage: () => void
    showNextImage: () => void
  }
) {
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