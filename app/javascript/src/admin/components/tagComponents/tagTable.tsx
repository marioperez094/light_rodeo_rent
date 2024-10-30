//External Imports
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

//Types
import { tagType } from "@utils/types";
import NoListings from "@components/headers/noListings";

//Stylesheets
import "./tag.scss"

export default function TagTable({ tags }: { tags: tagType }) {
  const serviceTags = tags.filter(tag => !tag.inflatable);
  const inflatableTags = tags.filter(tag => tag.inflatable);

  return(
    <main className="container-fluid">
      <h3>Servicios</h3>
        <TagList tags={ serviceTags } />
      <h3 className="mt-3">Inflables</h3>
        <TagList tags={ inflatableTags } />
    </main>
  )
};

function TagList({ tags }: { tags: tagType[] }) {
  if (tags.length === 0) return <NoListings listing="de categorias" />

  return(
    <div className="row gy-3">
      { tags.map(tag => {
        return(
          <React.Fragment
            key={ tag.id }
          >
            <Tag
              tag={ tag }
            />
          </React.Fragment>
        )
      })}
    </div>
  )
};

function Tag({ tag }: { tag: tagType }) {
  const { id, spanish_name } = tag;

  return(
    <div className="col-4 col-md-3 col-xl-2">
      <div className="shadow-lg">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <input
              type="checkbox"
              className="tag-checkbox"
              value={ id }
              id={ spanish_name }
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