//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import ServiceList from "@adminComponents/serviceList/serviceList";
import NewServiceForm from "@adminComponents/serviceForm/newServiceForm";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Utils
import { serviceType } from "@utils/types";

type AppProps = {};

type AppState = {
  services: serviceType[];
};

class AdminServiceList extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      services: [],
    }
  };

  componentDidMount(): void {
    this.fetchService()
  }

  fetchService = () => {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => this.setState({ services: data.services }))
      .catch(error => alert(error))
  };

  render() {
    return(
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
          <Routes>
            <Route
              exact path="/admin/service-list"
              element={ <ServiceList services={ this.state.services } key={ this.state.services.length }/> }
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