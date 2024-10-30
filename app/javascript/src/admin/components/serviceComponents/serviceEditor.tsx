//External Imports
import React, { ChangeEvent, FormEvent, useState } from "react";

//Components
import ImageSlider from "./imageSlider";
import ServiceForm from "@adminComponents/serviceForm/serviceForm";

//Functions
import { safeCredentialsFormData, handleErrors } from "@utils/fetchHelper";
import { setServiceFormData, errorObject } from "@utils/utils";

//Types
import { serviceType } from "@utils/types";

export default function ServiceEditor({ 
  loading,
  service,
  setLoading,
  fetchService,
}: { 
  loading: boolean,
  service: serviceType;
  setLoading: Function,
  fetchService: Function,
}) {
  const [serviceClone, setserviceClone] = useState(service);

  function handleChange(e: ChangeEvent<HTMLInputElement>, value: string): void {
    setserviceClone(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  function submitService(e: FormEvent<HTMLInputElement>, value: void): void {
    e.preventDefault();
    setLoading();
    const fileInputElement = document.querySelector("#images");

    let formData = setServiceFormData(fileInputElement, serviceClone);

    fetch(`/api/services/${ serviceClone.id }`, safeCredentialsFormData({
      method: "PUT",
      body: formData
    }))
      .then(handleErrors)
      .then(data => {
        if (data.service) {
          fetchService();
          setLoading();
          window.location.hash = "service"
        }
      })
      .catch(error => {
        alert("Error: " + errorObject(error));
        setLoading();
      })
  };

  const { images } = service;

  return(
    <>
      <ImageSlider images={ images } />
      <ServiceForm
        loading={ loading }
        service={ serviceClone }
        handleChange={ handleChange }
        onSubmit={ submitService }
      />
    </>
  )
};