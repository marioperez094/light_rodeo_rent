//External Imports
import React, { ReactNode } from "react";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./productTable.scss"

export default function ProductTable({ services } : { services: serviceType[] }) {

  if (services.length === 0) return (<p>No ahi servicios</p>)


  return (
    <table className="table table-hover product-list">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Dimensiones</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => {
          return(
            <tr key={ service.id } onClick={() => window.location.assign(`/admin/service/${ service.id }`)}>
              <th scope="row"></th>
              <td>{ service.spanish_name }</td>
              <td>{ service.spanish_description }</td>
              <td>{ service.dimensions }</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
};