"use strict";

const Joi = require("joi");
const {
  buscarUsuarioPorId,
} = require("../../repositorios/repositorio-usuarios");
const crearErrorJson = require("../errores/crear-error-json");

async function obtenerPerfilDeUsuario(req, res) {
  try {
    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;

    const idUsuario = req.auth.id; //se coge el id del accessToken

    const usuario = await buscarUsuarioPorId(idUsuario);

    const imgagen = `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${usuario.image}`;
    const { contrasenha, ...informacionUsuario } = usuario;

    res.send({ ...informacionUsuario, imagen });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = obtenerPerfilDeUsuario;
