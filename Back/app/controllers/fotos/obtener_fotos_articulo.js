"use strict";

const Joi = require("joi");
const repositorioFotos = require("../../repositorios/repositorio_fotos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function verArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;

    await schema.validateAsync(idArticulo);
    const fotos = await repositorioFotos.obtenerFotosArticulo(
      parseInt(idArticulo)
    );

    if (!fotos) {
      const error = new Error("Articulo no encontrado");
      error.status = 400;
      throw error;
    }

    res.send(fotos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verArticuloPorId;
