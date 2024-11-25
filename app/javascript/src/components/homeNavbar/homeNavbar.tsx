//External Imports
import React from "react";

//Components
import { Navbar } from "@components/navbarComponents/navbarComponents";

//Context
import { useLanguage } from "@context/language";

import logo from "@images/light_rodeo_logo.png"

export default function HomeNavbar() {
  const { language, setLangauge } = useLanguage();

  return(
    <Navbar>
      {/* Large screen icons */}
      <div className="d-none d-lg-flex justify-content-center w-100 pt-2">
        <a
          className="navbar-brand"
          href="/"
        >
          <img
            src={ logo }
            aria-hidden
          />
          <span className="heading-text text-oultline ms-2">
            Light Rodeo's Rent
          </span>
        </a>
      </div>
    </Navbar>
  )
};