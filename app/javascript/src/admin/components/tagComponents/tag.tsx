//External Import
import React, { ChangeEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

//Functions
import { deleteRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./tag.scss";

export default function Tag({ 
  tag,
  disabled = false,
  onChange = null,
  checked = false,
}: { 
  tag: tagType;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>
  checked?: boolean;
}) {
  const { id, spanish_name } = tag;

  function deleteTag(): void {
    deleteRequest(`/api/tags/${ id }`, (response: any) => {
      response.success && window.location.reload();
    })
  };

  return(
    <div className="col-4 col-md-3 col-xl-2 my-3">
      <div className="shadow-lg">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <input
              type="checkbox"
              className="tag-checkbox"
              value={ id }
              id={ spanish_name }
              onChange={ (e) => onChange(e) }
              disabled={ disabled }
              checked={ checked }
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
                    onClick={ () => deleteTag() }
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