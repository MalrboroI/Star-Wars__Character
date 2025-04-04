# 🚀 React + TypeScript + SCSS + Vite

Деплой проекта: https://startgwars.netlify.app/

Добро пожаловать в проект, разработанный на **React + TypeScript + SCSS**, с использованием сборщика **Vite** ⚡️ и библиотека готовых компонентов из MIU (Material Design).
components.  

Это адаптивное веб-приложение с карточками персонажей из вселенной Star Wars и множеством удобных фичей.

---

## 📦 Установка

1. Клонируйте репозиторий:
2. 
   git clone https://github.com/MalrboroI/Star-Wars__Character.git
   
   Установите зависимости: yarn install

   Запустите проект локально: yarn dev

🛠️ --Технологии и подходы--

🔀 Routing – реализована маршрутизация для масштабируемости и навигации;

📦 React Context – используется для управления состоянием;

📦 React useCallback - мемоизация функции рендеринга информации с API, предотвращая повторные создания при каждом рендере;

⏳ "Ленивая" загрузка – загружаются только некритичные ресурсы страницы до момента их появления в видимой области браузера;

🎯 Методология БЭМ – строгий нейминг классов стилей;

🧩 SCSS переменные и миксины – для быстрой стилизации и редактирования;

📱 Медиазапросы – адаптивность под разные экраны;

🔄 Фильтрация данных – убираются дубликаты данных из API с помощью метода .filter;

🔃 Пагинация – ограниченная загрузка новых карточек из API по кнопке (по 10 шт);

🌀 Спиннер – индикатор загрузки карточек и изображений;

🌍 Локализация на язык Вукки.

Проект поддерживает перевод интерфейса на язык Вукки 🌌
(меню и карточки также адаптируются)

📋 --Функционал карточек--

🧑‍🚀 Имя и краткая информация о персонаже;

📸 Кликабельная карточка открывает модальное окно с подробной информацией и фото с другого API (StarWars-databank);

🚻 В модалке отображается иконка пола персонажа (или скрывается, если информация отсутствует);

🔍 Фильтрация по полу с выпадающим списком(select):

мужчина
женщина
гермафродит
нет гендера

🧭 --Страницы приложения--

1. Главная страница: "/"

2. Навигационное меню, логотип, кнопка перехода к персонажам
3. 
   Страница с карточками: "/Characters"

4. Отображение карточек, смена языка, подгрузка новых
5. 
   Страница 404 "/404"

6. Отображается при ошибке сервера после 1.5 минуты ожидания

   Страница ошибки загрузки image "/Network_Error" (показывается, если изображения не были загружены с API)

🧭 --UI Особенности--

📊 Заголовок страницы с общим количеством персонажей;

📌 Фиксированный Header – отображается на всех страницах;

🔗 Активные кнопки навигации подсвечиваются по текущему URL.
