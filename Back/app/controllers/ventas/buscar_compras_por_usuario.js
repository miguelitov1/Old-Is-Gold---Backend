"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crear_error_jason = require("../errores/crear_error_json");

// const schema = Joi.number().positive().required();

async function buscarComprasPorUsuario(req, res) {
  try {
    const idUsuario = req.auth.id;
    // await schema.validateAsync(idUsuario);

    // if (idUsuario !== parseInt(req.params.idUsuario)) {
    //   const error = new Error("No tiene permisos para realizar esta accion");
    //   error.status = 400;
    //   throw error;
    // }

    const articulos = await repositorioVentas.obtenerComprasPorIdUsuario(
      idUsuario
    );

    if (!articulos) {
      const error = new Error("Aún no has comprado ningun articulo");
      error.status = 400;
      throw error;
    }

    res.send(articulos);
  } catch (err) {
    crear_error_jason(err, res);
  }
}

module.exports = buscarComprasPorUsuario;
