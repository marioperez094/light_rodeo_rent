//External Imports
import React, { useState } from "react";

//Functions
import { handleErrors, safeCredentials } from "@utils/fetchHelper";

type AppProps = {};

type AppStates = {
  username: string
  password: string
};

class Login extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  };

  handleChange = (input: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({ 
      ...this.state, [input.target.name]: String(input.target.value) 
    });
  };

  login = (submit: React.ChangeEvent<HTMLInputElement>):void => {
    if (submit) { submit.preventDefault(); }

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          location.assign('/admin')
        }
      })
  };



  render() {
    const { username, password } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <h6 className="text-center">Ingresar</h6>
          <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
            <form onSubmit={ this.login }>
              <input 
                name="username" 
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Nombre de usario"
                value={ username }
                onChange={ this.handleChange }
                required
              />
              <input
                name="password"
                type="password"
                className="form-control form-control-lg mb-3"
                placeholder="Contraseña"
                value={ password }
                onChange={ this.handleChange }
                required
              />
              <button
                type="submit"
                className="btn btn-success btn-block btn-lg"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default Login;