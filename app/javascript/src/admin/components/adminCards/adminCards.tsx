//External Imports
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//Types
import { cardType } from "@utils/types";

export default function AdminCardsFilter({ cards } : { cards: cardType[] }) {
  const carouselCards = cards.filter(card => card.isCarousel);
  const serviceListCards = cards.filter(card => !card.isCarousel);

  return(
    <main className="container-fluid cards-container">
      <AdminCardCounter
        cards={ carouselCards }
        maxCards={ 3 }
      />
      <AdminCardCounter
        cards={ serviceListCards }
        maxCards={ 6 }
      />
    </main>
  )
};

/* A set number of cards for the front page.
   The carousel will have 3 cards with only images,
   and 6 category cards with a set tag 
*/

function AdminCardCounter({
  cards,
  maxCards
} : {
  cards: cardType[];
  maxCards: number;
}) {
  
  //Duplicates the number of cards to the max amount
  const arrayDuplicate: cardType[] = [];
  for(let cardIndex = 0; cardIndex < maxCards; cardIndex++) {
    arrayDuplicate.push(cardIndex);
  };

  return(
    <div className="row admin-card-holder">
      { arrayDuplicate.map(card => {
        return(
          <React.Fragment key={ card }>
            <AdminCard
              card={ cards[card] }
              count={ card }
              maxCards={ maxCards }
            />
          </React.Fragment>
        )
      })}
    </div>
  )
};

function AdminCard({ 
  card,
  count,
  maxCards
} : { 
  card: cardType;
  count: number;
  maxCards: number;
}) {
  const cardType = maxCards === 3 ? "Carrusel" : "Categoria";
  let id = 0;
  let title =  `${ cardType } ${ count + 1 }`

  if (card) {
    id = card.id
    title = card.isCarousel ? `Carrusel ${ count + 1 }` : card.tag.spanish_name;
  };

  return(
    <Link
      className={ `col-12 col-md-${ 12 / maxCards }` }
      to={ `/admin/homepage/${ cardType }/${ id }` }
    >
      <AdminCardContent 
        title={ title }
        card={ card }
      />
    </Link>
  )
}

function AdminCardContent({ 
  title,
  card,
}: { 
  title: string;
  card: cardType;
}) {
  
  return(
    <div className="shadow text-center">
      <div className="admin-carousel-border">
        <div className="shadow-lg inner-shadow d-flex align-items-center justify-content-center">
          { card 
            ? <div
                className="service-image rounded"
                style={{ backgroundImage: `url(${ card.image_url })` }} 
              />
            : <FontAwesomeIcon
                icon={ faPlus }
                className="admin-card-plus"
              />
          }
        </div>
        <h6>{ title }</h6>
      </div>
    </div>
  )
}