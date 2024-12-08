//External Imports
import React, { ReactNode } from "react";

export default function ImageContainer({ children } : { children: ReactNode }) {
  return(
    <section
      aria-label="Inflatables Carousel Image Library"
      className="container-fluid carousel-container"
      id="image-carousel"
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
}