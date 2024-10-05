//External Imports
import React from "react"

//Components
import { LabeledTextInput, LabeledTextArea, LabeledSelector } from "@components/formComponents/formComponents";

//Functions
import { services } from "@utils/services";

const spanishServices: string[] = Object.keys(services).map(service => services[service]["Espanol"])

export default function ServiceForm(
  {
    english_name,
    spanish_name,
    english_description,
    spanish_description,
    dimensions, 
    service_type,
    handleChange
  }: {
    english_name: string;
    spanish_name: string;
    english_description: string;
    spanish_description: string;
    dimensions: string;
    service_type: string;
    handleChange: Function
  }
) {
  return(
    <form className="col-12 col-md-10 col-xl-9">
      <LabeledTextInput 
        label="Nombre de Servicio" 
        value={ english_name } 
        name={ "english_name" } 
        handleChange={ handleChange } 
      />
      <LabeledTextInput 
        label="Nombre de Servicio en Ingles" 
        value={ spanish_name } 
        name={ "spanish_name" } 
        handleChange={ handleChange } 
      />
      <LabeledTextArea 
        label="Descripcion de Servicio" 
        value={ english_description } 
        name={ "english_description" } 
        handleChange={ handleChange } 
      />
      <LabeledTextArea 
        label="Descripcion de Servicio en Ingles" 
        value={ spanish_description } 
        name={ "spanish_description" } 
        handleChange={ handleChange } 
      />
      <LabeledTextInput 
        label="Dimensiones" 
        value={ dimensions } 
        name={ "dimensions" } 
        handleChange={ handleChange } 
      />
      <LabeledSelector 
        label="Tipo de Servicio" 
        options={ spanishServices }
        value={ service_type } 
        name={ "service_type" } 
        handleChange={ handleChange } 
      />
      <button type="submit" className="btn btn-dark my-3 text-center">Guardar</button>
    </form>
  )
}