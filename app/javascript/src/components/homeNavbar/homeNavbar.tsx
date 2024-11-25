//External Imports
import React, { useEffect, useState } from "react";

//Components
import { Navbar, ExpandableButton, ExpandableMenu } from "@components/navbarComponents/navbarComponents"; 
import NavDropdown from "@components/navbarComponents/navbarComponents";

//Context
import { useLanguage } from "@context/language";

//Types
import { languageType } from "@utils/types";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Stylesheets
import "./homeNavbar.scss";

import { generalServices, services } from "@utils/services";

export default function HomeNavbar() {
  const { language, setLanguage } = useLanguage(); 
  const [dbServices, setDBServices] = useState([]);
  const logo = `https://${ process.env.PHOTO_UPLOAD_BUCKET.trim() }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;
  
  const navTitles: {
    [key: string]: languageType
  } = {
    logIn: {
      "english": "Log In/Sign Up",
      "spanish": "Iniciar/Inscribirse",
    },
    rentNow: {
      "english": "Rent Now!",
      "spanish": "Renta Ahora!"
    },
    aboutUs: {
      "english": "About Us!",
      "spanish": "Sobre Nosotros!"
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  function fetchTags(): void {
    getRequest("/api/services", (response: any) => {
      setDBServices(response.tags);
    });
  };

  return(
    <>
      { /* Large screen icons */}
      <div
        id="large-screen-icon" 
        className="d-none d-lg-flex justify-content-center w-100 pt-2"
      >
        <a
          className="navbar-brand"
          href="/"
        >
          <img
            src={ logo }
            aria-hidden
          />
          <span className="heading-text text-outline ms-2">
            Light Rodeo's Rent
          </span>
        </a>
      </div>
      <Navbar navbarID="homeNavbar">
        <a
          className="navbar-brand d-lg-none"
          href="/"
        >
          <img
            src={ logo }
            aria-hidden
          />
          <span className="heading-text text-outline ms-2">
            Light Rodeo's Rent
          </span>
        </a>
        <ExpandableButton />
        <ExpandableMenu>
          <ul className="navbar-nav ms-lg-0 ms-2 mb-2 mb-lg-0">
            <li className="nav-item d-none d-lg-block">
              <h3 className="phone-number heading-text">
                <span className="text-outline">
                  { navTitles.rentNow[language] }
                </span>
                <a
                  className="btn btn-warning d-block"
                  tabIndex={ 0 }
                >
                  (602) 435-6640
                </a>
              </h3>
            </li>
          </ul>
          
          <ul className="navbar-nav ms-lg-auto me-auto ms-2 mb-2 mb-lg-0">
            <NavDropdown
              title={ generalServices.inflatables[language] }
            >
              <DropdownItem title={ services.jumpers } />
              <DropdownItem title={ services.themed } />
              <DropdownItem title={ services.waterslides } />
            </NavDropdown>
            <NavDropdown
              title={ generalServices.snacks[language] }
            >
              <DropdownItem title={ services.popcorn } />
              <DropdownItem title={ services.snoCones } />
              <DropdownItem title={ services.cottonCandy } />
            </NavDropdown>
            <li className="nav-item">
              <a
                className="nav-link me-3"
                href="#"
              >
                { generalServices.tacos[language] }
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
              >
                { generalServices.mechanicalBull[language] }
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ms-lg-0 ms-2 mb-2">
            <hr className="d-lg-none me-1" />
            <li className="nav-item me-3">
              <a
                className="nav-link"
                href="#"
              >
                { navTitles.aboutUs[language] }
              </a>
            </li>
            <li className="nav-item dropdown me-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {language === "english" ? "English" : "Español" }
              </a>
              <ul 
                className="dropdown-menu language-dropdown"
                aria-labelledby="languageDropdown"
              >
                <li>
                  <a
                    className="dropdown-item"
                    tabIndex={ 0 }
                    onClick={ () => setLanguage("english") }
                  >
                    English
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    tabIndex={0}
                    onClick={ () => setLanguage("spanish")}
                  >
                    Español
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </ExpandableMenu>
      </Navbar>
    </>
  )
};

function DropdownItem(
  { title }: {
    title: languageType
  }) {
  const { language } = useLanguage();

  return (
    <li className="px-3">
      <a
        className="dropdown-item"
        href={`/services/service_type=${ title["english"] }`}
      >
        <div
          className="nav-dropdown-image tw-rounded-md"
          id={ `${ title[language].split(" ").join("") }-nav-image` }
          aria-hidden
        />
        {title[language]}
      </a>
    </li>
  )
};