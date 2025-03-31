import React from "react";
import LanguageToggle from "../components/Utils/LanguageToggle";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Star Wars API</h1>
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
