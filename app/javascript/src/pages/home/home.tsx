//External Imports
import React from "react";

//Components
import HomeNavbar from "@components/homeNavbar/homeNavbar";
import ImageCarousel from "@components/imageCarousel/imageCarousel";

//Context
import { LanguageProvider, useLanguage } from "@context/language";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./home.scss";

type AppProps = {
};

type AppStates = {
  cardIndex: number;
  cards: cardType[];
};

class Home extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      cardIndex: 0,
      cards: [],
    };
  };

  componentDidMount(): void {
    getRequest("/api/cards", (response: any) => {
      this.setState({ cards: response.cards })
    })

    this.imageCarouselTimer = setInterval(() => {
      this.showNextImage();
      //Milliseconds taht every image changes
    }, 15000);
  };

  showNextImage = (): void => {
    const { cardIndex } = this.state;

    if (cardIndex === 2) return this.setState({ cardIndex: 0 });
    return this.setState({ cardIndex: cardIndex + 1 });
  };

  render(): React.ReactNode {
    const { cards, cardIndex } = this.state;

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
          <ImageCarousel />
        </main>
      </LanguageProvider>
    )
  };
};

export default Home;