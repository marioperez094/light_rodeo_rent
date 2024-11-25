//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import { LabeledInput } from "@components/formComponents/formComponents";
import { LoadingButton } from "@components/formComponents/formComponents";

//Functions
import { tagFields } from "@utils/formFields";
import { handleErrors } from "@utils/fetchHelper";
import { postRequest } from "@utils/fetchRequests";

//Types
import { tagType, formFields } from "@utils/types";

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
      },
    };
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      tag: {
        ...this.state.tag,
        [e.target.name]: e.target.value
      }
    });
  };

  handleCheckbox = (e: ChangeEvent<HTMLInputElement>, value: boolean): void => {
    this.setState({
      tag: {
        ...this.state.tag,
        inflatable: !this.state.tag.inflatable
      }
    });
  };

  submitTag = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();
    this.setState({ loading: true });

    postRequest("/api/tags", { tag: this.state.tag }, (response: any) => {
      handleErrors(response)
        .then((data: any) => {
          if (data.tag) {
            this.props.fetchTags();
            this.resetTags();
          }
        })
        .catch((error: any) => {
          alert(error);
          this.setState({ loading: false });
        })
    })
  };

  resetTags = (): void => {
    this.setState({
      loading: false,
      tag: {
        spanish_name: "",
        english_name: "",
        inflatable: false,
      },
    });
  };

  render() {
    const { tag, loading } = this.state;
    return(
      <form
        className="row"
        onSubmit={ this.submitTag }
      >
        { tagFields.map((field: formFields, index: number) => {
          return(
            <div className="col-12 col-md-6" key={ index }>
              <LabeledInput
                name={ field.name }
                label={ field.label }
                value={ tag[field.name] }
                handleChange={ this.handleChange }
                wordCount={ true }
              />
            </div>
          )
        })}
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-1 d-flex align-items-center justify-content-center">
              <input
                className="tag-checkbox"
                id="inflatable-category"
                type="checkbox"
                value={ tag.inflatable }
                onChange={ this.handleCheckbox }
                checked={ tag.inflatable }
              />
            </div>
            <label
              className="col-11 d-flex align-items-center justify-content-start"
              htmlFor="inflatable-category"
            >
              Es Categoria de Inflable?
            </label>
          </div>
        </div>
        <div className="col-12 col-md-2 offset-md-4">
          <LoadingButton
            loading={ loading }
            text="Guarda"
          />
        </div>
      </form>
    )
  };
};

export default TagForm;