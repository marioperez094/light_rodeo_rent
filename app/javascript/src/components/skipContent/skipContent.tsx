//External Imports
import React from "react";

export default function SkipContent({ link } : { link: string }) {
  return(
    <a
      className="skip-content"
      href={ link }
    >
      Skip to Content
    </a>
  )
};