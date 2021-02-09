"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const subirImagenDeArticulo = require("../controllers/fotos/subir_imagen_articulo");
const obtenerFotosArticulo = require("../controllers/fotos/obtener_fotos_articulo");
const borrarFotoPorId = require("../controllers/fotos/borrar_foto_por_id");

const router = express.Router();

//Publicas
router.route("/:idArticulo").get((req, res) => obtenerFotosArticulo(req, res));

//Privadas
router
  .route("/subirImagen/:idArticulo")
  .all(validarAuth)
  .post((req, res) => subirImagenDeArticulo(req, res));
router
  .route("/borrarImagen/:idArticulo")
  .all(validarAuth)
  .delete((req, res) => borrarFotoPorId(req, res));

module.exports = router;
