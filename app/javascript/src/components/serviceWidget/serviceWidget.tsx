//External Imports
import React, { useEffect, useState } from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { tagType } from "@utils/types";

//Functions
import { getRequest } from "@utils/fetchRequests";

import { translationText } from "@utils/constants";

export default function ServiceWidget() {
  const { language } = useLanguage();

  const [widget, setWidget] = useState(1);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getRequest("/api/tags", (response: any) => {
      setTags(response.tags);
    });
  }, []);

  if (tags.length === 0) return;

  return(
    <section
      className="container-fluid service-widget p-0"
      aria-label="Service Widget"
    >
      <form className="p-4">
        <h2 className="text-center heading-text text-outline mb-3">
          { translationText.chooseFun[language] }
        </h2>
        <select
          className="form-select"
          aria-label="Choose an Attraction"
          id="choose-fun"
          value={ widget }
          onChange={ (e) => setWidget(e.target.value) }
        >
          { tags.map((tag: tagType) => 
            <option
              key={ tag.id }
              value={ tag.id }
            >
              { `${tag[`${ language }_name`]} ${ tag.inflatable ? translationText.inflatables[language] : "" }` }
            </option>
          )}
        </select>
        <div className="service-widget-button-container d-flex flex-column">
          <a
            type="submit"
            className="btn btn-warning px-4 py-2 mt-4"
            href={ `/service-type/${ widget }` }
          >
            { translationText.search[language] }
          </a>
        </div>
      </form>
    </section>
  )
};