//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import AdminCardsFilter from "@adminComponents/adminCards/adminCards";
import AdminCardParams from "@adminComponents/adminCards/adminCardsForm";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { cardType } from "@utils/types";

//Stylesheets
import "./adminHomepage.scss";

type AppProps = {};

type AppStates = {
  cards: cardType[];
};

class AdminHomepage extends React.Component<AppProps, AppStates> {
  constructor(props:any) {
    super(props);

    this.state = {
      cards: [],
    };
  };

  componentDidMount(): void {
    this.fetchCards();
  };

  fetchCards = (): void => {
    getRequest("/api/cards", (response: any) => {
      this.setState({ cards: response.cards });
    });
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