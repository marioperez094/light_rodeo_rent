//Types
import { translationText } from "./constants";
import { formFields } from "./types";

export const loginFields: formFields[] = [{
  name: "username",
  label: "Nombre de Usario",
}, {
  name: "password",
  label:"Contraseña",
  autoComplete: "current-password",
  type: "password",
}];


export const serviceFields: formFields[] = [{
  name: "spanish_name",
  label: "Nombre de Servicio",
  wordCount: true,
}, {
  name: "english_name",
  label: "Nombre de Servicio en Ingles",
  wordCount: true,
}, {
  name: "spanish_description",
  label: "Descripcion de Servicio",
  wordCount: true,
  textArea: true,
} , {
  name: "english_description",
  label: "Descripcion de Servicio en Ingles",
  wordCount: true,
  textArea: true,
}, {
  name: "dimensions",
  label: "Dimensiones",
  required: false,
}];

export const tagFields: formFields[] = [{
  name: "spanish_name",
  label: "Categoria",
}, {
  name: "english_name",
  label: "Categoria en Ingles",
}]

export const contactForm: formFields[] = [{
  name: "Nombre",
  label: translationText.firstName,
}, {
  name: "Apellido",
  label: translationText.lastName,
}, {
  name: "Correo\u00A0Electrónico",
  label: translationText.email,
  type: "email",
}, {
  name: "Número\u00A0de\u00A0Teléfono",
  label: translationText.phoneNumber,
  type: "tel",
}, { 
  name: "Fecha\u00A0del\u00A0Evento",
  label: translationText.date,
  type: "date",
  required:  false,
}, {
  name: `Hora\u00A0del\u00A0Evento`,
  label: translationText.time,
  type: "time",
  required: false,
}, {
  name: "Idioma",
  label: translationText.language,
  disabled: true,
}, {
  name: "Servicio",
  label: translationText.service,
  required: false,
}, {
  name: "Mensaje",
  label: translationText.message,
  type: "textArea",
  required: false,
}];
