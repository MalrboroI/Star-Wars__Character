export type Nullable<T> = T | null;

// Типы для API на английском языке
export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  image?: string;
}
// Типы для API на языке вуки
export interface WookieeCharacter {
  whrascwo: string; // name
  acwoahrracao: string; // height
  scracc: string; // mass
  rhahrcaoac_roworarc: string; // birth_year
  rrwowhwaworc: string; // gender
}

export interface AppContextType {
  language: "Russian" | "Wookiee";
  toggleLanguage: () => void;
}

// Типы для компонентов
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  character: Nullable<Character>;
}

// Типы для карточек
export interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

// Типы для фильтров
export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterProps {
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}
