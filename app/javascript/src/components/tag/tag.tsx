//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

//Functions
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./tag.scss";

export default function Tag(
  {
    disabled,
    tag,
    changeCategory = null,
    checked = false,
  }: {
    disabled: boolean;
    tag: tagType;
    changeCategory?: Function;
    checked?: boolean;
  }
) {
  
  function deleteTag(tagID: number): void {
    fetch(`/api/tags/${ tagID }`, safeCredentials({
      method: "DELETE"
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) return window.location.reload();
      })
  };

  const { id, spanish_name } = tag;
  return (

    <div
      className="col-4 col-md-3 col-xl-2"
    >
      <div className="shadow-lg">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <input
              type="checkbox"
              className="tag-checkbox"
              value={ id }
              id={ spanish_name }
              disabled={ disabled }
              onChange={ (e) => changeCategory(e) }
              data-checked={ checked }
              checked= { checked }
            />
          </div>
          <div className="col-7 d-flex align-items-center justify-content-start overflow-hidden tag-box">
            <label
              className="form-label"
              htmlFor={ spanish_name }
            >
              { spanish_name }
            </label>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-end">
            <div className="dropdown">
              <button 
                className="btn"
                type="button"
                id="tagDropdownButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon
                  icon={ faEllipsisV }
                /> 
              </button>
              <ul 
                className="dropdown-menu"
                aria-labelledby="tagDropdownButton"
              >
                <li>
                  <a 
                    className="dropdown-item"
                    onClick={ () => deleteTag(id) }
                  >
                    Borrar
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};