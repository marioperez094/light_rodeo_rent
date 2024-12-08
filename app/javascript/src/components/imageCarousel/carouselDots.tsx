//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faCircle } from "@fortawesome/free-solid-svg-icons";

//Types
import { imagesType } from "@utils/types";

//Stylesheet
import "./imageCarousel.scss";



export default function CarouselDots(
  { 
    images,
    imageIndex,
    setImageIndex
  }: { 
    images: imagesType[]
    imageIndex: number
    setImageIndex: (index: number) => void
  }) {

  if (images.length < 2) return;
  return (
    <div className="dots-container d-flex justify-content-center w-100">
      { images.map((_, index) => {
        return (
          <button
            className="btn"
            key={ index }
            onClick={() => setImageIndex(index)}
          >
            { index === imageIndex 
              ? <FontAwesomeIcon 
                  className="slider-dot"
                  aria-hidden
                  icon={ faCircle }
                />
              : <FontAwesomeIcon
                  className="slider-dot"
                  aria-hidden
                  icon={ faCircleDot }
                />
            }
          </button>
        )
      }) }
    </div>
  );
  
};