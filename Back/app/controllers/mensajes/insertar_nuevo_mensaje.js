"use strict";

const Joi = require("joi");
const repositorioMensajes = require("../../repositorios/repositorio_mensajes");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crear_error_jason = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  mensaje: Joi.string().min(1).max(255).required(),
});

async function insertarNuevoMensaje(req, res) {
  try {
    const { idArticulo } = req.params;
    await schema.validateAsync(parseInt(idArticulo));

    const { idVendedor } = req.params;
    await schema.validateAsync(parseInt(idVendedor));

    const { idComprador } = req.params;
    await schema.validateAsync(parseInt(idComprador));

    const idUsuario = req.auth.id;
    await schema.validateAsync(idUsuario);

    let idEmisor, idReceptor;

    if (idUsuario === parseInt(idVendedor)) {
      idEmisor = idVendedor;
      idReceptor = idComprador;
    } else if (idUsuario === parseInt(idComprador)) {
      idEmisor = idComprador;
      idReceptor = idVendedor;
    } else {
      const error = new Error("No tienes permiso para estar aqui");
      error.status = 400;
      throw error;
    }
    const { mensaje } = req.body;

    // const articulo = await repositorioArticulos.buscarArticuloPorId(
    //   parseInt(idArticulo)
    // );

    // if (!articulo) {
    //   const error = new Error("No existe el articulo");
    //   error.status = 400;
    //   throw error;
    // }

    await repositorioMensajes.insertarNuevoMensaje(
      idArticulo,
      idEmisor,
      idReceptor,
      mensaje,
      idComprador,
      idVendedor
    );

    res.send(mensaje);
  } catch (err) {
    crear_error_jason(err, res);
  }
}

module.exports = insertarNuevoMensaje;
