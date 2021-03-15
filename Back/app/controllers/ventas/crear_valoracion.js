"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crear_error_json = require("../errores/crear_error_json");

const schema = Joi.object().keys({
  valoracion: Joi.number().min(1).max(5).required(),
  comentarioValoracion: Joi.string().min(5).max(255),
});

const schemaId = Joi.number().positive().required();

async function crearValoracion(req, res) {
  try {
    const idComprador = req.auth.id;
    const { idArticulo } = req.params;

    await schemaId.validateAsync(parseInt(idArticulo));
    await schema.validateAsync(req.body);
    const { valoracion, comentarioValoracion } = req.body;

    const compra = await repositorioVentas.buscarValoracionPorIdArticulo(
      parseInt(idArticulo)
    );
    if (!compra) {
      const error = new Error("No existe ese articulo");
      error.status = 400;
      throw error;
    }

    if (compra.valoracion) {
      const error = new Error("Ya se ha valorado este articulo");
      error.status = 400;
      throw error;
    }

    if (compra.id_comprador !== idComprador) {
      const error = new Error("No tienes permiso para realizar esta acción");
      error.status = 400;
      throw error;
    }

    const idValoracion = await repositorioVentas.crearValoracion(
      parseInt(idArticulo),
      idComprador,
      valoracion,
      comentarioValoracion
    );

    res.send({
      idValoracion,
      idArticulo,
      idComprador,
      valoracion,
      comentarioValoracion,
    });
  } catch (err) {
    crear_error_json(err, res);
  }
}
module.exports = crearValoracion;
