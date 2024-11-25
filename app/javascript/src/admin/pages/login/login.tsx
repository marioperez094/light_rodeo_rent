//External Imports
import React from "react";

//Components
import LoginWidget from "@adminComponents/loginWidget/loginWidget";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Stylesheets
import "./login.scss";

class Login extends React.Component {

  componentDidMount(): void {
    this.isLoggedIn();
  };

  isLoggedIn = (): void => {
    getRequest("/api/authenticated", (response: any) => {
      if (response.authenticated) return location.assign("/admin")
    })
  };

  render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="shadow-lg rounded p-4 m-4">
              <LoginWidget />
            </div>
          </div>
        </div>
      </div>
    )
  };
};

export default Login;