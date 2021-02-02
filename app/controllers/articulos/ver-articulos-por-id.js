"use strict";

const Joi = require("joi");
const { buscarPorId } = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

const schema = Joi.number().positive().required();

async function verArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;

    await schema.validateAsync(id);
    const articulo = await buscarPorId(parseInt(id));

    if (!articulo) {
      const error = new Error("Articulo no disponible");
      error.status = 400;
      throw error;
    }

    res.send(articulo);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verArticuloPorId;
