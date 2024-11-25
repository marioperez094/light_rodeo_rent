//External Imports
import React from "react";

import "./loadingRing.scss";

const LoadingRing = () => {
  return (
    <div className='transparent-background d-flex justify-content-center align-items-center'>
      <div className='loading-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingRing;