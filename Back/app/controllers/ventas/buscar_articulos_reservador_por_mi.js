"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function buscarArticulosReservadosPorMi(req, res) {
  try {
    const idUsuario = req.auth.id;

    // const { idUsuario } = req.params;
    await schema.validateAsync(parseInt(idUsuario));

    const articulos = await repositorioVentas.obtenerReservadosPorMi(idUsuario);

    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}
module.exports = buscarArticulosReservadosPorMi;
