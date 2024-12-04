//External Imports
import React from "react";

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
    <>
      <div
        className="aspect-ratio rounded service-image mt-1"
        style={{ backgroundImage: `url(${ image })` }}
      />
      <header>
        <h4 className="heading-text text-center">Nombre</h4>
      </header>
    </>
  )

  return (
    <a href={ `/service-type/${ card.tag.tag_id }` }>
      <div
        className="aspect-ratio rounded service-image mt-1"
        style={{ backgroundImage: `url(${ card.image_url })` }}
      />
      <header>
        <h4 className="heading-text text-center">{ card.tag[`${ language }_name`] }</h4>
      </header>
    </a>
  )
};

