//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@adminComponents/adminNavbar/adminNavbar";
import ActiveTab from "@adminComponents/serviceComponents/activeTab";
import DeleteService from "@adminComponents/serviceComponents/deleteService";
import ServiceEditor from "@adminComponents/serviceComponents/serviceEditor";
import NoListings from "@components/headers/noListings";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./adminService.scss";
import TagTable from "@adminComponents/tagComponents/tagTable";


type AppProps = { service_id: number };

type AppStates = {
  service: serviceType;
  loading: boolean;
};

class AdminService extends React.Component<AppProps, AppStates> { 
  constructor(props: any) {
    super(props);

    this.state = {
      service: {
        english_name: "",
        spanish_name: "",
        english_description: "",
        spanish_description: "",
        dimensions: "",
        images: []
      },
      loading: false
    }
  };

  componentDidMount(): void {
    this.fetchService();
  };

  fetchService = (): void  => {
    fetch(`/api/services/${ this.props.service_id }`)
      .then(handleErrors)
      .then(data => this.setState({ service: data.service }))
      .catch(error => { alert(error) })
  };

  setLoading = (): void => {
    this.setState({ loading: !this.state.loading })
  }

  render() {
    const { service, loading } = this.state;
    const { id } = service;
    
    if (!service.id) {
      return (
        <>
          <AdminNavbar />
          <NoListings listing="de el Servicio"/>;
        </>
      )
    }

    return(
      <Router>
        <header>  
          <AdminNavbar />
          <div className="container-fluid" id="service">
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
          </div>
        </header>
        <main className="container-fluid">
          <Routes>
            <Route
              exact path={ `/admin/service/${ id }` }
              element={
                <ServiceEditor
                  service={ service }
                  loading={ loading }
                  setLoading={ this.setLoading }
                  fetchService={ this.fetchService }
                  key={ service.id } 
                />
              }
            />
            <Route
              path={ `/admin/service/${ id }/taggables` }
              element={
                <TagTable
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

class ServiceTags extends React.Component {
  componentDidMount(): void {
    this.fetchTags();
  };

  fetchTags = () => {
    fetch("/api/tags")
      .then(handleErrors)
      .then(data => this.setState({ tags: data.tags }))
      .catch(error => alert(error));
  }

  render() {
    return(

    )
  }
};