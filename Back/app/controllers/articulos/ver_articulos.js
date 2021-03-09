"use strict";

const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crearErrorJson = require("../errores/crear_error_json");

async function verTodosLosArticulos(req, res) {
  try {
    const articulos = await repositorioArticulos.verTodosLosArticulos();

    res.status(200).send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verTodosLosArticulos;
