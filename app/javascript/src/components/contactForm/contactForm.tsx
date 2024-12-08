//External Imports
import React, { ChangeEventHandler, useState } from "react";

//Components
import { LabeledInput, LabeledTextArea } from "@components/formComponents/formComponents";

//Context
import { useLanguage } from "@context/language";

//Types
import { formFields } from "@utils/types";

import { translationText } from "@utils/constants";
import { contactForm } from "@utils/formFields";
import { phoneNumber } from "@utils/constants";


export default function ContactForm({ 
  contact,
  setContact,
} : { 
  contact: {};
  setContact: ChangeEventHandler<HTMLInputElement>
}) {
  const { language } = useLanguage();
  const email = process.env.EMAIL_LINK;
  const { contactUs, contactFormWarning, submit } = translationText;
  
  return(
    <section
      id="contact"
      aria-label="Contact Us"
    >
      <div className="container-fluid contact-widget py-3 py-lg-4 py-xl-5 px-5">
        <div className="row pt-2">
          <form className="contact-form col-12 py-4 px-lg-5" action={ `https://formsubmit.co/${ email }` } method="POST">
            <div className="form shadow-lg rounded p-5">
              <h3 className="heading-text text-outline text-center">{ contactUs[language] }</h3>
              <h4 className="heading-text text-outline text-center">{ phoneNumber }</h4>
              <div className="row">

                {/* Honeypot */}
                <input type="text" name="_honey" className="d-none" />

                { /* Disabled Captcha */}
                <input type="hidden" name="_captcha" value="false" />

                <input type="hidden" name="_next" value="http://localhost:3000/contact/success" />

                { contactForm.map((field: formFields, index: number) => {
                  const isTextArea = field.type === "textArea";
                  const { name, label, type, disabled, required } = field;

                  if (isTextArea) return (
                    <div className="col-12" key={ index }>
                        <LabeledTextArea
                          name={ name }
                          label={ label[language] }
                          value={ contact[name] }
                          wordCount={ false }
                          required={ required }
                          handleChange={ setContact }

                        />
                    </div>
                  )
                  
                  return (
                    <div className="col-12 col-md-6" key={ index }>
                      <LabeledInput
                        name={ name }
                        label={ label[language] }
                        type={ type }
                        value={ contact[name] }
                        disabled={ disabled }
                        required={ required }
                        handleChange={ setContact }
                      />
                    </div>
                  )
                })}
                <div className="col-12">
                  <p className="text-danger">{ contactFormWarning[language] }</p>
                </div>
                <div className="col-12 col-md-2 offset-md-10">
                  <button
                    className="btn btn-warning w-100"
                    type="submit"
                    //href={ personal ? emailTo + contact.message : emailTo + mailTo.spanish }
                  >
                    { submit[language] }
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
};