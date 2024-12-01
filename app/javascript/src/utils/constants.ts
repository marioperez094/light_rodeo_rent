import { languageType } from "./types";

export const logo: string = `https://${ process.env.PHOTO_UPLOAD_BUCKET }.s3.us-east-1.amazonaws.com/Logos+and+images/light_rodeo_logo.png`;

export const frontPageText: {
  [key: string]: languageType;
} = {
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
  }
}

export const generalServices: {
  [key: string]: languageType
} = {
  services: {
    "english": "Services",
    "spanish": "Servicios",
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
  }
};