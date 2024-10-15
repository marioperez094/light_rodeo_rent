//External Imports
import React, { useEffect, useState } from "react";

//Componets
import Tag from "@components/tag/tag";

//Functions
import { handleErrors } from "@utils/fetchHelper";

//Types
import { tagType } from "@utils/types";

export default function TagTable({ disabled }: { disabled: boolean }) {
  const [serviceTags, setServiceTags] = useState([]);
  const [inflatableTags, setInflatableTags] = useState([]);

  useEffect(() => {
    fetchTags()
  }, []);

  function fetchTags() {
    fetch("/api/tags")
      .then(handleErrors)
      .then(data => { 
        setServiceTags(data.tags.filter((tag) => { return(!tag.inflatable)}))
        setInflatableTags(data.tags.filter((tag) => { return(tag.inflatable)}))
      })
  };

  return (
    <main className="container-fluid">
      <h3>Servicios</h3>
      <TagList
        tags={ serviceTags }
      />
      <h3 className="mt-3">Inflables</h3>
      <TagList
        tags={ inflatableTags }
      />
    </main>
  )
};


function TagList({ tags }: { tags: tagType[] }) {
  if (tags.length === 0) return <p>No ahi categorias</p>
  
  return(
    <div className="row gy-3">
      { tags.map((tag) => {
        return (
          <React.Fragment
            key={ tag.id }
          >
            <Tag
              disabled={ true }
              tag={ tag }
            />
          </React.Fragment>
        )
      })}
    </div>
  )
};