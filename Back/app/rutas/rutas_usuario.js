"use strict";

const express = require("express");
const validarAuth = require("../middlewares/validar-auth");

const activarUsuario = require("../controllers/usuario/activar_usuario");
const actualizarUsuario = require("../controllers/usuario/actualizar_usuario");
const borrarUsuarioPorId = require("../controllers/usuario/borrar_usuario");
const buscarArticulosPorIdUsuario = require("../controllers/usuario/buscar_articulos_de_usuario");
const buscarUsuarioPorId = require("../controllers/usuario/obtener_perfil_usuario_por_id");
const buscarUsuarioPorIdSinRegistro = require("../controllers/usuario/obtener_perfil_usuario_por_id_sin_registro");
const registrarUsuario = require("../controllers/usuario/registrar_usuario");
const iniciarSesionUsuario = require("../controllers/usuario/login_usuario");
const subirImagenDePerfil = require("../controllers/usuario/subir_imagen_perfil");

const router = express.Router();

//Publicas
router.route("/registro").post((req, res) => registrarUsuario(req, res));
router.route("/activacion").get((req, res) => activarUsuario(req, res));
router.route("/login").post((req, res) => iniciarSesionUsuario(req, res));
router
  .route("/recuperarContrasenha")
  .post((req, res) => recuperarContrasenha(req, res));
router
  .route("/usuarioSinRegistro/:idUsuario")
  .get((req, res) => buscarUsuarioPorIdSinRegistro(req, res));

//Privadas
router
  .route("/:idUsuario")
  .all(validarAuth)
  .get((req, res) => buscarUsuarioPorId(req, res))
  .delete((req, res) => borrarUsuarioPorId(req, res));

router
  .route("/actualizar")
  .all(validarAuth)
  .put((req, res) => actualizarUsuario(req, res));

router
  .route("/:idUsuario/articulos")
  .all(validarAuth)
  .get((req, res) => buscarArticulosPorIdUsuario(req, res));

router
  .route("/subirImagen")
  .all(validarAuth)
  .post((req, res) => subirImagenDePerfil(req, res));

module.exports = router;
