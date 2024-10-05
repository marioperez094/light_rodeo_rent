//External Imports
import React from "react";

//Components
import PageHeader from "@components/pageHeader/pageHeader";
import ServiceForm from "@components/formComponents/serviceForm";

//Stylesheets
import "./adminServices.scss"

type AppProps = {};

type AppStates = {
  english_name: string;
  spanish_name: string;
  english_description: string;
  spanish_description: string;
  dimensions: string;
  service_type: string;
};

class NewService extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      english_name: "",
      spanish_name: "",
      english_description: "",
      spanish_description: "",
      dimensions: "",
      service_type: "Tacos"
    }
  }

  handleChange = (input: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      ...this.state, [input.target.name]: String(input.target.value)
    }, () => console.log(this.state));
  };

  render() {
    const { english_name, spanish_name, english_description, spanish_description, dimensions, service_type } = this.state;
    
    return (
      <React.Fragment>
        <PageHeader>Agregar Servicio</PageHeader>
        <main className="container-fluid" id="product-form">
          <div className="row">
            <ServiceForm 
              english_name={ english_name }
              spanish_name={ spanish_name }
              english_description={ english_description }
              spanish_description={ spanish_description }
              dimensions= { dimensions }
              service_type={ service_type }
              handleChange={ this.handleChange }
            />
          </div>
        </main>
      </React.Fragment>
    )
  }
};

export default NewService;