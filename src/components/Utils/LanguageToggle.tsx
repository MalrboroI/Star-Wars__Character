import React from "react";
import { useAppContext } from "../../context/AppContext";

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useAppContext();

  return (
    <div className="language-toggle">
      <button
        className="language-toggle__button"
        onClick={toggleLanguage}
        aria-label={
          language === "english"
            ? "Переключить на вуки"
            : "Переключить на английский"
        }
      >
        <span className="language-toggle__indicator">
          {language === "english" ? "🌍 Wookiee" : "🌎 English"}
        </span>
      </button>
      <div className="language-toggle__status">
        {language === "english" ? "Текущий: English" : "Текущий: Wookiee"}
      </div>
    </div>
  );
};

export default LanguageToggle;
