//External Imports
import React from "react";

//Components
import { Navbar, ExpandableMenu, NavItem } from "./navbar";

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper"

//Stylesheets
import "./adminNavbar.scss"

export default function AdminNavbar() {
  function logout() {
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE'
    }))
      .then(handleErrors)
      .then(data => {
        if (!data.success) {
          return alert("No se pudo cerrar la sesión.")
        }
        location.assign('/admin/login')
      })
  }

  return (
    <Navbar>
      <a
        className="navbar-brand"
        href="/admin"
      >
        Light Rodeo's Rent
      </a>  
      <ExpandableMenu>
        <NavItem link={ "/admin/services" } title={ "Servicios" } />
        <NavItem link={ "/admin/tags" } title={ "Categorias" } />
        <li className="nav-item">
          <a
            className="nav-link mx-3 pointer-link"
            onClick={ logout }
          >
            Cerrar Sesión
          </a>
        </li>
      </ExpandableMenu>
    </Navbar>
  )
};

