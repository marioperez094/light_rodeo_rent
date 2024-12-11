import { languageType } from "./types";

export const logo: string = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;

export const translationText: {
  [key: string]: languageType;
} ={ 
  slogan: {
    "english": "Bring the Rodeo to your Next Event!",
    "spanish": "¡Lleva el Rodeo a tu Próximo Evento!",
  },
  chooseFun: {
    "english": "Choose your fun!",
    "spanish": "¡Escoje tu Diversión!",
  },
  rentNow: {
    "english": "Rent Now!",
    "spanish": "¡Renta Ahora!",
  },
  search: {
    "english": "Search",
    "spanish": "Buscar",
  },
  inflatables: {
    "english": "Inflatables",
    "spanish": "Inflables",
  },
  aboutUs: {
    "english": "About Us!",
    "spanish": "Sobre Nosotros!"
  }, 
  contactUs: {
    "english": "Contact us!",
    "spanish": "Contacta con nosotros!"
  },
  services: {
    "english": "Services",
    "spanish": "Servicios",
  },
  service: {
    "english": "Service",
    "spanish": "Servicio",
  },
  tacos: {
    "english": "Tacos",
    "spanish": "Tacos",
  },
  mechanicalBull: {
    "english": "Mechanical Bull",
    "spanish": "Toro Mecánico"
  },
  tablesChairs: {
    "english": "Tables and Chairs",
    "spanish": "Mesas y Cillas"
  },
  kareoke: {
    "english": "Kareoke",
    "spanish": "Kareoke"
  },
  dimensions: {
    "english": "Dimensions",
    "spanish": "Dimensiones",
  },
  description: {
    "english": "Description",
    "spanish": "Descripcion"
  },
  categories: {
    "english": "Categories",
    "spanish": "Categorias",
  },
  submit: {
    "english": "Submit",
    "spanish": "Enviar",
  }, 
  firstName: {
    "english": "First Name",
    "spanish": "Nombre"
  },
  lastName: {
    "english": "Last Name",
    "spanish": "Apellido"
  },
  email: {
    "english": "Email",
    "spanish": "Correo Electrónico"
  },
  phoneNumber: {
    "english": "Phone Number",
    "spanish": "Número de Teléfono",
  },
  date: {
    "english": "Date of Event",
    "spanish": "Fecha del Evento",
  },
  time: {
    "english": "Time of Event",
    "spanish": "Hora del Evento"
  },
  message: {
    "english": "Message",
    "spanish": "Mensaje",
  },
  personalize: {
    "english": "Personalize",
    "spanish": "Personalizar"
  },
  recommended: {
    "english": "Recommended",
    "spanish": "Recomendado",
  },
  language: {
    "english": "Language",
    "spanish": "Idioma"
  },
  contactFormWarning: {
    "english": "Note: By submitting the contact form, you agree to be contacted via the provided email or phone number.",
    "spanish": "Nota: Al enviar el formulario de contacto, aceptas ser contactado a través del correo electrónico o número de teléfono proporcionado.",
  },
  thankYou: {
    "english": "Thank you! We received your message and will follow up shortly!",
    "spanish": "¡Gracias! Recibimos tu mensaje y responderemos pronto.",
  },
};

export const phoneNumber: string = "(480) 658-7150"