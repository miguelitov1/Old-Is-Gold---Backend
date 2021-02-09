"use strict";

const Joi = require("joi");
const repositorioFavoritos = require("../../repositorios/repositorio_favoritos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function obtenerArticulosFavoritosPorUsuario(req, res) {
  try {
    // const { idArticulo } = req.params;
    const id_usuario = req.auth.id;
    await schema.validateAsync(id_usuario);
    const favoritos = await repositorioFavoritos.obtenerArticulosFavoritosPorUsuario(
      parseInt(id_usuario)
    );

    if (!favoritos) {
      const error = new Error("Articulo no encontrado");
      error.status = 400;
      throw error;
    }

    res.send(favoritos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = obtenerArticulosFavoritosPorUsuario;
