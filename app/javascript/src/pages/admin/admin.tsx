//External Imports
import React from "react";

//Components
import Navbar from "@components/navbar/navbar";
import { ExpandableMenu, NavItem } from "@components/navbar/navbar";

//Stylesheets
import "./admin.scss";

type AppProps = {};

type AppStates = {};

class Admin extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
    };
  };

  render() {

    return (
      <Navbar>
        <a 
          className="navbar-brand"
          href="/admin">
            Light Rodeo's Rent
          </a>
        <ExpandableMenu>
          <NavItem link={ "/admin/productos" } title={ "Productos" } />
        </ExpandableMenu>
      </Navbar>
    )
  }
};

export default Admin;