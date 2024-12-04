//External Imports
import React, { ChangeEvent } from "react";

//Components
import SkipContent from "@components/skipContent/skipContent";
import HomeLayout from "@components/homeLayout/homeLayout";
import ContactForm from "@components/contactForm/contactForm";

//Context
import { LanguageProvider } from "@context/language";

//Stylesheets
import "./contact.scss";

type AppProps = {
  language: undefined | string;
};

type AppStates = {
  contact: {};
};

class Contact extends React.Component<AppProps, AppStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      contact: {
        Nombre: "",
        Apellido: "",
        "Correo&nbsp;Electrónico": "",
        "Número&nbsp;de&nbsp;Teléfono": "",
        "Fecha&nbsp;del&nbsp;Evento": "",
        "Hora&nbsp;del&nbsp;Evento": "",
        Mensaje: "",
        Idioma: this.props.language,
        Servicio: localStorage.getItem("serviceRental") ? JSON.parse(localStorage.getItem("serviceRental"))[`${ this.props.language }_name`] : ""
      },
    };
  };

  setContact = (e: ChangeEvent<HTMLInputElement>, value: string): void => {
    this.setState({
      contact: {
        ...this.state.contact,
        [e.target.name]: e.target.value
      },
    });
  };

  render(): React.ReactNode {
    return(
      <LanguageProvider>
        <SkipContent link="#" />
        <HomeLayout>
          <main
            id="main"
            role="Main"
          >
            <ContactForm
              contact={ this.state.contact }
              setContact={ this.setContact } 
              key={ this.state.contact }
            />
          </main>
        </HomeLayout>
      </LanguageProvider>
    )
  }
};

export default Contact;