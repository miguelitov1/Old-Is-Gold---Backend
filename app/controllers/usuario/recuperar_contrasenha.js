"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const mail = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.string().email().required();

async function enviarMailRecuperarContraseña(req, res) {
  try {
    await schema.validateAsync(req.body);
    const email = req.body;

    const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email);
    if (!usuario) {
      const error = new Error("No existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const codigoVerificacion = repositorioUsuarios.buscarCodigoVerificacionPorIdUsuario(
      usuario.id
    );

    await mail.enviarMailRecuperarContrasenha(
      usuario.nombre,
      usuario.email,
      codigoVerificacion
    );
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = enviarMailRecuperarContraseña;
