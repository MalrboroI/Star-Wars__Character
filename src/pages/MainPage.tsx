import React from "react";
import { useAppContext } from "../context/AppContext";
import Banner from "../../public/image/BannerComplete.svg";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  const { language } = useAppContext();

  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">
          {language === "Russian"
            ? "Добро пожаловать в Star Wars API"
            : "Oaoahuwhao wh Star Wars API"}
        </h1>
        <p className="home-page__description">
          {language === "Russian"
            ? "Найдите всех своих любимых персонажей"
            : "Scraan oaoahuwhao Star Wars"}
        </p>
        <p className="home-page__description">
          {language === "Russian"
            ? "Вы можете узнать всю информацию о ваших любимых персонажах"
            : "Вууууки"}
        </p>
        <Link to="/Characters" className="home-page__button">
          {language === "Russian"
            ? "Посмотреть персонажей"
            : "Oaoahuwhao rcwochuanaoc"}
        </Link>
            <img className="home-page__banner" src={Banner} alt="" />
      </div>
    </div>
  );
};

export default MainPage;
