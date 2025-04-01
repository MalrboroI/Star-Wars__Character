import React from "react";
import { NavLink } from "react-router-dom";
import LanguageToggle from "../components/Utils/LanguageToggle";
import Logo from "../../public/image/Logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img src={Logo} alt="Logo Star Wars" />
        </NavLink>
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
