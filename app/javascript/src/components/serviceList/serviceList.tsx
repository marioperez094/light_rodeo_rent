//External Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import PageHeader from "@components/headers/pageHeader";
import { SubmitForm, InputButton } from "@components/formComponents/form";
import ProductTable from "./productTable";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Stylesheets
import "./serviceList.scss";

export default function ServiceList() {
  const [services, setServices] = useState([])
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchService();
  }, []);

  function fetchService() {
    fetch("/api/services")
      .then(handleErrors)
      .then(data => {
        setServices(data.services);
        setSearchList(data.services);
      })
  };

  function sortByService() {
    console.log(services)
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

  return (
    <>
      <header>
        <PageHeader>Servicios</PageHeader>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2">
              <SubmitForm onSubmit={ console.log("hi") }>
                <InputButton 
                  value={ search }
                  label="Buscar"
                  handleChange={ (e) => setSearch(e.target.value) }
                />
              </SubmitForm>
            </div>
            <div className="col-2 d-flex align-items-start justify-content-end">
              <Link
                id="new-service-button"
                className="btn btn-dark"
                to={ "/admin/service-list/new-service" }
              >
                Agregar Servicio
              </Link>
            </div>
          </div>
        </div>
      </header>
      <ProductTable
        services={ searchList } 
        sortByService={ sortByService }
        sortByTag={ sortByTag }
      />
    </>
  )
};