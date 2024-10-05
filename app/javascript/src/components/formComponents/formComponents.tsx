//External Imports
import React from "react";

export function LabeledTextInput(
  {
    label,
    type = "text",
    name, 
    value,
    handleChange
  }: {
    label: string;
    type?: string;
    name: string;
    value: string;
    handleChange: Function;
  }
) {
  return (
    <div className="mb-3">
      <label 
        htmlFor={ label } 
        className="form-label"
      >
        { label }
      </label>
      <input 
        type={ type } 
        className="form-control" 
        id={ label } 
        name={ name } 
        value={ value } 
        onChange={ handleChange } 
        required 
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