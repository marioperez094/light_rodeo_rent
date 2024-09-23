//External Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Components
import Navbar from "@components/navbar/navbar";
import { ExpandableMenu, NavItem } from "@components/navbar/navbar";
import Calendar from "@components/calendar/calendar";

//Functions
import { handleErrors, safeCredentials } from "@utils/fetchHelper";

//Stylesheets
import "./admin.scss";

type AppProps = {};

type AppStates = {
  authenticated: boolean
};

class Admin extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      authenticated: false
    };
  };

  componentDidMount(): void {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        if (!data.authenticated) {
          location.assign('/admin/login')
        }
        this.setState({ authenticated: data.authenticated })
      })
  }

  logout = () => {
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE'
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          location.assign('/admin/login')
        }
      })
  }

  render() {
    const { authenticated } = this.state;

    if (!authenticated) return

    return (
      <Router>
        <Navbar>
          <a
            className="navbar-brand"
            href="/admin"
          >
            Light Rodeo's Rent
          </a>  
          <ExpandableMenu>
            <NavItem link={ "/admin/servicios" } title={ "Servicios" } />
            <NavItem link={ "/admin/categorias" } title={ "Categorias" } />
            <li className="nav-item">
              <a
                className="nav-link mx-3 pointer-link"
                onClick={ this.logout }
              >
                Cerrar Sesión
              </a>
            </li>
          </ExpandableMenu>
        </Navbar>
        <Calendar />
      </Router>
    )
  }
};

export default Admin;