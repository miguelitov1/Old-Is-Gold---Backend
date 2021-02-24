"use strict";

const Joi = require("joi");
const fileUpload = require("express-fileupload");
const crear_error_json = require("../errores/crear_error_json");
const path = require("path");
const fs = require("fs");

const repositorioFotos = require("../../repositorios/repositorio_fotos");
const repositorioArticulos = require("../../repositorios/repositorio_articulos");

const schema = Joi.number().positive().required();

const validarExtensiones = [".jpeg", ".jpg", ".pgn"];

async function subirImagenDeArticulo(req, res) {
  try {
    const idUsuario = req.auth.id;
    //const articulosUsuario = repositorioArticulos.buscarArticulosPorIdUsuario(idUsuario);

    const { idArticulo } = req.params;
    await schema.validateAsync(idArticulo);

    const articulo = await repositorioArticulos.buscarArticuloPorId(idArticulo);
    if (articulo.id_usuario !== idUsuario) {
      const error = new Error("El usuario no es el propietario del articulo");
      error.status = 400;
      throw error;
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha cargado ningun archivo");
      error.status = 400;
      throw error;
    }

    const fotosArticuloActuales = await repositorioFotos.obtenerFotosArticulo(
      idArticulo
    );

    /* for (const photo of Object.values(req.files)) {
              console.log(photo);
            } */
    const numeroFotosArticuloASubir = 5 - fotosArticuloActuales.length;

    if (numeroFotosArticuloASubir === 0) {
      const error = new Error("No puede subir mas de cinco fotos");
      error.status = 400;
      throw error;
    }

    for (let i = 0; i < numeroFotosArticuloASubir; i++) {
      const imagenArticulo = req.files.imagenArticulo[i];

      const extension = path.extname(imagenArticulo.name);

      if (!validarExtensiones.includes(extension)) {
        const error = new Error("Formato no valido");
        error.status = 400;
        throw error;
      }

      const { HTTP_SERVER_DOMAIN, PATH_ARTICULO_IMAGE } = process.env;

      const pathArticleImageFolder = `${__dirname}/../../../public/${PATH_ARTICULO_IMAGE}`;

      // if (fotoArticulo) {
      //     await fs.unlink(`${pathArticleImageFolder}/${fotoArticulo}`, () => {
      //         console.log("Se ha borrado la imagen del articulo correctamente");
      //     });
      //     await repositorioFotos.borrarFotoPorId(idArticulo);
      // }

      const pathImage = `${pathArticleImageFolder}/${idArticulo}_${i}${extension}`;
      // Movemos la image a la ruta final /public/images/profiles/id.png
      imagenArticulo.mv(pathImage, async function (err) {
        if (err) return res.status(500).send(err);
        await repositorioFotos.subirImagenDeArticulo(
          idArticulo,
          `${idArticulo}_${i}${extension}`
        );

        // res.send({
        //     url: `${HTTP_SERVER_DOMAIN}/${PATH_ARTICULO_IMAGE}/${idArticulo}_${i}${extension}`,
        // });
      });

      //res.send({response:'Imagenes subidas'});
    }
    res.send({ response: "Imagenes subidas, máximo numero de imagenes = 5" });
  } catch (err) {
    crear_error_json(err, res);
  }
}

module.exports = subirImagenDeArticulo;
