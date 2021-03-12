"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crearErrorJson = require("../errores/crear_error_json");

// const schema = Joi.number().positive().required();

async function buscarVentasPorUsuario(req, res) {
  try {
    const idUsuario = req.auth.id;

    // await schema.validateAsync(parseInt(idUsuario));

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
