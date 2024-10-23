//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//Components
import NoListings from "@components/headers/noListings";
import ProductBody from "./productBody";

//Types
import { serviceType } from "@utils/types";

export default function ProductTable({
  services,
  sortByService,
  sortByTag
  } : {
  services: serviceType[];
  sortByService: Function;
  sortByTag: Function;  
}) {

  if (services.length === 0) return (<NoListings listing="servicios" />);
  
  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th 
            scope="col"
            onClick={ () => sortByService() }
          >
            Nombre
            <FontAwesomeIcon
              icon={ faArrowDown }
              className="ps-1"
            />
          </th>
          <th scope="col">Descripcion</th>
          <th scope="col">Dimensiones</th>
          <th 
            scope="col"
            onClick={ () => sortByTag() }
          >
            Tipo de Servicio
            <FontAwesomeIcon
              icon={ faArrowDown }
              className="ps-1"
            />
          </th>
        </tr>
      </thead>
      <tbody>
      { services.map((service) => {
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