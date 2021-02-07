"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const { enviarEmailDeRegistro } = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.object().keys({
  nombre: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
  apellidos: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
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

    const existeEmail = await repositorioUsuarios.buscarUsuarioPorEmail(email);
    if (existeEmail) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const existeNombreUsuario = await repositorioUsuarios.buscarUsuarioPorNombreUsuario(
      nombreUsuario
    );
    if (existeNombreUsuario) {
      const error = new Error("El nombre de usuario ya está en uso");
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(contrasenha, 12);

    const id = await repositorioUsuarios.crearUsuario(
      nombre,
      apellidos,
      email,
      passwordHash,
      nombreUsuario,
      localidad
    );

    const codigoVerificacion = cryptoRandomString({ length: 64 });
    await enviarEmailDeRegistro(nombre, email, codigoVerificacion);
    await repositorioUsuarios.agregarCodigoDeVerificacion(
      id,
      codigoVerificacion
    );

    res
      .status(201)
      .send({ id, nombre, apellidos, email, nombreUsuario, localidad });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = registrarUsuario;
