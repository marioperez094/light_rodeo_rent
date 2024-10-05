//External Imports
import React from "react";
import { Link } from "react-router-dom";

//Components
import PageHeader from "@components/pageHeader/pageHeader";
import ProductTable from "@components/productTable/productTable";

export default function ProductList() {
  return(
    <React.Fragment>
      <header className="d-flex justify-content-between align-items-center">
        <PageHeader>Servicios</PageHeader>
        <Link
          className="btn btn-dark m-3"
          to={ '/admin/services/new_service' }
        >
          Agregar Servicio
        </Link>
      </header>
      <ProductTable />
    </React.Fragment>
  )
};