//External Imports
import React from "react";

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

export default function LogoutLink() { 
  function logout(): void {
    fetch("/api/sessions", safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (!data.success) {
          return alert("No se pudo cerrar la sesión.")
        }
        //Redirects to login page on successful logout
        location.assign("/admin/login")
      });
  };

  return(
    <a
      className="nav-link me-auto mx-3 pointer-link"
      onClick={ logout }
    >
      Cerrar Sesión
    </a>
  )
};