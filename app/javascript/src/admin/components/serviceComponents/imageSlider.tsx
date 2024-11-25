//External Imports
import React from "react";

//Components
import NoListings from "@components/headers/noListings";


export default function ImageSlider({ images }: { images: [] }) {
  
  if (images.length === 0) return (<NoListings listing="imagenes" />)

  return (
    <div className="row flex-nowrap my-3 scrollableRow">
      { images.map((image, index) => {
        return (
          <div className="col-12 col-md-6 col-xl-4" key={ index }>
            <div className="service-image rounded" style={{ backgroundImage: `url(${ image.image_url })`}} />
          </div>
        )
      })}
    </div>
  )
};