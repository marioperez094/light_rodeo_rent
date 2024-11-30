//External Imports
import React, { useEffect, useState } from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { languageType, tagType } from "@utils/types";

//Functions
import { getRequest } from "@utils/fetchRequests";

import { frontPageText } from "@utils/pageText";

export default function ServiceWidget() {
  const { language } = useLanguage();
  const [widget, setWidget] = useState(1);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getRequest("/api/tags", (response: any) => {
      setTags(response.tags);
    });
  }, []);

  return(
    <form className="rounded p-4">
      <h3 className="text-center heading-text mb-3">
        { frontPageText.chooseFun[language] }
      </h3>
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
            { tag[`${ language }_name`] }
          </option>)
        }
      </select>
      <div className="schedule-widget-button-container d-flex flex-column">
        <a
          type="submit"
          className="btn btn-warning px-4 py-2 mt-4"
          disabled={ widget === 0 }
          href={ `/service-type/${ widget }` }
        >
          { frontPageText.search[language] }
        </a>
      </div>
    </form>
  )
};