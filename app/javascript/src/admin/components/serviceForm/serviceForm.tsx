//External Imports
import React, { ChangeEvent, FormEvent } from "react";

//Components
import { SubmitForm, LabeledInput, LabeledTextArea, WordCount, LoadingButton } from "@components/formComponents/formComponents";

//Types
import { serviceType } from "@utils/types";

export default function ServiceForm({ 
  loading,
  service,
  handleChange,
  onSubmit,
} : { 
  loading: boolean;
  service: serviceType;
  handleChange: ChangeEvent<HTMLInputElement>;
  onSubmit: FormEvent<HTMLFormElement>;
}) {
  const { english_name, spanish_name, english_description, spanish_description, dimensions } = service;
  
  return(
    <SubmitForm onSubmit={ onSubmit }>
      <div className="shadow col-12 col-md-10 col-xl-9">
        <LabeledInput
          label="Nombre de Servicio"
          value={ spanish_name }
          name="spanish_name"
          handleChange={ handleChange }
        >
          <WordCount
            minCharacters={ 3 }
            maxCharacters={ 30 }
            message={ spanish_name }
          />
        </LabeledInput>
        <LabeledInput
          label="Nombre de Servicio en Ingles"
          value={ english_name }
          name="english_name"
          handleChange={ handleChange }
        >
          <WordCount
            minCharacters={ 3 }
            maxCharacters={ 30 }
            message={ english_name }
          />
        </LabeledInput>
        <LabeledTextArea
          label="Descripcion de Servicio"
          value={ spanish_description }
          name="spanish_description"
          handleChange={ handleChange }
        >
          <WordCount
            minCharacters={ 10 }
            maxCharacters={ 500 }
            message={ spanish_description }
          />
        </LabeledTextArea>
        <LabeledTextArea
          label="Descripcion de Servicio en Ingles"
          value={ english_description }
          name="english_description"
          handleChange={ handleChange }
        >
          <WordCount
            minCharacters={ 10 }
            maxCharacters={ 500 }
            message={ english_description }
          />
        </LabeledTextArea>
        <LabeledInput
          label="Dimensiones"
          value={ dimensions }
          name="dimensions"
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
          <LoadingButton
            text={ "Guarda" }
            loading={ loading }
          />
        </div>  
      </div>
    </SubmitForm>
  )
};