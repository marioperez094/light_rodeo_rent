//External Imports
import React, { ChangeEventHandler } from "react";

export function LabeledInput({
  name,
  label,
  value,
  type = "text",
  required = true,
  autoComplete = "OFF",
  wordCount = false,
  handleChange,
}: {
  name: string;
  label: string;
  value: string;
  type?: string;
  required: boolean;
  autoComplete?: string;
  wordCount?: boolean;
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
        autoComplete={ autoComplete }
        onChange={ handleChange }
        required={ required }
      />
      { wordCount && 
        <WordCount
          minCharacters={ 3 }
          maxCharacters={ 30 }
          message={ value } 
        />
      }
    </div>
  )
};

export function LabeledTextArea({
  name,
  label,
  value, 
  required = true,
  handleChange,
}: {
  name: string;
  label: string;
  value: string;
  required: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
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
        required={ required }
      />
      <WordCount
        minCharacters={ 10 }
        maxCharacters={ 500 }
        message={ value } 
      />
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
        aria-label={ label }
        aria-describedby="button-addon2"
        onChange={ handleChange }
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
}: {
  loading: boolean;
  text: string;
}) {
  return(
    <button
      type="submit"
      className="btn btn-dark my-3 text-center w-100"
      disabled={ loading }
    >
      { loading? `${ text }ndo...` : `${ text }r` }
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