//External Imports
import React, { ChangeEventHandler } from "react";

//Components
import NoListings from "@components/headers/noListings";
import Tag from "./tag";

//Types
import { tagType } from "@utils/types";

export default function TagTable({ 
  tags,
  title,
  disabled = false,
  onChange = null,
  checked = null,
} : { 
  tags: tagType;
  title: string; 
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: Function;
}) {

  function checkedFunction(tag: tagType): boolean {
    if (checked === null) {
      return false;
    };

    return checked(tag);
  };

  if (tags.length === 0) return(
    <>
      <h3>{ title }</h3>
      <NoListings listing="de Categorias" />
    </>
  )

  return(
    <>
      <h3>{ title }</h3>
      <div className="row my-3">
        { tags.map((tag: tagType) => {
          return(
            <React.Fragment
              key={ tag.id }
            >
              <Tag
                tag={ tag }
                disabled={ disabled }
                onChange={ onChange }
                checked={ checkedFunction(tag) }
              />
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
};