//External Imports
import React, { ChangeEvent, FormEvent, useState } from "react";

//Components
import PageHeader from "@components/headers/pageHeaders";
import ProductTable from "./productTable";
import ServiceSearch from "./serviceSearch";

//Types
import { serviceType } from "@utils/types";
import { Link } from "react-router-dom";

type AppProps = {
  services: serviceType[];
};

type AppStates = {
  search: string;
  searchList: serviceType[];
}

class ServiceList extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      search: "",
      searchList: this.props.services
    };
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      search: String(e.target.value)
    })
  };

  setSearchList = (services: serviceType[]): void => {
    this.setState({
      searchList: services
    });
  };

  searchByService = (e: FormEvent<HTMLFormElement>, value: void): void => {
    e.preventDefault();

    let searchList = JSON.parse(JSON.stringify(this.props.services));

    searchList = searchList.filter((service: serviceType) => {
      return service.spanish_name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
    }); 

    this.setSearchList(searchList)
  };

  render() {
    const { search, searchList } = this.state;

    return(
      <>
        <PageHeader title="Servicios">
          <section className="container-fluid">
            <div className="row">
              <ServiceSearch
                search={ search }
                handleChange={ this.handleChange }
                submitSearch={ this.searchByService }
              />
              <div className="col-2 d-flex align-items-start justify-content-end">
                <Link
                  id="new-service-button"
                  className="btn btn-dark"
                  to="/admin/service-list/new-service"
                >
                  Agregar Servicio
                </Link>
              </div>
            </div>
          </section>
        </PageHeader>
        <ProductTable
          services={ searchList }
          setServices= { this.setSearchList }
        />
      </>
    )
  }
};

export default ServiceList;