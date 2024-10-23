//External Imports
import React, { useEffect, useState } from "react";

//Components
import TagList from "./tagList";

//Functions
import { handleErrors } from "@utils/fetchHelper";


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