//External Imports
import React, { ReactNode } from "react";

//Stylesheets
import "./serviceList.scss";

export function ListBackground({ 
  children,
}: { 
  children: ReactNode;
}) {
  return(
    <article
      id="services"
      aria-label="Services"
    >
      <div className="container-fluid service-list py-3 py-lg-4 py-xl-5 px-5">
        <div className="row pt-2">
          { children }
        </div>
      </div>
    </article>
  )
};

export function ServiceBoxContainer({ children } : { children: ReactNode }) {
  return (
    <div className="service-box col-12 col-md-6 col-lg-4 py-4 px-lg-5">
      <div className="service shadow-lg rounded p-2">
        { children }
      </div>
    </div>
  )
};

export function TagBoxContainer({ children } : { children: ReactNode }) {
  return(
    <div className="service-box col-12 col-lg-6 py-4 px-lg-5">
      <div className="service shadow-lg rounded p-2">
        { children }
      </div>
    </div>
  )
}