//External Imports
import React from "react";
import { Link, useMatch } from "react-router-dom";

export default function ActiveTab({ 
  link,
  children,
  } : { 
  link: string;
  children: React.ReactNode;
}) {


  const linkMatch = useMatch(link)

  return (
    <div className={`col-4 text-center py-1 mt-2 service-tab ${ linkMatch ? "active-tab" : "" }`}>
      <Link
        to={ link }
      >
        { children }
      </Link>
    </div>
  )
};