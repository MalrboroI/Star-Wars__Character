export type Nullable<T> = T | null;

export type Dictionary<T> = {
  [key: string]: T;
};

// Типы для API
export interface ApiResponse<T> {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: T[];
}

// Убрать лишнее
export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
  id: number;
  image?: string;
}

// Типы для фильтров
export interface FilterOption {
  value: string;
  label: string;
}

// Типы для контекста
export type AppLanguage = "Russian" | "Wookiee";

export interface AppContextType {
  language: AppLanguage;
  toggleLanguage: () => void;
}

// Типы для компонентов
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  character: Nullable<Character>;
}

export interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export interface FilterProps {
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

// Типы для страниц
export interface CharactersPageParams {
  page?: string;
}

// Типы для стилей
// export type CSSClass = string;

// Типы для API на языке вуки
export interface WookieeCharacter {
  whrascwo: string; // name
  acwoahrracao: string; // height
  scracc: string; // mass
  acooscwoohoorcanwa: string; // birth_year
  rrwowhwaworc: string; // gender
}
