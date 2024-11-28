//External Imports
import React from "react";

//Components
import HomeNavbar from "@components/homeNavbar/homeNavbar";
import ImageCarousel from "@components/imageCarousel/imageCarousel";
import { Slogan, PhoneNumber } from "@components/heroComponents/heroComponents";
import ServiceWidget from "@components/serviceWidget/serviceWidget";
import ServiceList from "@components/serviceList/serviceList";
import Footer from "@components/footer/footer";

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
    getRequest("/api/cards", (response: any) => {
      this.setState({ cards: response.cards })
    })
  };

  render(): React.ReactNode {
    return(
      <LanguageProvider>
        <a
          className="skip-content"
          href="#services"
        >
          Skip to Content
        </a>
        <HomeNavbar />

        <main
          id="main"
          role="main"
        >
          <ImageCarousel
            cards={ this.state.cards }
          >
            <PhoneNumber />
            <Slogan />
          </ImageCarousel>
        </main>

        <section
          className="container-fluid service-widget"
          aria-label="Service Widget"
        >
          <ServiceWidget />
        </section>

        <section
          id="services"
        >
          <ServiceList
            cards={ this.state.cards } 
          />
        </section>

        <Footer />
      </LanguageProvider>
    )
  };
};

export default Home;