//External Imports
import React, { ReactNode } from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { cardType } from "@utils/types";

export default function ServiceBox({
  card,
} : {
  card: cardType
}) {
  const { language } = useLanguage();
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
      <a href={ `/service-type/${ card.tag.tag_id }` }>
        <div
          className="aspect-ratio rounded service-image mt-1"
          style={{ backgroundImage: `url(${ card.image_url })` }}
        />
        <header>
          <h4 className="heading-text text-center">{ card.tag[`${ language }_name`]}</h4>
        </header>
      </a>
    </ServiceBoxContainer>
  )
};

function ServiceBoxContainer({ children } : { children: ReactNode }) {
  return (
    <div className="service-box col-12 col-md-6 col-lg-4 py-4 px-lg-5">
      <div className="service shadow rounded p-2">
        { children }
      </div>
    </div>
  )
}