//External Imports
import React, { ReactNode } from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import ImageCarousel from "@components/imageCarousel/imageCarousel";
import ServiceWidget from "@components/serviceWidget/serviceWidget";
import ServiceList from "@components/serviceList/serviceList";
import { PhoneNumber, Slogan } from "@components/heroComponents/heroComponents";

//Context
import { LanguageProvider } from "@context/language";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./home.scss";

type AppProps = {
};

type AppStates = {
  carouselCards: cardType[];
  serviceCards: cardType[];
};

class Home extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      carouselCards: [],
      serviceCards: [],
    };
  };

componentDidMount(): void {
  this.fetchAPI();
};

fetchAPI = (): void => {
  getRequest("/api/cards", (response: any) => {
    this.filterCards(response.cards);
  });
};

filterCards = (cards: cardType): void => {
  const carouselCards = [];
  const serviceCards = [];

  cards.forEach((card: cardType) => {
    if (card.isCarousel) return carouselCards.push(card);
    return serviceCards.push(card);
  });

  this.setState({ serviceCards, carouselCards });
};

  render(): ReactNode {
    const { carouselCards, serviceCards } = this.state;
    const layoutImage = carouselCards[0]?.image_url;

    return(
      <LanguageProvider>
        
        <SkipContent link="#services" />
        
        <HomeLayout
          layoutImage={ layoutImage }
        >
          <main
            id="main"
            role="Main"
          >
            <ImageCarousel
              cards={ carouselCards }
              timer={ true }
            >
              
              <PhoneNumber />
              
              <Slogan />
            
            </ImageCarousel>
            
            <ServiceWidget />
            
            <ServiceList
              cards={ serviceCards }
            />
          
          </main>
        </HomeLayout>
      </LanguageProvider>
    )
  }
};

export default Home;