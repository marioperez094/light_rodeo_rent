//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//Components
import NoListings from "@components/headers/noListings";

//Types
import { serviceType, tagType } from "@utils/types";

//Utils
import { sortByServices, sortByTags } from "@utils/utils";

export default function ProductTable({
  services,
  setServices,
} : {
  services: serviceType[];
  setServices: Function;
}) {

  function sortServices(sortType: string) {
    let serviceList = JSON.parse(JSON.stringify(services));

    if (sortType === "name") {
      serviceList = sortByServices(serviceList);
      return setServices(serviceList);
    }

    serviceList = sortByTags(serviceList);
    return setServices(serviceList);
  };

  if (services.length === 0) return <NoListings listing="de servicios" />;

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th
            scope="col"
            onClick={ () => sortServices("name") }
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
            onClick={ () => sortServices("tags") }
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

function ProductBody({ service } : { service: serviceType }) {
  const { id, spanish_name, spanish_description, dimensions } = service;
  const tag = service.tags[0]?.spanish_name;

  return( 
    <tr 
      className="service-cell"
      onClick={ () => window.location.assign(`/admin/service/${ id }`) }
    >
      <td>{ spanish_name }</td>
      <td className="service-description">{ spanish_description }</td>
      <td>{ dimensions }</td>
      <td>{ tag }</td>
    </tr> 
  )
};