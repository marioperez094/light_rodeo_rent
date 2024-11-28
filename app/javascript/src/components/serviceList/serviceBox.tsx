//External Imports
import React, { ReactNode } from "react";

//Types
import { cardType } from "@utils/types";

export default function ServiceBox({
  card,
} : {
  card: cardType
}) {
  const image = `https://${process.env.PHOTO_UPLOAD_BUCKET}.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;

  if (!card) return (
    <ServiceBoxContainer>
      <div
        className="aspect-ratio rounded service-image mt-1"
        style={{ backgroundImage: `url(${image})` }}
      />
      <header>
        <h4 className="heading-text text-center">Nombre</h4>
      </header>
    </ServiceBoxContainer>
  )

  return (
    <ServiceBoxContainer>

    </ServiceBoxContainer>
  )
};

function ServiceBoxContainer({ children } : { children: ReactNode }) {
  return (
    <div className="service-box col-12 col-md-6 col-lg-4 py-4 px-lg-5">
      <div className="service p-2">
        <a href="#">
          { children }
        </a>
      </div>
    </div>
  )
}