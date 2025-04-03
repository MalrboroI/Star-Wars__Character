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
            : "Waww'rrra grrraakk hrrr Star Wars API"}
        </h1>
        <p className="home-page__description">
          {language === "Russian"
            ? "Вы можете узнать всю информацию о ваших любимых персонажах"
            : "Rraaarrr! Wrrroooah, hurrrrggh aaahh grruuummm naash wookee wrryya!"}
        </p>
      </div>
      <Link to="/Characters" className="home-page__button">
        {language === "Russian"
          ? "Посмотреть персонажей"
          : "Rrrrrr! Wrrrawrr hwwurragrr!"}
      </Link>
      <img className="home-page__banner" src={Banner} alt="" />
    </div>
  );
};

export default MainPage;
