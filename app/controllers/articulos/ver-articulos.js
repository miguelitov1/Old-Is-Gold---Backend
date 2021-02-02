"use strict";
const { verTodo } = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

async function getArticulos(req, res) {
  try {
    const articulos = await verTodo();

    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = getArticulos;
