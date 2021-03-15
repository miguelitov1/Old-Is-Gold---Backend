"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const repositorioUsuarios = require("../../repositorios/repositorio_usuarios");
const { enviarMailDeConfirmacionVenta } = require("../../email/sendgrid");
const crearErrorJson = require("../errores/crear_error_json");

const schemaId = Joi.number().positive().required();

async function confirmarVentaArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    const idVendedor = req.auth.id;
    await schemaId.validateAsync(idArticulo);
    await schemaId.validateAsync(idVendedor);

    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Artículo no encontrado");
      error.status = 400;
      throw error;
    }

    if (articulo.id_usuario !== idVendedor) {
      const error = new Error("No tienes permiso para realizar esta accion");
      error.status = 400;
      throw error;
    }

    if (
      articulo.id_usuario_comprador === null &&
      articulo.id_usuario === idVendedor
    ) {
      const error = new Error(
        "No puedes confirmar un articulo que aún no ha sido reservado"
      );
      error.status = 400;
      throw error;
    }

    const comprador = await repositorioUsuarios.buscarUsuarioPorId(
      articulo.id_usuario_comprador
    );

    if (articulo.id_usuario === idVendedor) {
      repositorioArticulos.confirmarVentaArticuloPorId(
        articulo.id,
        comprador.id
      );
      await enviarMailDeConfirmacionVenta(
        comprador.nombre,
        comprador.email,
        articulo.titulo
      );
      res
        .status(200)
        .send({
          respuesta:
            "Se ha confirmado la venta y se le ha notificado al comprador.",
        });
    }
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = confirmarVentaArticuloPorId;
