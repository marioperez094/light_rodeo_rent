//External Imports
import React from "react";

//Functions
import { deleteRequest } from "@utils/fetchRequests";

export default function DeleteService({ id } : { id: number }) {
  
  function deleteService(): void {
    deleteRequest(`/api/services/${ id }`, (response: any) => {
      response.success && window.location.assign("/admin/service-list");
    });
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