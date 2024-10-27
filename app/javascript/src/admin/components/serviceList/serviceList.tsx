//External Imports
import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import PageHeader from "@components/headers/pageHeader";
import ProductTable from "./productTabe";
import { SubmitForm, InputButton } from "@components/formComponents/formComponents";

//Stylesheets
import "./serviceList.scss";

//Types
import { serviceType } from "@utils/types";

export default function ServiceList({ 
  services,
}: { 
  services: serviceType[]
}) {
  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<serviceType[]>(services);

  function searchByService(e: FormEvent<HTMLFormElement>, value: void): void {
    e.preventDefault();

    let serviceList = services.slice(0)
    serviceList = serviceList.filter((service) => {
      return service.spanish_name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })

    setSearchList(serviceList);
    setSearch("");
  };

  return(
    <>
      <header>
        <PageHeader>Servicios</PageHeader>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2">
              <SubmitForm onSubmit={ searchByService }>
                <InputButton
                  value={ search }
                  label="Buscar"
                  handleChange={ e => setSearch(e.target.value) }
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
        setServices={ setSearchList }
      />
    </>
  )
};