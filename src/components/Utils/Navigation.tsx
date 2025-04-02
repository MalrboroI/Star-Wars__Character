import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Navigation: React.FC = () => {
  const { language } = useAppContext();

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item separator">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link--active" : ""}`
            }
          >
            {language === "Russian" ? "Главная" : "Rahow"}
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/Characters"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link--active" : ""}`
            }
          >
            {language === "Russian" ? "Персонажи" : "Rcwochuanaoc"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
