//External Imports
import React, { ReactNode } from "react";

export default function PageHeader({
  title, 
  children = null, 
}: { 
  title: String;
  children?: ReactNode 
}) {
  return (
    <header>
      <h1 className="p-3">{ title }</h1>
      { children }
    </header>
  )
};