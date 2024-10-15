//External Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import PageHeader from "@components/pageHeader/pageHeader";
import ProductTable from "@components/productTable/productTable";
import { LabeledInput } from "@components/formComponents/formComponents";

//Functions
import { handleErrors } from "@utils/fetchHelper";

export default function ProductList() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchServices()
  }, []);

  function fetchServices() {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => {
        setServices(data.services)
        setSearchList(data.services)
      })
  };

  function sortByService() {
    let serviceList = services.slice(0);
    serviceList = serviceList.sort((a, b) => { return a.spanish_name < b.spanish_name ? -1 : 1 })
    setSearchList(serviceList);
  };

  function sortByTag() {
    let serviceList = services.slice(0)
    serviceList = serviceList.sort((a, b) => {
      if (a.tags[0] === undefined) {
        return -1
      } 
      else if (b.tags[0] === undefined) {
        return 1
      }
      return a.tags[0].spanish_name < b.tags[0].spanish_name ? -1 : 1
    })
    setSearchList(serviceList)
  };

  function searchByService() {
    let serviceList = services.slice(0)
    serviceList = serviceList.filter((service) => {
      return service.spanish_name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })

    setSearchList(serviceList);
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
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={ search } 
          onChange={ (e) => setSearch(e.target.value) }
          aria-label="Search bar" 
          aria-describedby="button-addon2" 
        />
        <button 
          className="btn btn-outline-secondary" 
          type="button" 
          id="button-addon2"
          onClick={ () => searchByService() }
        >
          Buscar
          </button>
      </div>
      <ProductTable 
        services={ searchList }
        sortByService={ sortByService }
        sortByTag={ sortByTag }
      />
    </React.Fragment>
  )
};