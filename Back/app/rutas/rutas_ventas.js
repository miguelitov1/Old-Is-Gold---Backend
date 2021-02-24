"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const crearValoracion = require("../controllers/ventas/crear_valoracion");
const agregarRespuestaVendedor = require("../controllers/ventas/responder_valoracion");
const mostrarValoracionesUsuario = require("../controllers/ventas/mostrar_valoraciones_usuario");
const buscarComnprasPorUsuario = require("../controllers/ventas/buscar_compras_por_usuario");
const buscarVentasPorUsuario = require("../controllers/ventas/buscar_ventas_por_usuario");

const router = express.Router();

router
  .route("/valoracion/:idArticulo")
  .all(validarAuth)
  .put((req, res) => crearValoracion(req, res));

router
  .route("/respuesta/:idArticulo")
  .all(validarAuth)
  .put((req, res) => agregarRespuestaVendedor(req, res));

router
  .route("/verValoraciones/:idUsuario")
  .all(validarAuth)
  .get((req, res) => mostrarValoracionesUsuario(req, res));

router
  .route("/compras/:idUsuario/")
  .all(validarAuth)
  .get((req, res) => buscarComnprasPorUsuario(req, res));

router
  .route("/ventas/:idUsuario")
  .all(validarAuth)
  .get((req, res) => buscarVentasPorUsuario(req, res));

module.exports = router;
