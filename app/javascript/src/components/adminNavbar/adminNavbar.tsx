//External Imports
import React from "react";

//Components
import LogoutLink from "./logoutLink";
import { ExpandableMenu, Navbar, NavItem, ExpandableButton } from "@components/navbarComponents/navbar";


//Stylesheets
import "./adminNavbar.scss"

export default function AdminNavbar() {
  return (
    <Navbar
      navbarID="adminNavbar"
    >
      <a
        className="navbar-brand"
        href="/admin"
      >
        Light Rodeo's Rent
      </a>
      <ExpandableButton />
      <ExpandableMenu>
        <ul className="navbar-nav ms-auto me-auto" id="navbarMenu">
          <NavItem 
            link="/admin/service-list" 
            title="Servicios" 
          />
          <NavItem 
            link="/admin/tags" 
            title="Categorias" 
          />
          <NavItem 
            link="/admin/homepage" 
            title="Página Principal" 
          />
          {/* On small screens logout link is part of the collapsable menu*/}
          <li className="nav-item d-md-none">
            <LogoutLink />
          </li>
        </ul>
        
        {/* On large screens logout link sits on end of screen*/}
        <ul className="navbar-nav">
          <li className="nav-item d-none d-md-block">
            <LogoutLink />
          </li>
        </ul>
      </ExpandableMenu>
    </Navbar>
  )
};

