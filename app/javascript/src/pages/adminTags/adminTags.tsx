//External Imports
import React from "react";

//Components
import AdminNavbar from "@components/adminNavbar/adminNavbar";
import PageHeader from "@components/headers/pageHeader";
import TagTable from "@components/tagTable/tagTable";
import { LabeledInput, SaveButton } from "@components/formComponents/form";

//Functions
import { errorObject } from "@utils/utils"
import { safeCredentials, handleErrors } from "@utils/fetchHelper"

type AppProps = {};

type AppStates = {
  loading: boolean;
  error: string;
  spanish_name: string;
  english_name: string;
  inflatable: boolean;
};

class AdminTags extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      error: "",
      spanish_name: "",
      english_name: "",
      inflatable: false,
    }
  };

  handleChange = (input: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      ...this.state, [input.target.name]: String(input.target.value)
    });
  };

  handCheckbox = (input: React.ChangeEvent<HTMLInputElement>, value: boolean): void => {
    this.setState({
      inflatable: !this.state.inflatable
    })
  }

  submitTag = (submit) => {
    if (submit) submit.preventDefault();
    this.setState({ loading: true });
  
    fetch("/api/tags", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        spanish_name: this.state.spanish_name,
        english_name: this.state.english_name,
        inflatable: this.state.inflatable
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.tag) return window.location.reload();
      })
      .catch(error => {
        this.setState({
          error: errorObject(error),
          loading: false
        })
      })
  };

  render() {
    const { loading, error, english_name, spanish_name, inflatable } = this.state;
    return (
      <React.Fragment>
        <AdminNavbar />
        <PageHeader>Categorias de Inflables</PageHeader>
        <div className="container-fluid">
          <form onSubmit={ this.submitTag } className="row">
            <div className="col-md-6">
              <LabeledInput
                label="Categoria"
                value={ spanish_name }
                name="spanish_name"
                handleChange={ this.handleChange }
              />
            </div>
            <div className="col-md-6">
              <LabeledInput
                label="Categoria en Ingles"
                value={ english_name }
                name="english_name"
                handleChange={ this.handleChange } 
              />
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-1 d-flex align-items-center justify-content-center">
                  <input
                    className="tag-checkbox"
                    type="checkbox"
                    value={ inflatable }
                    onChange={ this.handCheckbox }
                  />
                </div>
                <div className="col-11 d-flex align-items-center justify-content-start">
                    Es categoria de inflable?
                  </div>
              </div>
            </div>
            <div className="col-12 col-md-3 offset-md-9">
              <SaveButton 
                loading={ loading }
              />
            </div>
          </form>
          <p className="text-danger">{ error }</p>
        </div>
        <TagTable
            disabled={ true }
          />
      </React.Fragment>
    )
  }
};

export default AdminTags;