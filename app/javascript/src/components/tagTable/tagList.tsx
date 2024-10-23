//External Imports
import React from "react";

//Components
import Tag from "./tag";
import NoListings from "@components/headers/noListings";

//Types
import { tagType } from "@utils/types";

export default function TagList({
  disabled = true,
  tags,
  changeCategory = null,
  }: { 
  disabled?: boolean;
  tags: tagType[]
  changeCategory?: Function
}) {
  if (tags.length === 0) return (<NoListings listing="categorias" />)
  
  return(
    <div className="row gy-3">
      { tags.map((tag) => {
        const taggedService = tag.service ? tag.service[0] : false; 
        return (
          <React.Fragment
            key={ tag.id }
          >
            <Tag
              disabled={ disabled }
              tag={ tag }
              changeCategory={ changeCategory }
              checked={ taggedService }
            />
          </React.Fragment>
        )
      })}
    </div>
  )
};