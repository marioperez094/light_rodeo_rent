//External Imports
import React from "react"

//Components
import { LabeledInput, LabeledTextArea, LabeledSelector } from "@components/formComponents/formComponents";

//Functions
import { services } from "@utils/services";
import { SaveButton } from "./formComponents";

//Types
import { tagType, serviceType } from ".@utils/types";

const spanishServices: string[] = Object.keys(services).map(service => services[service]["Espanol"])

export default function ServiceForm(
  {
    service,
    loading,
    handleChange,
    submitService,
  }: {
    service: serviceType
    loading: boolean;
    handleChange: Function;
    submitService: Function;
  }
) {
  
  const { english_name, spanish_name, english_description, spanish_description, dimensions, service_type } = service;
  return(
    <form onSubmit={ submitService } className="col-12 col-md-10 col-xl-9">
      <LabeledInput 
        label="Nombre de Servicio" 
        value={ spanish_name } 
        name={ "spanish_name" } 
        handleChange={ handleChange } 
      />
      <LabeledInput 
        label="Nombre de Servicio en Ingles" 
        value={ english_name } 
        name={ "english_name" } 
        handleChange={ handleChange } 
      />
      <LabeledTextArea 
        label="Descripcion de Servicio" 
        value={ spanish_description } 
        name={ "spanish_description" } 
        handleChange={ handleChange } 
      />
      <LabeledTextArea 
        label="Descripcion de Servicio en Ingles" 
        value={ english_description } 
        name={ "english_description" } 
        handleChange={ handleChange } 
      />
      <LabeledInput 
        label="Dimensiones" 
        value={ dimensions } 
        name={ "dimensions" } 
        handleChange={ handleChange } 
        required={ false }
      />

      <div className="mb-3">
        <label
          htmlFor="images"
          className="form-label"
        >
          Añadir imágenes
        </label>
        <input
          className="form-control"
          type="file"
          id="images"
          name="images"
          accept="images/*"
          multiple
        />
      </div>
      <SaveButton
        loading={ loading } 
      />
    </form>
  )
};