"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const { enviarEmailDeRegistro } = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");
const cryptoRandomString = require("crypto-random-string");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  contrasenha: Joi.string().min(8).max(30).required(),
});

async function iniciarSesionUsuario(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { email, contrasenha } = req.body;

    const usuario = await repositorioUsuarios.buscarUsuarioPorEmail(email);

    if (!usuario) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    if (!usuario.verificadoEn) {
      const error = new Error(
        "El usuario no ha sido verificado aún, hemos enviado un mail nuevamente a su cuenta para verificar su usuario"
      );
      const codigoDeVerificacion = cryptoRandomString({ length: 64 });
      await enviarEmailDeRegistro(
        usuario.nombre,
        usuario.email,
        codigoDeVerificacion
      );
      await repositorioUsuarios.borrarViejoCodigoDeVerificacion(usuario.id);
      await repositorioUsuarios.agregarCodigoDeVerificacion(
        usuario.id,
        codigoDeVerificacion
      );
      error.status = 403;
      throw error;
    }

    const validarContrasenha = await bcrypt.compare(
      contrasenha,
      usuario.contrasenha
    );

    if (!validarContrasenha) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id, nombre, nombreUsuario, localidad, foto, apellidos } = usuario;
    const jwtTokenExpiration = "30d";
    const payload = {
      id,
      nombre,
      nombreUsuario,
      localidad,
      foto,
      email,
      apellidos,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const responde = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.status(200).send(responde);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = iniciarSesionUsuario;
