//External Imports
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Navbar({ children } : { children: ReactNode}) {
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
        id="navbarMenuToggler"
      >
        <FontAwesomeIcon
          icon={ faBars }
        />
      </button>
      <div 
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0" id="navbarMenu">
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
        className="nav-link mx-3"
        href={ link }
      >
        { title }
      </a>
    </li>
  )
};