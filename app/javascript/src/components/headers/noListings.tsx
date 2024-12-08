//External Imports
import React from "react";

export default function NoListings({ listing } : { listing: string }) {
  return(
    <div className="text-center my-3">
      <h1>No ahi resultados <span className="text-danger">{ listing }</span>.</h1>
    </div>
  )
};