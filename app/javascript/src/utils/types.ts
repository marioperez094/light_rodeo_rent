export type userType = {
  username: string;
  password: string;
};

export type formFields = {
  name: string;
  label: string;
  autoComplete?: string;
  type?: string;
  wordCount?: boolean;
  textArea?: boolean;
  required?: boolean;
};

export type tagType = {
  id: number;
  english_name: string;
  spanish_name: string;
  inflatable: boolean;
};

export type serviceType = {
  id?: number;
  english_name: string;
  spanish_name: string;
  english_description: string;
  spanish_description: string;
  images: string[];
  dimensions: string;
};

export type cardType = {
  id: number;
  english_name: string;
  spanish_name: string;
  isCarousel: boolean;
  image_url: string;
};

export type languageType = {
  "english": string;
  "spanish": string;
}