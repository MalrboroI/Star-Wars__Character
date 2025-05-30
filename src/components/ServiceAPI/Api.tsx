import axios from "axios";
import { WookieeCharacter, Character } from "../../globalTypes/Types";

// Работаем с сервисом (SWAPI The Star Wars API), url: https://swapi.dev/documentation. Для тестирования ответа от API: https://swapi.dev/

//Для перевода элементов меню на язык Вууки(Шайривук) используем: https://anythingtranslate.com/translators/shyriiwook-star-wars-languages-translator/

const Base_URL = "https://swapi.dev/api/";

// Изображение с API "starwars-databank"
const Image_URL =
  "https://starwars-databank-server.vercel.app/api/v1/characters/name/";

// запрос в axios для обработки ошибки загрузки (по времени)
const Api = axios.create({
  baseURL: Base_URL,
  timeout: 90000,
});

Api.interceptors.response.use(
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

export const FetchCharacters = async (
  page: number = 1,
  language: "Russian" | "Wookiee" = "Russian"
): Promise<{
  count: number;
  results: Character[];
  next: string | null;
}> => {
  if (language === "Wookiee") {
    const results: Character[] = [];
    for (let i = (page - 1) * 10; i <= page * 10; i++) {
      try {
        const response = await Api.get<WookieeCharacter>(
          `${Base_URL}people/${i}/?format=wookiee`
        );
        results.push({
          name: response.data.whrascwo,
          height: response.data.acwoahrracao,
          mass: response.data.scracc,
          birth_year: response.data.rhahrcaoac_roworarc,
          gender: response.data.rrwowhwaworc,
        });
      } catch (error) {
        console.error(`Ошибка при загрузке описание для Вууки ${i}:`, error);
        continue;
      }
    }

    return {
      count: 82,
      results,
      next: page * 10 < 82 ? `page=${page + 1}` : null,
    };
  } else {
    const response = await Api.get(`${Base_URL}people/?page=${page}`);
    return response.data;
  }
};


// Для поиска по имени, для добавления изображения, полчучим из комп. "Modal" имя персонажа, и возьмем только фото и описание

export const FetchCharacterImage = async (characterName: string) => {
  try {
    //Для передачи запроса, и корректного URL закодируем полученное имя и отправим запрос
    const response = await Api.get(
      `${Image_URL}${encodeURIComponent(characterName)}`
    );
    console.log(encodeURIComponent(characterName));
    if (response.data?.length > 0) {
      // Ищем точное совпадение по имени, для избежания ошибок (в нижнем регист.)
      const exactMatch = response.data.find(
        (char: Character) =>
          char.name.toLowerCase() === characterName.toLowerCase()
      );
      const characterData = exactMatch || "Изображение не найдено";

      return {
        image: characterData.image,
        description: characterData.description || "Нет описания",
        name: characterData.name,
      };
    }
    return null;
  } catch (error) {
    console.error("Ошибка получения изображения персонажа:", error);
    return null;
  }
};
