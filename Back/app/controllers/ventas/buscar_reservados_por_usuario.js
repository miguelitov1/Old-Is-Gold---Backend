"use strict";

const Joi = require("joi");
const repositorioVentas = require("../../repositorios/repositorio_ventas");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function buscarReservadosPorUsuario(req, res) {
  try {
    const idUsuario = req.auth.id;
    // const { idUsuario } = req.params;
    await schema.validateAsync(parseInt(idUsuario));

    // if (idUsuarioAuth !== parseInt(idUsuario)) {
    //   const error = new Error("No tiene permisos para realizar esta accion");
    //   error.status = 400;
    //   throw error;
    // }

    const articulos = await repositorioVentas.obtenerReservadosPorIdUsuario(
      idUsuario
    );

    if (!articulos) {
      const error = new Error("No te han reservado ningun articulo");
      error.status = 400;
      throw error;
    }

    res.send(articulos);
  } catch (err) {
    crearErrorJson(err, res);
  }
}
module.exports = buscarReservadosPorUsuario;
