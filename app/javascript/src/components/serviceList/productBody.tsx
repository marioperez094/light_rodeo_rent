//External Imports
import React from "react";

//Types
import { serviceType } from "@utils/types";

export default function ProductBody({ service }: { service: serviceType }) {
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
};