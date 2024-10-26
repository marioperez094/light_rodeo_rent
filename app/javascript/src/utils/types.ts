export type languageType = {
  "English": string;
  "Espanol": string;
};

export type tagType = {
  id: number;
  english_name: string;
  spanish_name: string;
  inflatable: boolean;
};

export type serviceType = {
  english_name: string;
  spanish_name: string;
  english_description: string;
  spanish_description: string;
  dimensions: string;
};

export type cardType = {
  id: number;
  english_name: string;
  spanish_name: string;
  isCarousel: boolean;
  image_url: string;
};