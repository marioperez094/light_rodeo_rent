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
    <li className="px-3 mb-2">
      <a
        className="dropdown-item"
        href={`/service-type/${ tag.id }`}
      >
        <img
          aria-hidden
          className="nav-dropdown-image tw-rounded-md d-none d-lg-block"
          style={{ backgroundImage: `url(${ tag.image_url })` }}
          loading="lazy"
        />
        { tag[`${ language }_name`] }
      </a>
    </li>
  )
};