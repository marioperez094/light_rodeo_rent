//External Imports
import React, { ReactNode } from "react";

export default function ProductTable({ children } : { children: ReactNode }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Dimensiones</th>
          <th scope="col">Fecha disponible</th>
        </tr>
      </thead>
    </table>
  )
};