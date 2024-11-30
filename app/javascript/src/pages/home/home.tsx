//External Imports
import React from "react";

//Components
import ImageCarousel from "@components/imageCarousel/imageCarousel";
import { Slogan, PhoneNumber } from "@components/heroComponents/heroComponents";
import ServiceWidget from "@components/serviceWidget/serviceWidget";
import ServiceList from "@components/serviceList/serviceList";
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";

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
  cards: cardType[];
};

class Home extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      cards: [],
    };
  };

  componentDidMount(): void {
    this.fetchAPI();
  };

  fetchAPI = (): void => {
    getRequest("/api/cards", (response: any) => {
      this.setState({ cards: response.cards })
    });
  };

  render(): React.ReactNode {
    const { cards } = this.state;
    const footerImage = cards.filter(card => card.isCarousel)[0]?.image_url;

    return(
      <LanguageProvider>
        <SkipContent link="#services" />
        <HomeLayout
          layoutImage={ footerImage }
        >

        <main
          id="main"
          role="main"
        >
          <ImageCarousel
            cards={ cards }
          >
            <PhoneNumber />
            <Slogan />
          </ImageCarousel>
        </main>

        <section
          className="container-fluid service-widget"
          aria-label="Service Widget"
        >
          <ServiceWidget
          />
        </section>

        <section
          id="services"
          aria-label="Services"
        >
          <ServiceList
            cards={ cards } 
          />
        </section>
        
        </HomeLayout>
      </LanguageProvider>
    )
  };
};

export default Home;