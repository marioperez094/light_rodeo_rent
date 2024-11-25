//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import ServiceForm from "./serviceForm";
import PageHeader from "@components/headers/pageHeaders";

//Functions
import { setServiceFormData } from "@utils/utils";
import { postFormRequest } from "@utils/fetchRequests";
import { handleErrors } from "@utils/fetchHelper";

//Types
import { serviceType } from "@utils/types";

type AppProps = {};

type AppStates = {
  loading: boolean;
  service: serviceType;
};

class NewServiceForm extends React.Component<AppProps, AppStates> {
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
    };
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

    postFormRequest("/api/services", formData, (response: any) => {
      handleErrors(response)
        .then((data: any) => data.service && window.location.assign(`/admin/service/${ data.service.id }`))
        .catch((error: any) => {
          alert(error);
          this.setState({ loading: false })
        })
    });
  };

  render() {
    const { loading, service } = this.state;

    return(
      <>
        <PageHeader title="Agregar Servicio" />
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
  }
};

export default NewServiceForm;