"use strict";
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const fileUpload = require("express-fileupload");
const crear_error_json = require("../errores/crear_error_json");
const path = require("path");
const fs = require("fs");

const repositorioFotos = require("../../repositorios/repositorio_fotos");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");

const schema = Joi.object({
  idArticulo: Joi.number().positive().required(),
  slot: Joi.string().valid("1", "2", "3", "4", "5"),
});

const validarExtensiones = [".jpeg", ".jpg", ".png"];

async function subirImagenDeArticulo(req, res) {
  try {
    const idUsuario = req.auth.id;
    //const articulosUsuario = repositorioArticulos.buscarArticulosPorIdUsuario(idUsuario);

    const { idArticulo } = req.params;
    const { slot } = req.body;

    await schema.validateAsync({ idArticulo, slot });

    const articulo = await repositorioArticulos.buscarArticuloPorId(idArticulo);

    if (!articulo) {
      const error = new Error("El articulo no existe");
      error.status = 400;
      throw error;
    }

    if (articulo.id_usuario !== idUsuario) {
      const error = new Error("El usuario no es el propietario del articulo");
      error.status = 400;
      throw error;
    }
    if (!req.files || !req.files.imagenArticulo) {
      const error = new Error("No se ha cargado ningun archivo");
      error.status = 400;
      throw error;
    }

    const { imagenArticulo } = req.files;

    const extension = path.extname(imagenArticulo.name);

    if (!validarExtensiones.includes(extension)) {
      const error = new Error("Formato no valido");
      error.status = 400;
      throw error;
    }

    const { HTTP_SERVER_DOMAIN, PATH_ARTICULO_IMAGE } = process.env;

    const pathArticleImageFolder = `${__dirname}/../../../public/${PATH_ARTICULO_IMAGE}`;

    const randomUuid = uuidv4();
    const pathImage = `${pathArticleImageFolder}/${idArticulo}_${randomUuid}${extension}`;
    imagenArticulo.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);

      await repositorioFotos.subirImagenDeArticulo(
        idArticulo,
        slot,
        `${idArticulo}_${randomUuid}${extension}`
      );
    });

    res.send({ response: "Imagenes subidas" });
  } catch (err) {
    crear_error_json(err, res);
  }
}

module.exports = subirImagenDeArticulo;
