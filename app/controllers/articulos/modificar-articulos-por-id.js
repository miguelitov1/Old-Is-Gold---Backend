"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

const schemaId = Joi.number().positive().required();
const schemaIdUsuario = Joi.number().positive().required();

const schema = Joi.object().keys({
  id_categoria: Joi.number().positive().required(),
  titulo: Joi.string().alphanum().min(3).max(20).required(),
  descripcion: Joi.string().min(5).max(4000).required(),
  localizacion: Joi.string().min(3).max(50).required(),
  precio: Joi.number().required(),
});

async function modificarArticuloPorId(req, res) {
  try {
    const { idArticulo } = req.params;
    const id_usuario = req.auth.id;

    await schema.validateAsync(req.body);
    await schemaId.validateAsync(idArticulo);
    await schemaIdUsuario.validateAsync(id_usuario);

    const articulo = await repositorioArticulos.buscarArticuloPorId(
      parseInt(idArticulo)
    );

    if (!articulo) {
      const error = new Error("Artículo no encontrado");
      error.status = 400;
      throw error;
    }

    if (articulo.id_usuario !== id_usuario) {
      const error = new Error("No tienes permiso para modificar este articulo");
      error.status = 400;
      throw error;
    }

    const {
      id_categoria,
      titulo,
      descripcion,
      localizacion,
      precio,
    } = req.body;

    const actualizarArticulo = {
      id_usuario,
      id_categoria,
      titulo,
      descripcion,
      localizacion,
      precio,
    };
    await repositorioArticulos.modificarArticuloPorId(
      parseInt(idArticulo),
      actualizarArticulo
    );

    res.status(200).send({
      id_usuario,
      id_categoria,
      titulo,
      descripcion,
      localizacion,
      precio,
    });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = modificarArticuloPorId;
