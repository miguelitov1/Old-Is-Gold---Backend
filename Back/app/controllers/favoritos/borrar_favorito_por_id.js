"use strict";

const Joi = require("joi");
const repositorioFavoritos = require("../../repositorios/repositorio_favoritos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function borrarArticuloFavoritoPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    await schema.validateAsync(idArticulo);
    const id_usuario = req.auth.id;

    const favorito = await repositorioFavoritos.buscarArticuloFavoritoPorId(
      idArticulo
    );

    if (!favorito) {
      const error = new Error("favorito no existe");
      error.status = 400;
      throw error;
    }

    if (favorito.id_usuario !== id_usuario) {
      const error = new Error("No tienes permisos para realizar esta acción");
      error.status = 403;
      throw error;
    }

    await repositorioFavoritos.borrarArticuloFavoritoPorId(
      idArticulo,
      id_usuario
    );

    res.send({ message: `Favorito id:${idArticulo} borrado` });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarArticuloFavoritoPorId;
