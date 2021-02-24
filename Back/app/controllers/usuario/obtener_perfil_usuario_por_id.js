"use strict";

const Joi = require("joi");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function buscarUsuarioPorId(req, res) {
  try {
    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    const { idUsuario } = req.params; //se coge el id de la ruta
    await schema.validateAsync(idUsuario);
    const usuario = await repositorioUsuarios.buscarUsuarioPorId(
      parseInt(idUsuario)
    );

    if (!usuario) {
      const error = new Error("El usuario no existe");
      error.status = 400;
      throw error;
    }

    const imagen = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${usuario.foto}`;

    if (usuario.id === req.auth.id) {
      const { contrasenha, ...informacionUsuario } = usuario;
      res.send({ ...informacionUsuario, imagen });
    } else if (usuario.id !== req.auth.id) {
      const {
        nombre,
        apellidos,
        contrasenha,
        email,
        ...informacionUsuario
      } = usuario;
      res.send({ ...informacionUsuario, imagen });
    }
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = buscarUsuarioPorId;
