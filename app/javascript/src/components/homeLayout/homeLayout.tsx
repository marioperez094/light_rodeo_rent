//External Imports
import React, { lazy, ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

//Components
import { ExpandableButton, ExpandableMenu, NavDropdown } from "@components/navbarComponents/navbarComponents";
import FooterContent from "./footerContent";
import LazyLoadWrapper from "@components/lazyLoaderWrapper/lazyLoadWrapper";

//Context
import { useLanguage } from "@context/language";

//Functions
import { getRequest } from "@utils/fetchRequests";

//Types
import { tagType } from "@utils/types";

//Stylesheets
import "./homeLayout.scss";

import { logo, translationText, phoneNumber } from "@utils/constants";

const DropdownItem = lazy(() => import("./dropDownItem"));

export default function HomeLayout({ 
  children,
  layoutImage,
} : { 
  children: ReactNode;
  layoutImage: string;
}) {
  const { language, setLanguage } = useLanguage();
  const [tags, setTags] = useState([]);
  const { rentNow, inflatables, contactUs, services } = translationText;
  const filteretedTags = useMemo(() => filterTags(tags), [tags])

  useEffect(() => {
    getRequest("/api/tags_with_image", (response: any) => {
      setTags(response.tags)
    })
  }, []);

  function filterTags(tags: tagType[]) {
    const tagObj = {
      inflatables: [],
      services: [],
    };
    
    tags.forEach((tag: tagType) => {
      const doesNotMatchTag = tag.english_name !== "Inflatables";

      if (tag.inflatable) return tagObj.inflatables.push(tag);
      if (doesNotMatchTag) return tagObj.services.push(tag);
    });

    return tagObj;
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
              className="logo"
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
                className="logo"
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
                  <h3 className="phone-number heading-text text-outline">
                    <span className="text-outline">
                      { rentNow[language] }
                    </span>
                    <a
                      className="btn btn-warning d-block"
                      tabIndex={ 0 }
                      href="/contact"
                    >
                      { phoneNumber }
                    </a>
                  </h3>
                </li>
              </ul>

              <ul className="navbar-nav ms-lg-auto me-auto ms-2 mb-2 mb-lg-0">
                { filteretedTags.services.length > 0 && 
                  <NavDropdown
                    title={ inflatables[language] }
                  >
                    <LazyLoadWrapper id="lazy-dropdown">
                      <div className="dropdown-menu-container ms-auto me-auto">
                        { filteretedTags.inflatables.map((inflatable) => 
                          <DropdownItem tag={ inflatable } key={ inflatable.id } />
                        )}
                      </div>
                    </LazyLoadWrapper>
                  </NavDropdown>
                }
                <DynamicTags tags={ filteretedTags.services } />
              </ul>

              <ul className="navbar-nav ms-lg-0 ms-2 mb-2">
                <hr className="d-lg-none me-1" />
                <li className="nav-item me-3">
                  <a
                    className="nav-link"
                    href="/contact"
                  >
                    { contactUs[language] }
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
                    { language === "english" ? "English" : "Español" }
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
                title={ inflatables[language] }
                tags={ filteretedTags.inflatables }
              />
              <FooterContent
                title={ services[language] }
                tags={ filteretedTags.services }
              />
              <hr className="d-xl-none" />
              <div className="col-12 col-xl-4">
                <div className="row">
                  <div className="col-12 col-sm-4 col-xl-12">
                    <h6>
                      <a href="/contact">{ contactUs[language] }</a>
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <hr className="mt-3" />
                  <div className="col-12 col-xl-6 order-xl-2">
                    <h6 className="contacts d-sm-inline">{}</h6>
                    <p className="d-sm-inline">{ phoneNumber } | <a 
                        href="https://www.facebook.com/mapleenterprises"
                        aria-label="Light Rodeo's Rent Facebook Page"
                        target="_blank"
                      >
                        <FontAwesomeIcon 
                          icon={ faFacebook }
                          aria-hidden 
                        />
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
  const noTags = tags.length === 0;

  if (noTags) return;

  return (
    <>
      { tags.map((tag: tagType, index: number) => {
        const tagsExceedTwo = index > 2;
        if (tagsExceedTwo) return;

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
};