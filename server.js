"use strict";

require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json());
// app.use(cors());

const rutasUsuario = require("./app/rutas/rutas-usuario");
const rutasArticulos = require("./app/rutas/rutas-articulos");
const rutasArticulosFav = require("./app/rutas/rutas-articulos-fav");
const rutasCategorias = require("./app/rutas/rutas-categorias");
const rutasCompras = require("./app/rutas/rutas-compras");
const rutasFotos = require("./app/rutas/rutas-fotos");

app.use("./api/v1/usuarios", rutasUsuario);
app.use("./api/v1/articulos", rutasArticulos);
app.use("./api/v1/articulosFav", rutasArticulosFav);
app.use("./api/v1/categorias", rutasCategorias);
app.use("./api/v1/compras", rutasCompras);
app.use("./api/v1/Fotos", rutasFotos);

module.exports = app;
