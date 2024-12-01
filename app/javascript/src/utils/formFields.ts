//Types
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