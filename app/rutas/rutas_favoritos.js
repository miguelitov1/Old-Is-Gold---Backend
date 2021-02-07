"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const obtenerArticulosFavoritoPorUsuario = require("../controllers/favoritos/obtener_favoritos_por_usuario");
const borrarArticuloFavoritoPorId = require("../controllers/favoritos/borrar_favorito_por_id");

const router = express.Router();

//Privadas
router
  .route("/")
  .all(validarAuth)
  .get((req, res) => obtenerArticulosFavoritoPorUsuario(req, res));

router
  .route("/:idArticulo")
  .all(validarAuth)
  .delete((req, res) => borrarArticuloFavoritoPorId(req, res));

module.exports = router;
