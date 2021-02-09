"use strict";

const Joi = require("joi");
const repositorioUsuario = require("../../repositorios/repositorio_usuarios");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive();

async function borrarUsuarioPorId(req, res) {
  try {
    const { idUsuario } = req.params;
    const idUsuarioAuth = req.auth.id;
    const usuario = await repositorioUsuario.buscarUsuarioPorId(
      parseInt(idUsuario)
    );
    await schema.validateAsync(idUsuario);

    if (!usuario) {
      const error = new Error("Usuario no existente");
      error.status = 400;
      throw error;
    }

    if (usuario.id !== idUsuarioAuth /* && req.auth.role !== 'admin'*/) {
      const error = new Error("No tienes permiso para realizar esta accion");
      error.status = 403;
      throw error;
    }
    const reviews = await repositorioUsuario.borrarUsuarioPorId(idUsuario);

    //tendria que borrar el token aqui, porque sino el usuario puede serguir haciendo cosas privadas.

    res.status(204).send();
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarUsuarioPorId;
