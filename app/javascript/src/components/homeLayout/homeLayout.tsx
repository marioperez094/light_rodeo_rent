//External Imports
import React, { ReactNode, useEffect, useState } from "react";

//Components
import { ExpandableButton, ExpandableMenu } from "@components/navbarComponents/navbarComponents"; 
import NavDropdown from "@components/navbarComponents/navbarComponents";
import Footer from "@components/footer/footer";

//Context
import { useLanguage } from "@context/language";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./homeLayout.scss";

import { generalServices } from "@utils/services";
import { frontPageText, navTitles } from "@utils/pageText";

export default function HomeLayout({ 
  layoutImage,
  children,
} : { 
  layoutImage: string;
  children: ReactNode;
}) {
  const { language, setLanguage } = useLanguage(); 
  const [tags, setTags] = useState([]);
  const logo = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;
  
  
  const inflatableTags = tags.filter(tag => tag?.inflatable);
  const serviceTags = tags.filter(tag => !tag?.inflatable && tag?.english_name !== "Inflatables");
  
  useEffect(() => {
    getRequest("/api/tags_with_image", (response: any) => {
      setTags(response.tags);
    });
  }, []);

  return(
    <>
      <nav 
        aria-label="Navigation Bar"
        id="homeNavbar"
        role="Navigation Bar"
      >
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
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
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
                    { frontPageText.rentNow[language] }
                  </span>
                  <a
                    className="btn btn-warning d-block"
                    tabIndex={ 0 }
                  >
                    (480) 658-7150
                  </a>
                </h3>
              </li>
            </ul>
          
            <ul className="navbar-nav ms-lg-auto me-auto ms-2 mb-2 mb-lg-0">
              <NavDropdown
                title={ generalServices.inflatables[language] }
              >
                { inflatableTags.map((inflatable) => 
                  <DropdownItem tag={ inflatable } key={ inflatable.id } />
                )}
              </NavDropdown>
              { serviceTags.map((service, index) => {
                if (index > 2) return
              
                return(
                  <li 
                    className="nav-item"
                    key={ service.id }
                  >
                    <a 
                      className="nav-link me-3"
                      href={`/service-type/${ service.id }`}
                    >
                      { service[`${ language }_name`] }
                    </a>
                  </li>
                )
              })}
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
          </div>
        </div>
      </nav>
      { children }
      <section
        className="layout-image"
        style={{ backgroundImage: `url(${ layoutImage })` }}
      >
        <Footer
          serviceTags={ serviceTags }
          inflatableTags={ inflatableTags } 
        />
      </section>
    </>
  )
};

function DropdownItem(
  { 
    tag
  }: {
    tag: tagType;
  }) {
  const { language } = useLanguage();

  return (
    <li className="px-3">
      <a
        className="dropdown-item"
        href={`/service-type/${ tag.id }`}
      >
        <div
          className="nav-dropdown-image tw-rounded-md"
          style={{ backgroundImage: `url(${ tag.image_url })` }}
          aria-hidden
        />
        { tag[`${ language }_name`] }
      </a>
    </li>
  )
};