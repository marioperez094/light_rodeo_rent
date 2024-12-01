//External Imports
import React from "react";

//Types
import { tagType } from "@utils/types";

//Context
import { useLanguage } from "@context/language";

export default function FooterContent({
  title,
  tags,
} : {
  title: string;
  tags: tagType[];
}) {
  const { language } = useLanguage();

  return (
    <>
      <hr className="d-xl-none service-list" />
      <div className="col-12 col-xl-4 py-3 py-xl-0">
        <h6>{ title }</h6>
        <div className="row">
          { tags.map((tag) => {
            return (
              <div
                key={ tag.id }
                className="col-12 col-sm-4 col-xl-12"
              >
                <a 
                  href={`/service-type/${ tag.id }`}
                >
                  { tag[`${ language }_name`] }
                </a>
              </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
};