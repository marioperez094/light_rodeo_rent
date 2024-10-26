//External Imports
import React from "react";

//Components

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper"

//Stylesheets
import "./adminNavbar.scss"

export default function AdminNavbar({ page } : { page: string }) {
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
  };

  console.log(page)

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light navbar-dark bg-dark"
    >
      <a
        className="navbar-brand"
        href="/admin"
      >
        Light Rodeo's Rent
      </a>  
      <ExpandableMenu>
        <NavItem link={ "/admin/servicelist" } title={ "Servicios" } active={ page === "serviceList" }/>
        <NavItem link={ "/admin/tags" } title={ "Categorias" } active={ page === "tags" }/>
        <li className="nav-item">
          <a
            className="nav-link mx-3 pointer-link"
            onClick={ logout }
          >
            Cerrar Sesión
          </a>
        </li>
      </ExpandableMenu>
    </nav>
  )
};

