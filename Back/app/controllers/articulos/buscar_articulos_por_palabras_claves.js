"use strict";

const { string } = require("joi");
const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.string().required();

async function verArticulosPorPalabrasClaves(req, res) {
  try {
    const { palabrasClaves } = req.body;

    const arrayPalabrasClaves = palabrasClaves.toLowerCase().split(" ");
    let stringBusqueda = arrayPalabrasClaves.reduce((string, palabra) => {
      string = string + `"%${palabra}%" OR titulo LIKE `;
      return string;
    }, "");
    stringBusqueda = stringBusqueda.slice(0, -16);
    console.log(stringBusqueda);
    const articulos = await repositorioArticulos.verArticulosPorPalabrasClaves(
      stringBusqueda
    );
    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verArticulosPorPalabrasClaves;
