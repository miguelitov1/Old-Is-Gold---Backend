"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const {
  crearUsuario,
  agregarCodigoDeVerificacion,
  buscarUsuarioPorEmail,
  buscarUsuarioPorNombreUsuario,
} = require("../../repositorios/repositorio-usuarios");
const crearErrorJson = require("../errores/crear-error-json");
const { enviarEmailDeRegistro } = require("../../email/smtp");

const schema = Joi.object().keys({
  nombre: Joi.string().alphanum().max(30).required(),
  apellidos: Joi.string().alphanum().max(30).required(),
  email: Joi.string().email().required(),
  contrasenha: Joi.string().min(8).max(20).required(),
  repetirContrasenha: Joi.ref("contrasenha"),
  nombreUsuario: Joi.string().alphanum().min(3).max(30).required(),
  localidad: Joi.string(),
});

async function registrarUsuario(req, res) {
  try {
    await schema.validateAsync(req.body);

    const {
      nombre,
      apellidos,
      email,
      contrasenha,
      nombreUsuario,
      localidad,
    } = req.body;
    const existeEmail = await buscarUsuarioPorEmail(email);
    if (existeEmail) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }
    const existeNombreUsuario = await buscarUsuarioPorNombreUsuario(
      nombreUsuario
    );
    if (existeNombreUsuario) {
      const error = new Error("El nombre de usuario ya esta en uso");
      error.status = 409;
      throw error;
    }
    const passwordHash = await bcrypt.hash(contrasenha, 12);

    const id = await crearUsuario(
      nombre,
      apellidos,
      email,
      passwordHash,
      nombreUsuario,
      localidad
    );

    const codigoVerificacion = cryptoRandomString({ length: 64 });
    // await enviarEmailDeRegistro(nombre, email, codigoVerificacion);
    await agregarCodigoDeVerificacion(id, codigoVerificacion);

    res
      .status(201)
      .send({ id, nombre, apellidos, email, nombreUsuario, localidad });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = registrarUsuario;
