"use strict";

const fileUpload = require("express-fileupload");
const crearErrorJson = require("../errores/crear-error-json");
const path = require("path");
const fs = require("fs");

const repositorioUsuario = require("../../repositorios/repositorio-usuarios");

const validarExtensiones = [".jpeg", ".jpg", ".pgn"];

async function subirImagenDePerfil(req, res) {
  try {
    const { id } = req.auth;

    if (!req.files || Object.keys(req.files).length === 0) {
      const error = new Error("No se ha cargado ningun archivo");
      error.status = 400;
      throw error;
    }

    /* for (const photo of Object.values(req.files)) {
      console.log(photo);
    } */

    const porfileImage = req.files.porfileImage;

    const extension = path.extname(porfileImage.name);

    if (!validarExtensiones.includes(extension)) {
      const error = new Error("Formato no valido");
      error.status = 400;
      throw error;
    }

    const { HTTP_SERVER_DOMAIN, PATH_USER_IMAGE } = process.env;
    const usuario = await repositorioUsuario.buscarImagenDePerilDeUsuario(id);
    const pathProfileImageFolder = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    if (usuario.foto) {
      await fs.unlink(`${pathProfileImageFolder}/${usuario.foto}`, () => {
        console.log("Se ha borrado la imagen de perfil correctamente");
      });
    }

    const pathImage = `${pathProfileImageFolder}/${id}${extension}`;
    // Movemos la image a la ruta final /public/images/profiles/id.png
    porfileImage.mv(pathImage, async function (err) {
      if (err) return res.status(500).send(err);
      await repositorioUsuario.subirImagenDePerfilDeUsuario(
        id,
        `${id}${extension}`
      );

      res.send({
        url: `${HTTP_SERVER_DOMAIN}/${PATH_USER_IMAGE}/${id}${extension}`,
      });
    });
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = subirImagenDePerfil;
