"use strict";

const Joi = require("joi");
const repositorioMensajes = require("../../repositorios/repositorio_mensajes");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crear_error_jason = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function mostrarChatDeArticulo(req, res) {
  try {
    const { idArticulo } = req.params;
    await schema.validateAsync(parseInt(idArticulo));

    const { idVendedor } = req.params;
    await schema.validateAsync(parseInt(idVendedor));

    const { idComprador } = req.params;
    await schema.validateAsync(parseInt(idComprador));

    const idUsuario = req.auth.id;
    await schema.validateAsync(idUsuario);

    // const articulo = await repositorioArticulos.buscarArticuloPorId(
    //   parseInt(idArticulo)
    // );

    // if (articulo) {
    //   const error = new Error("No existe el articulo");
    //   error.status = 400;
    //   throw error;
    // }

    if (
      idUsuario !== parseInt(idVendedor) &&
      idUsuario !== parseInt(idComprador)
    ) {
      const error = new Error("No tienes permiso para estar aqui");
      error.status = 400;
      throw error;
    }

    const mensajes = await repositorioMensajes.buscarMensajesPorArticulo(
      idArticulo,
      idComprador,
      idVendedor
    );

    res.send(mensajes);
  } catch (err) {
    crear_error_jason(err, res);
  }
}

module.exports = mostrarChatDeArticulo;
