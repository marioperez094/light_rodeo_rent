//External Imports
import React from "react";




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
    handleChange: Function,
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
    </div>
  )
};

export function LabeledSelector({ 
    label,
    options,
    name,
    value,
    handleChange
  } : { 
    label: string
    options: string[]
    name: string;   
    value: string;
    handleChange: Function,
  }) {
  return(
    <div className="mb-3">
      <label 
        htmlFor={ label } 
        className="form-label"
      >
          { label }
      </label>
      <select 
        className="form-control"
        id={ label }
        name={ name }
        value={ value }
        onChange={ handleChange }
      >
        { options.map((option, index) => <option value={ option } key={ index }>{ option }</option>)}
      </select>
    </div>
  )
};

export function SaveButton({ loading }: { loading: boolean }) {
  return (
    <div className="col-12 col-md-3">
      <button 
        type="submit" 
        className="btn btn-dark my-3 text-center w-100"
        disabled={ loading }
      >
        { loading ? "Guardando..." : "Guardar" }
      </button>
    </div>
  )
};