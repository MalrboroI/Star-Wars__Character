import axios from "axios";
import { WookieeCharacter, Character } from "../../globalTypes/Types";

// Работаем с сервисом (SWAPI The Star Wars API), url: https://swapi.dev/documentation. Для тестирования ответа от API: https://swapi.dev/

//Для перевода на язык Вууки(Шайривук) используем: https://anythingtranslate.com/translators/shyriiwook-star-wars-languages-translator/

const Base_URL = "https://swapi.dev/api/";

const Image_URL =
  "https://starwars-databank-server.vercel.app/api/v1/characters";

// Парсинг ответа на языке вууки

const parseWookieeResponse = (data: WookieeCharacter) => {
  //   // Реальная реализация зависит от формата ответа SWAPI на вууки
  return {
    count: data.oaoohuwhao,
    results: data.rcwochuanaoc.map((char: WookieeCharacter) => ({
      name: char.whrascwo,
      height: char.acwoahrracao,
      mass: char.scracc,
      birth_year: char.acooscwoohoorcanwa,
      gender: char.rrwowhwaworc,
    })),
  };
};

// Экземпляр axios для обработки ошибки загрузки (по времени)
const api = axios.create({
  baseURL: Base_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      throw new Error("Превышено время ожидания ответа от сервера");
    }
    if (error.code === "ERR_NETWORK") {
      throw new Error("Ошибка сети. Проверьте подключение к интернету");
    }
    throw error;
  }
);

// Конфигурация axios с таймаутом и повторными попытками // Нужна ли она?

// const api = axios.create({
//   timeout: 10000,
//   retry: 3,
//   retryDelay: 1000,
// });
// api.interceptors.response.use(undefined, (error) => {
//   const config = error.config;
//   if (!config || !config.retry) return Promise.reject(error);

export const fetchCharacters = async (
  page: number = 1,
  language: "Russian" | "Wookiee" = "Russian"
) => {
  const url =
    language === "Wookiee"
      ? `${Base_URL}people/${page}/?format=wookiee`
      : `${Base_URL}people/?page=${page}`;
  // people/?page=${page}
  // `${Base_URL}people/${page}/?format=wookiee` people/1/?format=wookiee
  try {
    const response = await axios.get(url);
    return language === "Wookiee"
      ? parseWookieeResponse(response.data)
      : response.data;
  } catch (error) {
    console.error("Ошибка при загрузке персонажей:", error);
    throw error;
  }
};

// Сделать условие для поиска по имени из SWAPI, и выдачей нужного изображения!!!!!!!

export const fetchCharacterImage = async (characterName: string) => {
  try {
    // Ищем персонажа по точному имени
    const response = await axios.get(
      `${Image_URL}?name=${encodeURIComponent(characterName)}`
    );

    if (response.data.data.length > 0) {
      // Находим точное совпадение имени
      const exactMatch = response.data.data.find(
        (char: Character) =>
          char.name.toLowerCase() === characterName.toLowerCase()
      );

      const characterData = exactMatch || response.data.data[0];

      return {
        image: characterData.image,
        description: characterData.description || "Нет описания",
      };
    }
    return null;
  } catch (error) {
    console.error("Ошибка получения изображения персонажа:", error);
    return null;
  }
};
