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
          language === "Russian"
            ? "Переключить на вуки"
            : "Переключить на русский"
        }
      >
        <span className="language-toggle__indicator">
          {language === "Russian" ? "🌍 Wookiee" : "🌍 Russian"}
        </span>
      </button>
      <div className="language-toggle__status">
        {language === "Russian" ? "Текущий: Russian" : "Текущий: Wookiee"}
      </div>
    </div>
  );
};

export default LanguageToggle;
