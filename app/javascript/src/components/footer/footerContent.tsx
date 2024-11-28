//External Imports
import React from "react";

export default function FooterContent({
  title,
  links,
} : {
  title: string;
  links: string[];
}) {

  return (
    <>
      <hr className="d-xl-none service-list" />
      <div className="col-12 col-xl-4 py-3 py-xl-0">
        <h6>{ title }</h6>
        <div className="row">
          { links.map((link) => {
            return (
              <div
                key={ link }
                className="col-12 col-sm-4 col-xl-12"
              >
                <a href="#">{ link }</a>
              </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
};