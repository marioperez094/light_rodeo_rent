//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import NoListings from "@components/headers/noListings";
import ActiveTab from "@adminComponents/serviceComponents/activeTab";
import DeleteService from "@adminComponents/serviceComponents/deleteService";
import ServiceEditor from "@adminComponents/serviceComponents/serviceEditor";
import ServiceTags from "@adminComponents/serviceComponents/serviceTags";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./adminService.scss"

type AppProps = { service_id: number };

type AppStates = {
  service: {} | serviceType;
}

class AdminService extends React.Component<AppProps, AppStates> { 
  constructor(props: any) {
    super(props);

    this.state = {
      service: {},
    };
  };

  componentDidMount(): void {
    this.fetchService();
  };

  fetchService = (): void => {
    getRequest(`/api/services/${ this.props.service_id }`, (response: any) => {
      this.setState({ service: response.service });
    });
  };

  render() {
    const { service } = this.state;
    const{ id } = service;

    if (!id) {
      return (
        <>
          <AdminNavbar />
          <NoListings listing="de el Servicio" />
        </>
      )
    }

    return(
      <Router>
        <AdminNavbar />
        <header className="container-fluid">
          <div className="row">
            <ActiveTab
              link={ `/admin/service/${ id }` }
            >
              Editar el Servicio
            </ActiveTab>
            <ActiveTab
              link={ `/admin/service/${ id }/taggables` }
            >
              Editar las Categorias
            </ActiveTab>
            <ActiveTab
              link={ `/admin/service/${ id }/delete` }
            >
              Borrar el Servicio
            </ActiveTab>
          </div>
        </header>
        <main className="container-fluid">
          <Routes>
            <Route
              exact path={ `/admin/service/${ id }` }
              element={
                <ServiceEditor
                  key={ service.id }
                  fetchService= { this.fetchService }
                  service={ service }
                />
              }
            />
            <Route
              path={ `/admin/service/${ id }/taggables` }
              element={
                <ServiceTags
                  id={ id }
                />
              }
            />
            <Route
              path={ `/admin/service/${ id }/delete` }
              element={ 
                <DeleteService id={ id } />
              }
            />
          </Routes>
        </main>
      </Router>
    )
  };
};

export default AdminService;