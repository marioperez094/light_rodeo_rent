//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import PageHeader from "@components/headers/pageHeader";
import { SubmitForm, LabeledInput } from "@components/formComponents/formComponents";
import { LoadingButton } from "@components/formComponents/formComponents";

//Functions 
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

type AppProps = {};

type AppStates = {
  username: string;
  password: string;
  loading: boolean;
};

class Login extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      ...this.state, [e.target.name]: String(e.target.value)
    });
  };

  login = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true })

    fetch("/api/sessions", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then((data) => {
        if (data.success) return location.assign("/admin")
      })
      .catch((error) => { 
        alert(error)
        this.setState({ loading: false }) 
      })
  };

  render() {
    const { username, password, loading } = this.state;

    return(
      <div className="container-fluid">
        <header>
          <PageHeader>Ingresar</PageHeader>
        </header>
        <SubmitForm onSubmit={ this.login }>
          <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
            <LabeledInput
              name="username"
              label="Nombre de usario"
              value={ username }
              handleChange={ this.handleChange }
            />
            <LabeledInput
              name="password"
              label="Contraseña"
              type="password"
              value={ password }
              handleChange={ this.handleChange }
            />
          </div>
          <div className="col-12 col-md-3 offset-md-6">
            <LoadingButton
              loading={ loading }
              text="Envia"
            />
          </div>
        </SubmitForm>
      </div>
    )
  };
};

export default Login;