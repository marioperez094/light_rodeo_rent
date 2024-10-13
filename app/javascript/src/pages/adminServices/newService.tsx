//External Imports
import React from "react";

//Components
import PageHeader from "@components/pageHeader/pageHeader";
import ServiceForm from "@components/formComponents/serviceForm";

//Stylesheets
import "./adminServices.scss"

//Functions
import { errorObject } from "@utils/utils"
import { safeCredentialsFormData, safeCredentials, handleErrors } from "@utils/fetchHelper";
import { tagType, serviceType } from "../../utils/types";

type AppProps = {};

type AppStates = {
  loading: boolean;
  error: string;
  service: serviceType;
  services: tagType[];
};

class NewService extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      service: {
        english_name: "",
        spanish_name: "",
        english_description: "",
        spanish_description: "",
        dimensions: "",
      },
      services: []
    }
  };

  handleChange = (input: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      service: {
        ...this.state.service,
        [input.target.name]: input.target.value
      }
    });
  };

  submitService = (submit) => {
    if (submit) submit.preventDefault();
    this.setState({ loading: true });
    const fileInputElement = document.querySelector('#images');
    const { english_name, spanish_name, english_description, spanish_description, dimensions } = this.state.service

    let formData = new FormData();
    for (let index = 0; index < fileInputElement.files.length; index++) {
      formData.append('service[images][]', fileInputElement.files[index]);
    };

    formData.set('service[english_name]', english_name);
    formData.set('service[spanish_name]', spanish_name);
    formData.set('service[english_description]', english_description);
    formData.set('service[spanish_description]', spanish_description);
    formData.set('service[dimensions]', dimensions);

    fetch("/api/services", safeCredentialsFormData({
      method: "POST",
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.service) return window.location.assign(`/admin/service/${data.service.id}`)
      })
      .catch(error => {
        this.setState({
          error: errorObject(error),
          loading: false,
        })
      })
  };

  render() {
    const { loading, error, services, service } = this.state;
    
    return (
      <React.Fragment>
        <PageHeader>Agregar Servicio</PageHeader>
        <main className="container-fluid" id="product-form">
          <div className="row">
            <ServiceForm 
              loading={ loading }
              service={ service }
              handleChange={ this.handleChange }
              submitService={ this.submitService }
            />
            <p className="text-danger">{ error }</p>
          </div>
        </main>
      </React.Fragment>
    )
  }
};

export default NewService;