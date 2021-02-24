"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function verArticuloPorCategoria(req, res) {
  try {
    const { idCategoria } = req.params;

    await schema.validateAsync(idCategoria);
    const articulosPorCategoria = await repositorioArticulos.buscarArticulosPorCategoria(
      parseInt(idCategoria)
    );

    if (!articulosPorCategoria) {
      const error = new Error("Categoria no disponible");
      error.status = 400;
      throw error;
    }

    res.send(articulosPorCategoria);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verArticuloPorCategoria;
