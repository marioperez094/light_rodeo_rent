//External Imports
import React, { ChangeEventHandler, FormEventHandler } from "react";

//Components
import { InputButton } from "@components/formComponents/formComponents";

export default function ServiceSearch({ 
  search,
  handleChange,
  submitSearch,
}: { 
  search: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  submitSearch: FormEventHandler<HTMLFormElement>;
}) {
  return(
    <form 
      className="col-12 col-md-8 offset-md-2"
      onSubmit={ submitSearch }
    >
      <InputButton
        value={ search }
        label="Buscar"
        handleChange={ handleChange }
      />
    </form>
  )
};