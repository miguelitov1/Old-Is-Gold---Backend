import React from "react";

export const Header = () => {
  return (
    <header className="container">
      <img src="logo.jpg" alt="imgPerfil" />
      <img src="lupa.png" alt="lupa" />
      <form>
        <input type="text" placeholder="Buscar..."></input>
      </form>

      <img src="menu.png" alt="menu" />
      <a href="#">Vender</a>
    </header>
  );
};
