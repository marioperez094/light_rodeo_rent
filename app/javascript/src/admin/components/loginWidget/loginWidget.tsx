//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import { LabeledInput, LoadingButton } from "@components/formComponents/formComponents";

//Functions
import { postRequest } from "@utils/fetchRequests";
import { handleErrors } from "@utils/fetchHelper";

//Const
import { loginFields } from "@utils/formFields";

//Types
import { userType, formFields } from "@utils/types";

type AppProps = {};

type AppStates = {
  loading: boolean;
  user: userType;
};

class LoginWidget extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      user: {
        username: "",
        password: "",
      },
    };
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      user: {
        ...this.state.user, 
        [e.target.name]: String(e.target.value)
      },
    });
  };

  login = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState({ loading: true })

    postRequest("/api/sessions", { user: this.state.user }, (response: any) => {
      handleErrors(response)
        .then((data: any) => {
          data.success && location.assign("/admin")
        })
        .catch((error: any) => {
          alert(error);
          this.setState({ loading: false });
        });
    });
  };

  render() {
    const { user, loading } = this.state;

    return(
      <section>
        <h1 className="text-center">Ingresar</h1>
        <form
          onSubmit={ this.login }
          className="py-4"
        >
          { loginFields.map((field: formFields, index: number) => {
            return (
              <LabeledInput
                key={ index }
                name={ field.name }
                label={ field.label }
                type={ field.type }
                autoComplete={ field.autoComplete }
                value={ user[field.name] }
                handleChange={ this.handleChange } 
              />
            )
          })}
          <LoadingButton
            loading={ loading }
            text="Envia"
          />
        </form>
      </section>
    )
  };
};

export default LoginWidget;