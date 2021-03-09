"use strict";

const Joi = require("joi");
const repositorioFotos = require("../../repositorios/repositorio_fotos");
const crearErrorJson = require("../errores/crear_error_json");

const schemaId = Joi.number().positive().required();

async function borrarFotoPorIdFoto(req, res) {
  try {
    const { idFoto } = req.params;
    const id_usuario_logueado = req.auth.id;
    const usuario_Propietario_Foto = await repositorioFotos.buscarUsuarioPorIdFoto(
      idFoto
    );

    if (usuario_Propietario_Foto[0].id_usuario !== id_usuario_logueado) {
      const error = new Error("No tienes permiso para borrar esta foto");
      error.status = 400;
      throw error;
    }
    await schemaId.validateAsync(idFoto);
    await repositorioFotos.borrarFotoPorId(parseInt(idFoto));

    res.status(200).send("foto borrada con exito");
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarFotoPorIdFoto;
