//External Imports
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Types
import { cardType } from "@utils/types";

export default function HomePageFormat({ 
  carouselCards,
  serviceListCards,
  } : { 
  carouselCards: cardType[];
  serviceListCards: cardType[];
}) {
  return (
    <main className="container-fluid cards-container">
      <AdminCardsHolder 
        cards={ carouselCards }
        //Set number of cards for the front page, the carousel will have a max of 3 cards each containing just an image
        maxCards={ 3 } 
      />
      <AdminCardsHolder
        cards={ serviceListCards }
        maxCards={ 6 }
      />
    </main>
  )
};

function AdminCardsHolder({ 
  cards,
  maxCards 
  }: { 
  cards: cardType[];
  maxCards: number; 
}) {

  //Duplicates the number of cards to the required amount
  const arrayDuplicate = [];
  for(let cardIndex = 0; cardIndex < maxCards; cardIndex++) {
    arrayDuplicate.push(cardIndex);
  };

  return(
    <div className="row admin-card-holder">
      { arrayDuplicate.map(card =>
        <React.Fragment key={ card }>
          <AdminCard 
            card={ cards[card] }
            id={ card }
            maxCards={ maxCards } 
          />
        </React.Fragment> 
      )}
    </div>
  )
};

function AdminCard({ 
  card,
  id,
  maxCards 
  }: { 
  card: cardType;
  id: number;
  maxCards: number; 
}) {
  const cardType = maxCards === 3 ? "Carrusel" : "Categoria"
  let title = `${ cardType } ${ id + 1 }`

  if (card && !card.isCarousel) title = card.tag.spanish_name 

  return(
    <Link
      className={ `c0l-12 col-md-${ 12 / maxCards }` }
      to={ `/admin/homepage/${ cardType }/${ id }` }
    >
      <AdminCardContent
        card={ card }
        title={ title } 
      />
    </Link>
  )
};

function AdminCardContent({ 
  title,
  card,
  } : { 
  title: string;
  card: cardType;
}) {
  return(
    <div className="shadow text-center">
      <div className="admin-carousel-border">
        <div className="shadow-lg inner-shadow d-flex justify-content-center align-items-center">
          { !card ?  
            <FontAwesomeIcon
              icon={ faPlus }
              className="homepage-plus"
            />
            :
            <div 
              className="service-image rounded" 
              style={{backgroundImage: `url(${ card.image_url })`}} 
            />
          }
        </div>
        <h6>{ title }</h6>
      </div>
    </div>
  )
};