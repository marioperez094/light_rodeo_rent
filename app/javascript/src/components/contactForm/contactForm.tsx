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


export default function ContactForm({ 
  contact,
  setContact,
} : { 
  contact: {};
  setContact: ChangeEventHandler<HTMLInputElement>
}) {
  const { language } = useLanguage();
  const email = process.env.EMAIL_LINK;
  
  return(
    <section
      id="contact"
      aria-label="Contact Us"
    >
      <div className="container-fluid contact-widget py-3 py-lg-4 py-xl-5 px-5">
        <div className="row pt-2">
          <form className="contact-form col-12 py-4 px-lg-5" action={ `https://formsubmit.co/${ email }` } method="POST">
            <div className="form shadow-lg rounded p-5">
              <h3 className="heading-text text-center">{ translationText.contactUs[language] }</h3>
              <h4 className="heading-text text-center">(480) 658-7150</h4>
              <div className="row">

                {/* Honeypot */}
                <input type="text" name="_honey" className="d-none" />

                { /* Disabled Captcha */}
                <input type="hidden" name="_captcha" value="false" />

                <input type="hidden" name="_next" value="http://localhost:3000/contact/success" />

                { contactForm.map((field: formFields, index: number) => {
                  if (field.type === "textArea") return (
                    <div className="col-12" key={ index }>
                        <LabeledTextArea
                          name={ field.name }
                          label={ field.label[language] }
                          value={ contact[field.name] }
                          wordCount={ false }
                          required={ field.required }
                          handleChange={ setContact }

                        />
                    </div>
                  )
                  
                  return (
                    <div className="col-12 col-md-6" key={ index }>
                      <LabeledInput
                        name={ field.name }
                        label={ field.label[language] }
                        type={ field.type }
                        value={ contact[field.name] }
                        disabled={ field.disabled }
                        required={ field.required }
                        handleChange={ setContact }
                      />
                    </div>
                  )
                })}
                <div className="col-12">
                  <p className="text-danger">{ translationText.contactFormWarning[language] }</p>
                </div>
                <div className="col-12 col-md-2 offset-md-10">
                  <button
                    className="btn btn-warning w-100"
                    type="submit"
                    //href={ personal ? emailTo + contact.message : emailTo + mailTo.spanish }
                  >
                    { translationText.submit[language] }
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