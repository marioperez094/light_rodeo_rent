//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import PageHeader from "@components/headers/pageHeader";
import ServiceForm from "@adminComponents/serviceForm/serviceForm";

//Functions
import { setServiceFormData, errorObject } from "@utils/utils";
import { safeCredentialsFormData, handleErrors } from "@utils/fetchHelper";

//Types
import { serviceType } from "@utils/types";

type AppProps = {};

type AppState = {
  loading: boolean;
  service: serviceType
};

class NewServiceForm extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      service: {
        english_name: "",
        spanish_name: "",
        english_description: "",
        spanish_description: "",
        dimensions: "",
      },
    }
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      service: {
        ...this.state.service,
        [e.target.name]: e.target.value
      }
    });
  };

  submitService = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const fileInputElement = document.querySelector("#images");
    const { service } = this.state;

    let formData = setServiceFormData(fileInputElement, service);

    fetch("/api/services", safeCredentialsFormData({
      method: "POST",
      body: formData
    }))
      .then(handleErrors)
      .then(data => data.service && window.location.assign(`/admin/service/${ data.service.id }`))
      .catch(error => {
        alert("Error: " + errorObject(error));
        this.setState({ loading: false });
      });
    };

  render() {
    const { loading, service } = this.state;

    return (
      <>
        <header>
          <PageHeader>Agregar Servicio</PageHeader>
        </header>
        <main className="container-fluid">
          <ServiceForm
            loading={ loading }
            service={ service }
            handleChange={ this.handleChange } 
            onSubmit={ this.submitService }
          />
        </main>
      </>
    )
  };
};

export default NewServiceForm;