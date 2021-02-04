"use strict";

const Joi = require("joi");
const repositorioArticulos = require("../../repositorios/repositorio-articulos");
const crearErrorJson = require("../errores/crear-error-json");

const schema = Joi.object().keys({
  id_categoria: Joi.number().positive().required(),
  titulo: Joi.string().min(3).max(60).required(),
  descripcion: Joi.string().min(5).max(4000).required(),
  localizacion: Joi.string().min(3).max(50).required(),
  precio: Joi.number().positive().required(),
});

async function crearArticulo(req, res) {
  try {
    await schema.validateAsync(req.body);

    const id_usuario = req.auth.id;

    const {
      id_categoria,
      titulo,
      descripcion,
      localizacion,
      precio,
    } = req.body;

    const id = await repositorioArticulos.crearArticulo(
      id_usuario,
      id_categoria,
      titulo,
      descripcion,
      localizacion,
      precio
    );

    res.status(201).send({ id, titulo, descripcion, localizacion, precio });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = crearArticulo;
