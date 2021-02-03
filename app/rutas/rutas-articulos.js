"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const borrarArticuloPorId = require("../controllers/articulos/borrar-articulo-por-id");
const registrarArticulo = require("../controllers/articulos/crear-articulo");
const modificarArticuloPorId = require("../controllers/articulos/modificar-articulos-por-id");
const getArticulos = require("../controllers/articulos/ver-articulos");
const verArticuloPorId = require("../controllers/articulos/ver-articulos-por-id");

const router = express.Router();

//Publicas
router.route("/").get((req, res) => getArticulos(req, res));
router.route("/:idArticulo").get((req, res) => verArticuloPorId(req, res));

//Privadas
router
  .route("/")
  .all(validarAuth)
  .post((req, res) => registrarArticulo(req, res));

router
  .route("/:idArticulo")
  .all(validarAuth)
  .delete((req, res) => borrarArticuloPorId(req, res))
  .put((req, res) => modificarArticuloPorId(req, res));

module.exports = router;
