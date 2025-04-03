import React from "react";
import { NavLink } from "react-router-dom";
import LanguageToggle from "./Module/LanguageToggle";
import Navigation from "./Module/Navigation";
import Logo from "../image/Logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          <img src={Logo} alt="Logo Star Wars" />
        </NavLink>
        <Navigation />
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
