"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crear_error_json = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function mostrarValoracionesUsuario(req, res) {
  try {
    const { idUsuario } = req.params;
    await schema.validateAsync(idUsuario);

    const valoraciones = await repositorioVentas.buscarValoracionesPorIdVendedor(
      idUsuario
    );
    const promedio = await repositorioVentas.obtenerPromedioValoracion(
      idUsuario
    );
    const nroValoraciones = await repositorioVentas.obtenerCantidadDeValoraciones(
      idUsuario
    );
    res.send({ nroValoraciones, promedio, valoraciones });
  } catch (err) {
    crear_error_json(err, res);
  }
}

module.exports = mostrarValoracionesUsuario;
