//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import ServiceList from "@adminComponents/serviceList/serviceList";
import NewServiceForm from "@adminComponents/serviceForm/newServiceForm";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./adminServiceList.scss";

type AppProps = {};

type AppState = {
  services: serviceType[];
};

class AdminServiceList extends React.Component<AppProps, AppState> {
  constructor(props: any) {
  super(props);

  this.state = {
    services: [],
  };
};

componentDidMount(): void {
  this.fetchService();
};

fetchService = (): void => {
  getRequest("/api/services/search/service_tag", (response: any) => {
    this.setState({ services: response.services })
  })
};

  render() {
    return(
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
          <Routes>
            <Route
              exact path="/admin/service-list"
              element={ 
                <ServiceList
                  key={ this.state.services.length }
                  services={ this.state.services } 
                />
              }
            />
            <Route
              path="/admin/service-list/new-service"
              element={ <NewServiceForm /> }
            />
          </Routes>
        </main>
      </Router>
    )
  };
};

export default AdminServiceList;