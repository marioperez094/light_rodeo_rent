//External Imports
import React, { ChangeEvent, ChangeEventHandler, FormEvent } from "react";

//Components
import { SubmitForm, LabeledInput, LoadingButton, WordCount } from "@components/formComponents/formComponents";

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils";

//Types
import { tagType } from "@utils/types";

type AppProps = {
  fetchTags: Function;
};

type AppStates = {
  loading: boolean;
  tag: tagType;
}

class TagForm extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      tag: {
        spanish_name: "",
        english_name: "",
        inflatable: false,
      }
    }
  };

  
  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      tag: {
        ...this.state.tag,
        [e.target.name]: e.target.value
      }
    })
  };

  handleCheckbox = (e: ChangeEventHandler<HTMLInputElement>, value: boolean): void => {
    this.setState({
      tag: {
        ...this.state.tag,
        inflatable: !this.state.tag.inflatable
      }
    })
  };

  submitTag = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();
    this.setState({ loading: true});

    const{ tag } = this.state;
    fetch("/api/tags", safeCredentials({
      method: "POST",
      body: JSON.stringify({ tag })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.tag) {
          this.props.fetchTags();
          this.setState({ 
            loading: false, 
            tag: {
              spanish_name: "",
              english_name: "",
              inflatable: false,
          }});
        }})
      .catch(error => {
        alert("Error: " + errorObject(error));
        this.setState({ loading: false })
      })
  };

  render() {
    const { tag, loading } = this.state;
    const { spanish_name, english_name, inflatable } = tag;

    return(
      <SubmitForm onSubmit={ this.submitTag }>
        <div className="col-12 col-md-6">
          <LabeledInput
            label="Categoria"
            name="spanish_name"
            value={ spanish_name }
            handleChange={ this.handleChange }
          >
            <WordCount
              minCharacters={ 3 }
              maxCharacters={ 10 }
              message={ spanish_name }
            />
          </LabeledInput>
        </div>
        <div className="col-12 col-md-6">
          <LabeledInput
            label="Categoria en Ingles"
            name="english_name"
            value={ english_name }
            handleChange={ this.handleChange }
          >
            <WordCount
              minCharacters={ 3 }
              maxCharacters={ 10 }
              message={ english_name }
            />
          </LabeledInput>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-1 d-flex align-items-center justify-content-center">
              <input
                className="tag-checkbox"
                id="inflatable-category"
                type="checkbox"
                value={ inflatable }
                onChange={ this.handleCheckbox }
              />
            </div>
            <label 
              className="col-11 d-flex align-items-center justify-content-start"
              htmlFor="inflatable-category"
            >
              Es categoria de inflable?
            </label>
          </div>
        </div>
        <div className="col-12 col-md-3 offset-md-9">
          <LoadingButton
            loading={ loading }
            text="Guarda"
          />
        </div>
      </SubmitForm>
    )
  }
};

export default TagForm;