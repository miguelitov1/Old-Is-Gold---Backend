"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const mostrarChats = require("../controllers/mensajes/mostrar_chats");
const mostrarChatDeArticulo = require("../controllers/mensajes/mostrar_chat_de_articulo");
const insertarNuevoMensaje = require("../controllers/mensajes/insertar_nuevo_mensaje");

const router = express.Router();

//Privadas
router
  .route("/")
  .all(validarAuth)
  .get((req, res) => mostrarChats(req, res));

router
  .route("/:idArticulo/:idVendedor/:idComprador")
  .all(validarAuth)
  .get((req, res) => mostrarChatDeArticulo(req, res))
  .post((req, res) => insertarNuevoMensaje(req, res));

module.exports = router;
