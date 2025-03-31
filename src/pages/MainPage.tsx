import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  const { language } = useAppContext();

  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">
          {language === "english"
            ? "Добро пожаловать в Star Wars API"
            : "Oaoahuwhao wh Star Wars API"}
        </h1>
        <p className="home-page__description">
          {language === "english"
            ? "Найдите всех своих любимых персонажей"
            : "Scraan oaoahuwhao Star Wars"}
        </p>
        <p className="home-page__description">
          {language === "english"
            ? "Вы можете узнать всю информацию о ваших любимых персонажах"
            : "Вууууки"}
        </p>
        <Link to="/characters" className="home-page__button">
          {language === "english"
            ? "Посмотреть персонажей"
            : "Oaoahuwhao rcwochuanaoc"}
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
