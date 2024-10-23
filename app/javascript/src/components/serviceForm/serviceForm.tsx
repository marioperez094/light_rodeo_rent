//External Imports
import React, { ChangeEvent, FormEventHandler } from "react";

//Components
import { SubmitForm, LabeledInput, LabeledTextArea, SaveButton } from "@components/formComponents/form";

//Types
import { serviceType } from "@utils/types";

export default function ServiceForm({
  service,
  loading,
  handleChange,
  submitService
  } : {
  service: serviceType;
  loading: boolean;
  handleChange: ChangeEvent<HTMLInputElement>;
  submitService: FormEventHandler<HTMLFormElement>;
}) {
  
  const { english_name, spanish_name, english_description, spanish_description, dimensions } = service;

  return(
    <SubmitForm
      onSubmit={ submitService }
    >
      <div className="shadow col-12 col-md-10 col-xl-9">      
        <LabeledInput
          label="Nombre de Servicio"
          value={ spanish_name }
          name="spanish_name"
          handleChange={ handleChange }
        />
        <LabeledInput
          label="Nombre de Servicio en Ingles"
          value={ english_name }
          name="english_name"
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
        <div className="col-12 col-md-3 offset-md-9">
          <SaveButton
            loading={ loading }
          />
        </div>
      </div>
    </SubmitForm>
  )
};