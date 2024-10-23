//External Imports
import React from "react";

export default function NoListings({ listing } : { listing: string }) {
  return(
    <div className="text-center my-3">
      <h5>No ahi resultados de <span className="text-danger">{ listing }</span>.</h5>
    </div>
  )
};