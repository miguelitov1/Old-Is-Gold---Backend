"use strict";

const Joi = require("joi");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive();

async function obtenerVentasUsuario(req, res) {
  try {
    const { idUsuario } = req.params;
    await schema.validateAsync(parseInt(idUsuario));

    const ventas = await repositorioUsuarios.obtenerVentasUsuario(idUsuario);

    // if (!ventas) {
    //   const error = new Error("No se han registrado ventas en este usuario");
    //   error.status = 400;
    //   throw error;
    // }

    res.send(ventas);
  } catch (err) {
    crearErrorJson(err, res);
  }
}
module.exports = obtenerVentasUsuario;
