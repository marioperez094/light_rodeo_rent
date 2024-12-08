//External Imports
import React, { Suspense, ReactNode } from "react";
import useInView from "@context/viewHook";

export default function LazyLoadWrapper ({ 
  children, 
  id, 
} : {
  children: ReactNode;
  id: string;
}) {
  const isInView = useInView({ id });

  return(
    <div id={ id }>
      { /* Renders the child component only if it's in view */}
      { isInView && (
        <Suspense fallback={ <div>Loading...</div> }>
          { children }
        </Suspense>
      )}
    </div>
  )
}