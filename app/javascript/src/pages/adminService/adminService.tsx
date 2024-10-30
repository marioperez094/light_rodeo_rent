//External Imports
import React, { ChangeEvent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import ActiveTab from "@components/serviceComponents/activeTab";
import ImageSlider from "@components/serviceComponents/imageSlider";
import ServiceForm from "@components/serviceForm/serviceForm";
import TagSelector from "@components/serviceComponents/tagSelector";
import DeleteService from "@components/serviceComponents/deleteService";

//Functions
import { setServiceFormData, errorObject } from "@utils/utils"
import { safeCredentialsFormData, handleErrors } from "@utils/fetchHelper";

//Types
import { serviceType } from "@utils/types";

//Stylesheet
import "./adminService.scss"

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
    fetch(`/api/services/${ this.props.service_id }`)
      .then(handleErrors)
      .then(data => {
        this.setState({ service: data.service })
      })
      .catch(error => {
        alert(error);
      })
  };

  handleChange = (input: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      service: {
        ...this.state.service,
        [input.target.name]: input.target.value
      }
    });
  };

  submitService = (submit: FormEventHandler<HTMLFormElement>, value: void): void => {
    if (submit) submit.preventDefault();
    this.setState({ loading: true });
    const fileInputElement = document.querySelector('#images');
    const { service } = this.state

    let formData = setServiceFormData(fileInputElement, service);

    fetch(`/api/services/${ service.id }`, safeCredentialsFormData({
      method: "PUT",
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.service) return window.location.reload();
      })
      .catch(error => {
        alert("Error: " + errorObject(error));
        this.setState({ loading: false });
      });
  };

  render() {
    const { service, loading } = this.state;
    const { id, images, tags }  = service;
    
    return(
      <Router>
        <AdminNavbar />
        <main className="container-fluid">
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
          <Routes>
            <Route
              exact path={ `/admin/service/${ id }` }
              element={
                <>
                  <ImageSlider images={ images } />
                  <ServiceForm
                    loading={ loading }
                    service={ service }
                    handleChange={ this.handleChange }
                    submitService={ this.submitService }
                  />
                </>
              }
            />
            <Route
              path={ `/admin/service/${ id }/taggables` }
              element={
                <TagSelector
                  id={ id }
                />
              }
            />
            <Route
              path={ `/admin/service/${ id }/delete` }
              element={
                <DeleteService
                  id={ id }
                />
              }
            />
          </Routes>
        </main>
      </Router>
    )
  };
};

export default AdminService;