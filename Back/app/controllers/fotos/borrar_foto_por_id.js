"use strict";

const Joi = require("joi");
const repositorioFotos = require("../../repositorios/repositorio_fotos");
const crearErrorJson = require("../errores/crear_error_json");

const schemaId = Joi.number().positive().required();

async function borrarFotoPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    const id_usuario = req.auth.id;

    await schemaId.validateAsync(idArticulo);
    const fotoABorrar = await repositorioFotos.buscarUsuarioPorIdFoto(
      parseInt(idArticulo)
    );

    if (!fotoABorrar[0]) {
      const error = new Error("Foto no encontrada");
      error.status = 400;
      throw error;
    }

    if (fotoABorrar[0].id_usuario !== id_usuario) {
      const error = new Error("No tienes permiso para borrar este articulo");
      error.status = 400;
      throw error;
    }

    const fotoBorrada = await repositorioFotos.borrarFotoPorId(idArticulo);

    res.status(200).send(fotoBorrada);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarFotoPorId;
