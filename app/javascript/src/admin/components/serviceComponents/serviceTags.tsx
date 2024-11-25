//External Imports
import React, { ChangeEvent, useEffect, useState } from "react";

//Components
import TagTable from "@adminComponents/tagComponents/tagTable";
import LoadingRing from "@adminComponents/loadingRing/loadingRing";

//Functions
import { getRequest, postRequest, deleteRequest } from "@utils/fetchRequests";
import { handleErrors } from "@utils/fetchHelper";
import { tagType } from "../../../utils/types";

export default function serviceTags({ id }: { id: string }) {
  const [serviceTags, setServiceTags] = useState([]);
  const [inflatableTags, setInflatableTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);
  
  function fetchTags() {
    getRequest(`/api/services/${ id }/tags-in-services`, (response: any) => {
      setServiceTags(response.tags.filter((tag: any) => { return(!tag.inflatable)}));
      setInflatableTags(response.tags.filter((tag: any) => { return(tag.inflatable)}));
      setLoading(false);
    });
  };

  function changeTag(e: ChangeEvent<HTMLInputElement>, value: void): void {
    setLoading(true);
    
    if(!e.target.checked) {
      return removeCategory(e)
    };

    let taggable = {
      service_id: id,
      tag_id: e.target.value
    };

    postRequest("/api/taggables", taggable, (response: any) => {
      handleErrors(response)
        .then((response: any) => {
          response.taggable && fetchTags();
        })
        .catch((error: any) => {
          alert(error);
          setLoading(false);
        });
    });
  };

  function removeCategory(e: ChangeEvent<HTMLInputElement>, value: void): void {
    deleteRequest(`/api/taggables/${ e.target.value }/${ id }`, (response: any) => {
      response.success && fetchTags();
    });
  };

  function isChecked(tag: tagType): boolean {
    return tag.service[0];
  };

  if (loading) return <LoadingRing />
  
  return(
    <main className="container-fluid mt-3">
      <TagTable
        title="Servicios"
        tags={ serviceTags }
        checked={ isChecked }
        onChange={ changeTag }
      />
      <TagTable
        title="Inflables"
        tags={ inflatableTags }
        checked={ isChecked }
        onChange={ changeTag }
      />
    </main>
  )
};