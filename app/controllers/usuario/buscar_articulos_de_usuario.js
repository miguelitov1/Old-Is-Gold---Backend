"use strict";

const Joi = require("joi");
const repositorioUsuarios = require("../../repositorios/repositorio-usuarios");
const repositorioArticulos = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

const schema = Joi.number().positive();

//para ver todos los articulos publicados por el usuario que esta logueado.
async function buscarArticulosPorIdUsuario(req, res) {
  try {
    const { idUsuario } = req.params;
    await schema.validateAsync(parseInt(idUsuario));

    const usuario = await repositorioUsuarios.buscarUsuarioPorId(idUsuario);

    if (!usuario) {
      const error = new Error("Usuario no existe");
      error.status = 400;
      throw error;
    }

    const articulosUsuario = await repositorioArticulos.buscarArticulosPorIdUsuario(
      idUsuario
    );
    res.send(articulosUsuario);
  } catch (err) {
    crearErrorJson(err, res);
  }
}
module.exports = buscarArticulosPorIdUsuario;
