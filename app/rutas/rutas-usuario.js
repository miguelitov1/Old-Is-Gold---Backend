"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const activarUsuario = require("../controllers/usuario/activar_usuario");
const registrarUsuario = require("../controllers/usuario/registrar_usuario");
const loginUsuario = require("../controllers/usuario/login_usuario");
const obtenerPerfilDeUsuario = require("../controllers/usuario/obtener_perfil_usuario");
const actualizarUsuario = require("../controllers/usuario/actualizar_usuario");

const router = express.Router();

//Publicas
router.route("/registro").post((req, res) => registrarUsuario(req, res));
router.route("/activacion").get((req, res) => activarUsuario(req, res));
router.route("/login").post((req, res) => loginUsuario(req, res));

//Privadas
router
  .route("/actualizar")
  .all(validarAuth)
  .put((req, res) => actualizarUsuario(req, res));

router
  .route("/perfil")
  .all(validarAuth)
  .get((req, res) => obtenerPerfilDeUsuario(req, res));

module.exports = router;
