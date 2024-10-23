//External Imports
import React, { ReactNode } from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return <h1 className="m-3">{ children }</h1>
};