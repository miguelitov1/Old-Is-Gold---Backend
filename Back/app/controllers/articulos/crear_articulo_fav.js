"use strict";

const { async } = require("crypto-random-string");
const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function crearArticuloFav(req, res) {
  try {
    const id_usuario = req.auth.id;
    await schema.validateAsync(id_usuario);

    const { idArticulo } = req.params;

    await schema.validateAsync(idArticulo);
    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Articulo no encontrado");
      error.status = 400;
      throw error;
    }

    await repositorioArticulos.crearArticuloFav(idArticulo, id_usuario);

    res.status(201).send("El articulo se ha agregado a sus favoritos!");
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = crearArticuloFav;
