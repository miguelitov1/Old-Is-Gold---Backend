"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");
const crearErrorJson = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function verArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;

    await schema.validateAsync(idArticulo);
    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Articulo no encontrado");
      error.status = 400;
      throw error;
    }

    // console.log(articulo.id_usuario);
    // if (articulo.id_usuario !== idUsuario) {
    //   await repositorioArticulos.aumentarContadorVisitas(idArticulo);
    // }
    await repositorioArticulos.aumentarContadorVisitas(idArticulo);

    res.status(200).send(articulo);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = verArticuloPorId;
