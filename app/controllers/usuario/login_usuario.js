"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  buscarUsuarioPorEmail,
} = require("../../repositorios/repositorio-usuarios");
const crearErrorJson = require("../errores/crear-error-json");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  contrasenha: Joi.string().min(8).max(30).required(),
});

async function loginUsuario(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { email, contrasenha } = req.body;

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario /*|| !usuario.verificadoEn*/) {
      const error = new Error(
        "El usuario o la contraseña no son correctos, o su cuenta aún sigue sin verificar"
      );
      error.status = 403;
      throw error;
    }

    const validarContrasenha = await bcrypt.compare(
      contrasenha,
      usuario.contrasenha
    );
    if (!validarContrasenha) {
      const error = new Error(
        "El usuario o la contraseña no son correctos, o su cuenta aún sigue sin verificar"
      );
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id, nombre, nombreUsuario, localidad } = usuario;
    const jwtTokenExpiration = "30m";
    const payload = {
      id,
      nombre,
      nombreUsuario,
      localidad,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const responde = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(responde);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = loginUsuario;
