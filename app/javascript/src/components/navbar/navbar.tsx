//External Imports
import React, { ReactNode } from "react";

//Stylesheet
import "./navbar.scss";

export default function Navbar({ children } : { children: ReactNode}) {
  return(
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        { children }
      </div>
    </nav>
  )
};

export function ExpandableMenu({ children } : { children: ReactNode}) {
  return (
    <>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div 
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          { children }
        </ul>
      </div>
    </>
  )
};

export function NavItem({
  title,
  link
} : { 
  title: string
  link : string
}) {
  return (
    <li className="nav-item">
      <a
        className="nav-link me-3"
        href={ link }
      >
        { title }
      </a>
    </li>
  )
};