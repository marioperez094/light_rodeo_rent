//External Imports
import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Navbar({ 
  children,
  navbarID
  } : { 
  children: React.ReactNode;
  navbarID: string;
}) {
  return(
    <nav 
      aria-label="Navigation Bar"
      className="navbar navbar-expand-lg navbar-light navbar-light navbar-dark bg-dark"
      id={ navbarID }
    >
      <div className="container-fluid">
        { children }
      </div>
    </nav>
  )
};

export function ExpandableButton() {
  return (
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
        className="navbar-toggler-icon"
        icon={ faBars }
      />
    </button>
  )
};

export function ExpandableMenu({ children } : { children: ReactNode }) {
  return (
    <div 
      className="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      { children }
    </div>
  )
};

export function NavItem({
  title,
  link,
  active,
  } : { 
  title: string;
  link: string;
  active: boolean;
}) {
  return (
    <li className="nav-item">
      <a
        className={ `nav-link mx-3 ${ active && "active" }` }
        href={ link }
      >
        { title }
      </a>
    </li>
  )
};