//External Imports
import React, { ChangeEventHandler, FormEventHandler } from "react";

//Components
import { LabeledInput, LabeledTextArea, LoadingButton } from "@components/formComponents/formComponents";

//Functions
import { serviceFields } from "@utils/formFields";

//Types
import { serviceType, formFields } from "@utils/types";

export default function ServiceForm({
  loading,
  service,
  handleChange,
  onSubmit,
} : { 
  loading: boolean;
  service: serviceType;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  
  return(
    <section className="shadow col-12 col-md-10 col-xl-9">
      <form
        className="p-4"
        onSubmit={ onSubmit }
      >
        { serviceFields.map((field: formFields, index: number) => {
          return (
            <React.Fragment key={ index }>
              { field.textArea 
                ? <LabeledTextArea
                    name={ field.name }
                    label={ field.label }
                    value={ service[field.name] }
                    handleChange={ handleChange }
                    wordCount={ field.wordCount } 
                  />
                : <LabeledInput
                    name={ field.name }
                    label={ field.label }
                    value={ service[field.name] }
                    handleChange={ handleChange }
                    wordCount={ field.wordCount } 
                    required={ field.required }
                  />
              }
            </React.Fragment>
          )
        })}
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
        <div className="col-12 col-md-2 offset-md-10">
          <LoadingButton
            loading={ loading }
            text="Guarda"
          /> 
        </div>
      </form>
    </section>
  )
};