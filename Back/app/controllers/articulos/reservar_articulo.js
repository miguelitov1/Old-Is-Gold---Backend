"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const { enviarEmailDeReserva } = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");

const schemaId = Joi.number().positive().required();

async function reservarArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    const idComprador = req.auth.id;
    await schemaId.validateAsync(idArticulo);
    await schemaId.validateAsync(idComprador);

    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Artículo no encontrado");
      error.status = 400;
      throw error;
    }

    const vendedor = await repositorioUsuarios.buscarUsuarioPorId(
      articulo.id_usuario
    );

    const { reservar } = req.body;

    if (
      reservar === 1 &&
      articulo.id_usuario_comprador === null &&
      articulo.id_usuario !== idComprador
    ) {
      repositorioArticulos.reservarArticuloPorId(idArticulo, idComprador);
      await enviarEmailDeReserva(
        vendedor.nombre,
        vendedor.email,
        articulo.titulo,
        idArticulo
      );
      res
        .status(200)
        .send("El articulo se ha reservado y se le ha notificado al vendedor.");
    } else if (articulo.id_usuario_comprador !== null) {
      const error = new Error("El artículo ya se encuentra reservado");
      error.status = 400;
      throw error;
    } else if (articulo.id_usuario === idComprador) {
      const error = new Error("No puedes reservar tu propio artículo");
      error.status = 400;
      throw error;
    }
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = reservarArticuloPorId;
