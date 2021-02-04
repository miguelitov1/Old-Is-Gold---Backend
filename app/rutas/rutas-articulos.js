"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const borrarArticuloPorId = require("../controllers/articulos/borrar-articulo-por-id");
const crearArticulo = require("../controllers/articulos/crear-articulo");
const modificarArticuloPorId = require("../controllers/articulos/modificar-articulos-por-id");
const verArticuloPorId = require("../controllers/articulos/ver-articulos-por-id");
const verTodosLosArticulos = require("../controllers/articulos/ver-articulos");

const router = express.Router();

//Publicas
router.route("/").get((req, res) => verTodosLosArticulos(req, res));
router.route("/:idArticulo").get((req, res) => verArticuloPorId(req, res));

//Privadas
router
  .route("/")
  .all(validarAuth)
  .post((req, res) => crearArticulo(req, res));

router
  .route("/:idArticulo")
  .all(validarAuth)
  .delete((req, res) => borrarArticuloPorId(req, res))
  .put((req, res) => modificarArticuloPorId(req, res));

module.exports = router;
