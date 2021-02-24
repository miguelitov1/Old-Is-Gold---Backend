"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function buscarVentasPorUsuario(req, res) {
  try {
    const idUsuarioAuth = req.auth.id;
    const { idUsuario } = req.params;
    await schema.validateAsync(parseInt(idUsuario));

    if (idUsuarioAuth !== parseInt(idUsuario)) {
      const error = new Error("No tiene permisos para realizar esta accion");
      error.status = 400;
      throw error;
    }

    const articulos = await repositorioVentas.obtenerVentasPorIdUsuario(
      idUsuario
    );

    if (!articulos) {
      const error = new Error("No has vendido ningun articulo");
      error.status = 400;
      throw error;
    }

    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}
module.exports = buscarVentasPorUsuario;
