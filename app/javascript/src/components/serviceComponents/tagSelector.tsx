//External Imports
import React, { useEffect, useState } from "react";

//Components
import TagList from "@components/tagTable/tagList";

//Functions 
import { handleErrors, safeCredentials } from "@utils/fetchHelper";
import { errorObject } from "@utils/utils";
import LoadingRing from "../loadingRing/loadingRing";

export default 
function TagSelector({ id }: { id: number }) {
  const [serviceTags, setServiceTags] = useState([]);
  const [inflatableTags, setInflatableTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  function fetchTags() {
    fetch(`/api/services/${ id }/tags-in-services`)
      .then(handleErrors)
      .then(data => {
        setServiceTags(data.tags.filter((tag) => { return(!tag.inflatable)}));
        setInflatableTags(data.tags.filter((tag) => { return(tag.inflatable)}));
        setLoading(false);
      })
  };

  function changeCateogry(e) {
    setLoading(true)
    if (!e.target.checked) {
      return removeCategory(e);
    }
    
    fetch("/api/taggables", safeCredentials({
      method: "POST",
      body: JSON.stringify({
        service_id: id,
        tag_id: e.target.value
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.taggable) return fetchTags()
      })
      .catch(
        error => alert("Error: " + errorObject(error))
      )
  };

  function removeCategory(e) {
    fetch(`/api/taggables/${ e.target.value }/${ id }`, safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) return fetchTags()
      })
      .catch(error => alert("Error: " + errorObject(error)))
  };

  if (loading) return <LoadingRing />

  return (
    <>
      <h3>Servicios</h3>
        <TagList
          disabled={ false }
          tags={ serviceTags }
          changeCategory={ changeCateogry }
        />
      <h3 className="mt-3">Inflables</h3>
        <TagList
          disabled={ false }
          tags={ inflatableTags }
          changeCategory={ changeCateogry }
        />
    </>
  )
};