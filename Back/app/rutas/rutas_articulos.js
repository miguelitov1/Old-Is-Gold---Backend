"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const crearArticulo = require("../controllers/articulos/crear_articulo");
const crearArticuloFav = require("../controllers/articulos/crear_articulo_fav");
const confirmarVentaArticuloPorId = require("../controllers/articulos/confirmar_venta");
const borrarArticuloPorId = require("../controllers/articulos/borrar_articulo_por_id");
const borrarReservaArticuloPorId = require("../controllers/articulos/borrar_reserva_articulo");
const buscarArticulosPorCategoria = require("../controllers/articulos/ver_articulos_por_categoria");
const modificarArticuloPorId = require("../controllers/articulos/modificar_articulos_por_id");
const reservarArticuloPorId = require("../controllers/articulos/reservar_articulo");
const verArticuloPorId = require("../controllers/articulos/ver_articulos_por_id");
const verTodosLosArticulos = require("../controllers/articulos/ver_articulos");
const verArticulosPorPalabrasClaves = require("../controllers/articulos/buscar_articulos_por_palabras_claves");

const router = express.Router();

//Publicas
router.route("/").get((req, res) => verTodosLosArticulos(req, res));
router.route("/:idArticulo").get((req, res) => verArticuloPorId(req, res));
router
  .route("/categoria/:idCategoria")
  .get((req, res) => buscarArticulosPorCategoria(req, res));
router
  .route("/resultado/busqueda")
  .get((req, res) => verArticulosPorPalabrasClaves(req, res));

//Privadas
router
  .route("/")
  .all(validarAuth)
  .post((req, res) => crearArticulo(req, res));

router
  .route("/:idArticulo")
  .all(validarAuth)
  .delete((req, res) => borrarArticuloPorId(req, res))
  .put((req, res) => modificarArticuloPorId(req, res))
  .post((req, res) => crearArticuloFav(req, res));

router
  .route("/:idArticulo/reservarArticulo")
  .all(validarAuth)
  .put((req, res) => reservarArticuloPorId(req, res));

router
  .route("/:idArticulo/confirmarVenta")
  .all(validarAuth)
  .put((req, res) => confirmarVentaArticuloPorId(req, res));

router
  .route("/:idArticulo/borrarReserva")
  .all(validarAuth)
  .put((req, res) => borrarReservaArticuloPorId(req, res));

module.exports = router;
