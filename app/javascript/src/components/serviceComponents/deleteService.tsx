//External Imports
import React from "react";

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

export default function DeleteService({ id } : { id: number }) {
  
  function deleteService(): void {
    fetch(`/api/services/${ id }`, safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) return window.location.assign("/admin/service-list");
      })
  };

  return(
    <div className="text-center my-3">
      <h5>¿Gustarias eliminar este servicio de forma <span className="text-danger">permanente</span>?</h5>
      <button 
        className="btn btn-danger"
        onClick={ deleteService }
      >Borrar</button>
    </div>
  )
};