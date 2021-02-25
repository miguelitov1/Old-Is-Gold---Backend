//rfc

import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <header className="container">
      <img src="logo.jpg" alt="imgPerfil" />

      <form className="container2">
        <img className="lupa" src="lupa.png" alt="lupa" />
        <input type="text" placeholder="¿Que estás buscando?"></input>
      </form>

      <img src="menu.png" alt="menu" />
      <a href="#">Vender</a>
    </header>
  );
};
