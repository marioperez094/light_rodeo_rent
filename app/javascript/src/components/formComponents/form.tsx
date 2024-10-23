//External Imports
import React, { ReactNode, FormEventHandler, ChangeEventHandler} from "react";

export function SubmitForm({
    children,
    onSubmit,
  } : {
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return(
    <form 
      onSubmit={ onSubmit }
      className="row"
    >
      { children }
    </form>
  )
};

export function InputButton({
  value,
  label,
  handleChange,
  } : {
  value: string;
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={ value }
        onChange={ handleChange }
        aria-label={ label }
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-dark"
        type="submit"
        id="button-addon2"
      >
        { label }
      </button>
    </div>
  )
};

export function LabeledInput({
  required = true,
  type = "text",
  label,
  name,
  value,
  handleChange
  }: {
  required?: boolean;
  type?: string; 
  label: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return(
    <div className="mb-3">
      <label 
        htmlFor={ name }
        className="form-label"
      >
        { label }
      </label>
      <input 
        type={ type } 
        className="form-control" 
        id={ name } 
        name={ name } 
        value={ value } 
        onChange={ handleChange } 
        required = { required }
      />
      <WordCount
        min={ 3 }
        max={ 30 }
        message={ value }
      />
    </div>
  )
};

export function LabeledTextArea(
  { 
    label,
    name,
    value, 
    handleChange
  }: { 
    label: string; 
    name: string;
    value: string;
    handleChange: ChangeEventHandler<HTMLTextAreaElement>;
  }
) {
  return(
    <div className="mb-3">
      <label 
        htmlFor={ label } 
        className="form-label"
      >
        { label }
      </label>
      <textarea 
        className="form-control" 
        id={ label } 
        rows={ 3 } 
        cols={ 50 } 
        name={ name } 
        value={ value }
        onChange={ handleChange }
        required 
      />
      <WordCount
        min={ 10 }
        max={ 500 }
        message={ value }
      />
    </div>
  )
};

export function SaveButton({ loading }: { loading: boolean }) {
  return (
    <button 
      type="submit" 
      className="btn btn-dark my-3 text-center w-100"
      disabled={ loading }
    >
      { loading ? "Guardando..." : "Guardar" }
    </button>
  )
};

function WordCount({
  min,
  max,
  message,
  } : {
  min: number;
  max: number;
  message: string;
}) {
  const messageLength = message.length;
  const redText = messageLength < min || messageLength > max

  return(
    <div className={ `text-end ${ redText ? "text-danger" : "" }` }>{ messageLength }/{ max }</div>
  )
};