//External Imports
import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//Components
import ProductBody from "./productBody";
import NoListings from "@components/headers/noListings";

//Functions
import { sortByServices, sortByTags } from "@utils/utils";

//Types
import { serviceType } from "@utils/types";

export default function ProductTable({ 
  services,
  setServices
}: { 
  services: serviceType[];
  setServices: Dispatch<SetStateAction<serviceType>>;
}) {

  if (services.length === 0) return <NoListings listing="de servicios" />;

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th 
            scope="col"
            onClick={ () => setServices(sortByServices(services)) }
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
            onClick={ () => setServices(sortByTags(services)) }
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