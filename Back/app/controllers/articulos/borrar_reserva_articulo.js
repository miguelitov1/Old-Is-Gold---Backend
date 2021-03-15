"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const { enviarEmailDeCancelacionReserva } = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");

const schemaId = Joi.number().positive().required();

async function borrarReservaArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    const idUsuario = req.auth.id;
    await schemaId.validateAsync(idArticulo);
    await schemaId.validateAsync(idUsuario);

    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Artículo no encontrado");
      error.status = 400;
      throw error;
    }

    const comprador = await repositorioUsuarios.buscarUsuarioPorId(
      articulo.id_usuario_comprador
    );

    if (articulo.id_usuario === idUsuario) {
      await repositorioArticulos.borrarReservaArticuloPorId(idArticulo);
      await enviarEmailDeCancelacionReserva(
        comprador.nombre,
        comprador.email,
        articulo.titulo
      );
      res.status(200).send({
        respuesta:
          "Se ha anulado la reserva y se le ha notificado al usuario sobre la cancelacion de su reserva",
      });
    } else if (
      anularReserva === 1 &&
      articulo.id_usuario_comprador === idUsuario
    ) {
      await repositorioArticulos.borrarReservaArticuloPorId(idArticulo);
      res.status(200).send("Se ha anulado la reserva del articulo");
    } else if (
      articulo.id_usuario !== idUsuario &&
      articulo.id_usuario_comprador !== idUsuario
    ) {
      const error = new Error("No tiene permitio realizar esta acción");
      error.status = 400;
      throw error;
    }
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = borrarReservaArticuloPorId;
