"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crear_error_json = require("../errores/crear_error_json");

const schema = Joi.object().keys({
  respuesta: Joi.string().min(5).max(255),
});

const schemaId = Joi.number().positive().required();

async function agregarRespuestaVendedor(req, res) {
  try {
    const idVendedor = req.auth.id;
    const { idArticulo } = req.params;

    await schemaId.validateAsync(parseInt(idArticulo));
    await schema.validateAsync(req.body);
    const { respuesta } = req.body;

    const vendedorIdPorArticulo = await repositorioVentas.buscarIdVendedorPorIdArticulo(
      parseInt(idArticulo)
    );

    const compra = await repositorioVentas.buscarValoracionPorIdArticulo(
      parseInt(idArticulo)
    );

    if (!compra) {
      const error = new Error("No existe este articulo en ventas");
      error.status = 400;
      throw error;
    }

    if (vendedorIdPorArticulo !== idVendedor) {
      const error = new Error("No tienes permiso para realizar esta acción");
      error.status = 400;
      throw error;
    }

    const idRespuesta = await repositorioVentas.agregarRespuestaVendedor(
      parseInt(idArticulo),
      compra.id_comprador,
      respuesta
    );

    res.send({
      idRespuesta,
      idArticulo,
      idVendedor,
      respuesta,
    });
  } catch (err) {
    crear_error_json(err, res);
  }
}

module.exports = agregarRespuestaVendedor;
