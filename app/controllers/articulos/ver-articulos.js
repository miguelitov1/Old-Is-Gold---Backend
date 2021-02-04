"use strict";
const repositorioArticulos = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

async function verTodosLosArticulos(req, res) {
  try {
    const articulos = await repositorioArticulos.verTodosLosArticulos();

    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verTodosLosArticulos;
