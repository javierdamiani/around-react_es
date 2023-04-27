import React from "react";
import logo from '../images/header__logo.svg';
import line from '../images/line.svg';

function Header(){
    return (
        <>
        <header className="header">
        <img
          src={logo}
          alt="Around the U.S."
          className="header__logo"
        />
        <img
          src={line}
          alt="Linea que divide el header"
          className="header__line"
        />
      </header>
        </>
    )
}

export default Header