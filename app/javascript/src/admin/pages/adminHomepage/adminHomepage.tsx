//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import AdminCardsFormat from "@adminComponents/adminCards/adminCards";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./adminHomepage.scss";

type AppProps = {};

type AppStates = {
  carouselCards: cardType;
  serviceListCards: cardType[];
};

class AdminHomepage extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      carouselCards: [],
      serviceListCards: [],
    }
  };
  
  componentDidMount(): void {
    fetch("/api/cards")
      .then(handleErrors)
      .then(data => this.setCards(data.cards))
      .catch(error => alert(error))
  }

  setCards = (cards: cardType): void => {
    const carouselCards = cards.filter(card => card.isCarousel);
    const serviceListCards = cards.filter(card => !card.isCarousel);

    this.setState({ carouselCards, serviceListCards })
  };

  render() {
    const { carouselCards, serviceListCards } = this.state;

    return(
      <Router>
        <AdminNavbar />
        <Routes>
          <Route
            exact path={"/admin/homepage"}
            element={
              <AdminCardsFormat
                carouselCards={ carouselCards }
                serviceListCards={ serviceListCards } 
              />
            }
          />
        </Routes>
      </Router>
    )
  };
};

export default AdminHomepage;