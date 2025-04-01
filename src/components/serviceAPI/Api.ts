import axios from "axios";

// Работаем с сервисом (SWAPI The Star Wars API), url: https://swapi.dev/. Для тестирования ответа от API: https://swapi.dev/
const Base_URL = "https://swapi.dev/api/";

const Image_URL =
  "https://starwars-databank-server.vercel.app/api/v1/characters";

// Парсинг ответа на языке вууки
const parseWookieeResponse = (data: any) => {
  // Реальная реализация зависит от формата ответа SWAPI на вууки
  return {
    count: data.oaoohuwhao,
    results: data.rcwochuanaoc.map((char: any) => ({
      name: char.whrascwo,
      height: char.acwoahrracao,
      mass: char.scracc,
      birth_year: char.acooscwoohoorcanwa,
      gender: char.rrwowhwaworc,
    })),
  };
};

// Экземпляр axios для обработки ошибок
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
      ? `${Base_URL}people/?format=Wookiee&page=${page}`
      : `${Base_URL}people/?page=${page}`;

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

// Сделать условие для поиска по имени из SWAPI, и выдачей нужного изображения
export const fetchRandomCharacterImage = async () => {
  try {
    // Сначала получаем общее количество персонажей
    const countResponse = await axios.get(`${Image_URL}?limit=1`);
    const totalCount = countResponse.data.total;

    // Генерируем случайный индекс
    const randomIndex = Math.floor(Math.random() * totalCount);

    // Получаем случайного персонажа
    const response = await axios.get(
      `${Image_URL}?limit=1&skip=${randomIndex}`
    );

    if (response.data.data.length > 0) {
      return {
        image: response.data.data[0].image,
        description:
          response.data.data[0].description || "Нет нужного описания",
      };
    }
    return null;
  } catch (error) {
    console.error("Ошибка получения изображение персонажа:", error);
    return null;
  }
};
