//External Imports
import React from "react";

//Components
import { ListBackground } from "@components/serviceList/ListBackground";
import ImageCarousel from "@components/imageCarousel/imageCarousel";

//Context
import { useLanguage } from "@context/language";

//Types
import { serviceType } from "@utils/types";

import { translationText } from "@utils/constants";

export default function ServiceWidget({ 
  service,
  images, 
} : { 
  service: serviceType; 
  images: [];
}) {
  const { language } = useLanguage();
  const imageCards = getImageCards(service, images);
  const tags = service.tags ? service.tags.map(tag => tag.tag[`${ language }_name`]) : null;

  function saveToLocal() {
    localStorage.setItem("serviceRental", JSON.stringify(service))
  };

  return(
    <ListBackground>
      <article className="service-box col-12 py-4 px-lg-5">
        <div className="service-widget shadow-lg rounded p-2">
          <div className="row">
            <div className="col-12 col-lg-6 px-4 pt-2">
              <ImageCarousel 
                cards={ imageCards }
                timer={ false }
                imageUX={ true }
              >
              </ImageCarousel>
            </div>
            <div className="col-12 col-lg-6 px-4 pt-2 service-description">
              <h1 className="heading-text text-center mx-3">{ service[`${ language }_name`] }</h1>
              <hr />
              { service.dimensions &&
                <p><strong>{ translationText.dimensions[language] }</strong>: { service.dimensions }</p> 
              }
              <p><strong>{ translationText.description[language] }</strong>: { service[`${ language }_description`] }</p>
              { tags &&
                <p><strong>{ translationText.categories[language] }</strong>: { tags.join(", ")}</p> 
              }
              <a
                className="btn btn-warning my-5 d-flex justify-content-center"
                onClick={ saveToLocal }
                href="/contact"
              >
                { translationText.rentNow[language] }
              </a>
            </div>
          </div>
        </div>
      </article>
    </ListBackground>
  )
};

function getImageCards(service, images) {
  if (!images) return undefined;
  
  const imageCards = images.map((card, num) => {
    return ({
        id: num,
        image_url: card.image_url,
        tag: {
          english_name: service.english_name,
          spanish_name: service.spanish_name,
        }
    })});
  return imageCards;
}