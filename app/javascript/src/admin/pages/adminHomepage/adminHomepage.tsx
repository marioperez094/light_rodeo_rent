//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import AdminCardsFilter from "@adminComponents/adminCards/adminCards";
import AdminCardParams from "@adminComponents/adminCards/adminCardForm";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./adminHomepage.scss";

type AppProps = {};

type AppStates = {
  cards: cardType[];
};

class AdminHomepage extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      cards: []
    }
  };

  componentDidMount(): void {
    this.fetchCards();
  };

  fetchCards = () => {
    fetch("/api/cards")
      .then(handleErrors)
      .then(data => this.setState({ cards: data.cards }))
      .catch(error => alert(error))
  };

  render() {
    const { cards } = this.state;
    return(
      <Router>
        <AdminNavbar />
        <Routes>
          <Route
            exact path="/admin/homepage"
            element={
              <AdminCardsFilter
                cards={ cards }
              />
            }
          />
          <Route
            path="/admin/homepage/:cardType/:card_id"
            element={
              <AdminCardParams
              />
            }
          />
        </Routes>
      </Router>
    )
  }
};

export default AdminHomepage;