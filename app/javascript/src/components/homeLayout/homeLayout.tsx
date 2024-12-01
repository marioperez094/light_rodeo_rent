//External Imports
import React, { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

//Components
import { ExpandableButton, ExpandableMenu, NavDropdown } from "@components/navbarComponents/navbarComponents";
import FooterContent from "./footerContent";

//Context
import { useLanguage } from "@context/language";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

import { logo, frontPageText, generalServices } from "@utils/constants";

//Stylesheets
import "./homeLayout.scss";

export default function HomeLayout({ 
  children,
  layoutImage,
} : { 
  children: ReactNode;
  layoutImage: string;
}) {
  const { language, setLanguage } = useLanguage();
  const [inflatableTags, setInflatableTags] = useState([]);
  const [serviceTags, setServiceTags] = useState([]);

  useEffect(() => {
    getRequest("/api/tags_with_image", (response: any) => {
      filterTags(response.tags);
    })
  }, []);

  function filterTags(tags: tagType[]) {
    const inflatableTags = [];
    const serviceTags = [];
    
    tags.forEach((tag: tagType) => {
      if (tag.inflatable) return inflatableTags.push(tag);
      if (tag.english_name !== "Inflatables") return serviceTags.push(tag);
    });

    setInflatableTags(inflatableTags);
    setServiceTags(serviceTags);
  };

  return (
    <>
      <nav
        aria-label="Navigation Bar"
        id="homeNavbar"
        role="Navigation Bar"
      >

        { /* Large Screen Icons */ }

        <div
          id="large-screen-icon" 
          className="d-none d-lg-flex justify-content-center w-100 py-2"
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
                { serviceTags.length > 0 && 
                  <NavDropdown
                    title={ frontPageText.inflatables[language] }
                  >
                    { inflatableTags.map((inflatable) => 
                      <DropdownItem tag={ inflatable } key={ inflatable.id } />
                    )}
                  </NavDropdown>
                }
                <DynamicTags tags={ serviceTags } />
              </ul>

              <ul className="navbar-nav ms-lg-0 ms-2 mb-2">
                <hr className="d-lg-none me-1" />
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="#"
                  >
                    { frontPageText.aboutUs[language] }
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
                        tabIndex={ 0 }
                        onClick={ () => setLanguage("spanish") }
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
        <footer
          aria-label="Footer"
          id="homeFooter"
          role="Footer"
        >
          <div className="container-fluid">
            <div className="row">
              <FooterContent
                title={ frontPageText.inflatables[language] }
                tags={ inflatableTags }
              />
              <FooterContent
                title={ generalServices.services[language] }
                tags={ serviceTags }
              />
              <hr className="d-xl-none" />
              <div className="col-12 col-xl-4">
                <div className="row">
                  <div className="col-12 col-sm-4 col-xl-12">
                    <h6>
                      <a href="#">{ frontPageText.aboutUs[language] }</a>
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <hr className="mt-3" />
                  <div className="col-12 col-xl-6 order-xl-2">
                    <h6 className="contacts d-sm-inline">{}</h6>
                    <p className="d-sm-inline">(480) 658-7150 | <a 
                        href="https://www.facebook.com/martina0771"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={ faFacebook } />
                      </a>
                    </p>
                  </div>
                  <div className="col-12 col-xl-6 order-xl-1">
                    <small className="d-xl-block d-none">&copy; 2024 Marking Tech.</small>
                    <small className="d-xl-block d-none">All rights reserved.</small>
                    <small className="d-xl-none">&copy; 2024 Marking Tech. All rights reserved.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </section>
    </>
  )
};

function DynamicTags({ tags } : { tags: tagType }) {
  const { language } = useLanguage();

  if (tags.length === 0) return;

  return (
    <>
      { tags.map((tag: tagType, index: number) => {
        if (index > 2) return;

        return(
          <li 
            className="nav-item"
            key={ tag.id }
          >
            <a 
              className="nav-link me-3"
              href={`/service-type/${ tag.id }`}
            >
              { tag[`${ language }_name`] }
            </a>
          </li>
        )
      })}
    </>
  )
}

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