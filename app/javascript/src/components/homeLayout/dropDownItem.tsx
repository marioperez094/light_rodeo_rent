//External Imports
import React from "react";

//Context
import { useLanguage } from "@context/language";

//Types
import { tagType } from "@utils/types";

export default function DropdownItem(
  { 
    tag
  }: {
    tag: tagType;
  }) {
  const { language } = useLanguage();

  return (
    <li className="px-3">
      <a
        className="dropdown-item"
        href={`/service-type/${ tag.id }`}
      >
        <img
          src={ tag.image_url }
          alt={ tag[`${ language }_name`] }
          aria-hidden
          className="nav-dropdown-image tw-rounded-md d-block"
          loading="lazy"
        />
        { /*<div
          className="nav-dropdown-image tw-rounded-md"
          style={{ backgroundImage: `url(${ tag.image_url })` }}
          aria-hidden
        /> */ }
        { tag[`${ language }_name`] }
      </a>
    </li>
  )
};