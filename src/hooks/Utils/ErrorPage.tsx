import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const { language } = useAppContext();

  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__message">
          {language === "english"
            ? "Страница не найдена"
            : "Oaoahuwhao wh huwoohwa"}
        </p>
        <Link to="/" className="not-found-page__link">
          {language === "english" ? "Вернуться на главную" : "Oaoahuwhao rahow"}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
