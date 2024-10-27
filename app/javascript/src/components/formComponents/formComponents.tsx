//External Imports
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, ReactNode } from "react";

export function SubmitForm({
  children,
  onSubmit,
} : {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>
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

export function LabeledInput({ 
  name,
  label,
  value,
  type = "text",
  required = true,
  children = null,
  handleChange,
} : { 
  name: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  children?: ReactNode;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
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
        required={ required }
      />
      { children }
    </div>
  )
};

export function LabeledTextArea({ 
  name,
  label,
  value,
  children = null,
  handleChange,
} : { 
  name: string;
  label: string;
  value: string;
  children: ReactNode;
  handleChange: ChangeEventHandler<HTMLTextAreaElement>
}) {
  return (
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
        { children }
    </div>
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
  return(
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

export function LoadingButton({ 
  loading,
  text,
} : { 
  loading: boolean;
  text: string;
}) {
  return(
    <button
      type="submit"
      className="btn btn-dark my-3 text-center w-100"
      disabled={ loading }
    >
      { loading ? `${ text }ndo...` : `${ text }r` }
    </button>
  )
};

export function WordCount({ 
  minCharacters,
  maxCharacters,
  message,
} : { 
  minCharacters: number;
  maxCharacters: number;
  message: string;
}) {
  const messageLength = message.length;
  
  //Returns true if the message character count is between the min and max characters
  const meetsParameter = messageLength < minCharacters || messageLength > maxCharacters

  return(
    <div className={ `text-end ${ meetsParameter ? "text-danger" : "" }` }>{ messageLength }/{ maxCharacters }</div>
  )
};
