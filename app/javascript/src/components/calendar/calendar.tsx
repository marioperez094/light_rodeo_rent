//External Imports
import React from "react";

export default function Calendar() {
  return (
    <div className="container-fluid">
      <div className="row">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FPhoenix&bgcolor=%23ffffff&showTitle=0&showPrint=0&showTz=0&src=bGlnaHRyb2Rlb3JlbnRAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
          className="mt-3"
          width={ "600" }
          height={ "600" }
        />
      </div>
    </div>
  )
};