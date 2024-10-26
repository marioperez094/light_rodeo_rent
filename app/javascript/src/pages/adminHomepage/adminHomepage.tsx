//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import HomePageFormat from "@components/adminCards/adminCards";
import AdminCardFormParams from "./adminCardForm";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { cardType } from "@utils/types";

//Stylesheet
import "./adminHomepage.scss";

type AppProps = {};

type AppStates = {
  allCards: cardType[];
  carouselCards: cardType[];
  serviceListCards: cardType[];
};

class AdminHomepage extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      allCards: [],
      carouselCards: [],
      serviceListCards: []
    }
  }
  componentDidMount(): void {
    fetch("/api/cards")
      .then(handleErrors)
      .then((data) => { this.setCards(data.cards), console.log(data) })
      .catch(error => console.log(error))
  };


  setCards = (cards: cardType[]) => {
    const carouselCards = cards.filter(card => card.isCarousel);
    const serviceListCards = cards.filter(card => !card.isCarousel);

    this.setState({ carouselCards, serviceListCards });
};

  render() {
    return (
      <Router>
        <AdminNavbar />
        <Routes>
          <Route
            exact path={ "/admin/homepage" }
            element={
              <HomePageFormat 
                carouselCards={ this.state.carouselCards }
                serviceListCards={ this.state.serviceListCards }
              />
            } 
          />
          <Route
            path="/admin/homepage/:cardType/:card_id"
            element={ 
            <AdminCardFormParams
              carouselCards={ this.state.carouselCards }
              serviceListCards={ this.state.serviceListCards }
            /> }
          />
        </Routes>
      </Router>
    )
  }
};

export default AdminHomepage;
