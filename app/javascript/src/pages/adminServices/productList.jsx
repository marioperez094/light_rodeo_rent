//External Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import PageHeader from "@components/pageHeader/pageHeader";
import ProductTable from "@components/productTable/productTable";

//Functions
import { handleErrors } from "@utils/fetchHelper"

export default function ProductList() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, []);

  function fetchServices() {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => {
        setServices(data.services)
      })
  };

  return(
    <React.Fragment>
      <header className="d-flex justify-content-between align-items-center">
        <PageHeader>Servicios</PageHeader>
        <Link
          className="btn btn-dark m-3"
          to={ '/admin/servicelist/new_service' }
        >
          Agregar Servicio
        </Link>
      </header>
      <ProductTable services={ services } />
    </React.Fragment>
  )
};