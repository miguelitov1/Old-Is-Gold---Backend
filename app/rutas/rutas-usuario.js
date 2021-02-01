"use strict";

const express = require("express");

const registrarUsuario = require("../controllers/usuario/registrar-usuario");

const router = express.Router();

//Publicas
router.route("/registro").post((req, res) => registrarUsuario(req, res));

module.exports = router;
