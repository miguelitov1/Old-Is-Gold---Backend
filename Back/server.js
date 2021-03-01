"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use(express.json()); //sirve para tomar los datos json del postman
app.use(cors());

const rutasArticulos = require("./app/rutas/rutas_articulos");
const rutasArticulosFav = require("./app/rutas/rutas_favoritos");
const rutasFotosArticulo = require("./app/rutas/rutas_fotos");
const rutasMensajes = require("./app/rutas/rutas_mensajes");
const rutasUsuario = require("./app/rutas/rutas_usuario");
const rutasVentas = require("./app/rutas/rutas_ventas");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/api/v1/proyecto8/articulos", rutasArticulos);
app.use("/api/v1/proyecto8/articulosFav", rutasArticulosFav);
app.use("/api/v1/proyecto8/fotos", rutasFotosArticulo);
app.use("/api/v1/proyecto8/mensajes", rutasMensajes);
app.use("/api/v1/proyecto8/usuarios", rutasUsuario);
app.use("/api/v1/proyecto8/ventas", rutasVentas);

module.exports = app;
