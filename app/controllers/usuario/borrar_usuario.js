"use strict";

const Joi = require("joi");
const repositorioUsuario = require("../../repositorios/repositorio-usuarios");
const crearErrorJson = require("../errores/crear-error-json");

const schema = Joi.number().positive();

async function borrarUsuarioPorId(req, res) {
  try {
    const { id } = req.params;
    const idUsuario = req.auth.id;
    const usuario = await repositorioUsuario.buscarUsuarioPorId(parseInt(id));
    await schema.validateAsync(id);

    if (!usuario) {
      const error = new Error("Usuario no existente");
      error.status = 400;
      throw error;
    }

    if (usuario.id !== idUsuario /* && req.auth.role !== 'admin'*/) {
      const error = new Error("No tienes permiso para realizar esta accion");
      error.status = 403;
      throw error;
    }
    const reviews = await repositorioUsuario.borrarUsuarioPorId(id);

    res.status(204).send();
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarUsuarioPorId;
