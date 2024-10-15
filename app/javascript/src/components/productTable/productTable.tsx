//External Imports
import React, { ReactNode } from "react";

//Types
import { serviceType } from "@utils/types";

//Stylesheets
import "./productTable.scss"

export default function ProductTable({ 
  services,
  sortByService,
  sortByTag
} : { 
  services: serviceType[];
  sortByService: Function;
  sortByTag: Function;
}) {

  if (services.length === 0) return (<p>No ahi servicios</p>)


  return (
    <table className="table table-hover product-list">
      <thead>
        <tr>
          <th scope="col" onClick={ () => sortByService() }>Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Dimensiones</th>
          <th scope="col" onClick={ () => sortByTag() }>Tipo de Servicio</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => {
          return(
            <React.Fragment key={ service.id }>
              <ProductBody service={ service } />
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
};

function ProductBody({ service }: { service: serviceType }) {
  const { id, spanish_name, spanish_description, dimensions } = service;

  const tag = service.tags[0] ? service.tags[0].spanish_name : null;

  return (
    <tr className="service-cell" onClick={() => window.location.assign(`/admin/service/${ id }`)}>
      <td>{ spanish_name }</td>
      <td className="service-description">{ spanish_description }</td>
      <td>{ dimensions }</td>
      <td>{ tag }</td>
    </tr>
  )
}