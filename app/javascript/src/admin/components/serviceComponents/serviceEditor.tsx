//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import ImageSlider from "./imageSlider";
import ServiceForm from "@adminComponents/serviceForm/serviceForm";
import PageHeader from "@components/headers/pageHeaders";

//Functions
import { setServiceFormData } from "@utils/utils";
import { putFormRequest } from "@utils/fetchRequests";
import { handleErrors } from "@utils/fetchHelper";

//Types
import { serviceType } from "@utils/types";

type AppProps = {
  service: serviceType;
  fetchService: Function;
};

type AppStates = {
  service: serviceType;
  loading: boolean;
};

class ServiceEditor extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      service: this.props.service,
      loading: false,
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

    putFormRequest(`/api/services/${ service.id }`, formData, (response: any) => {
      handleErrors(response)
        .then((data: any) => { if (data.service) {
          this.props.fetchService();
          this.setState({ loading: false });
          window.location.hash = "admin_service"
        }})
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
        <PageHeader title={ this.props.service.spanish_name } />
        <ImageSlider images={ service.images } />
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

export default ServiceEditor;