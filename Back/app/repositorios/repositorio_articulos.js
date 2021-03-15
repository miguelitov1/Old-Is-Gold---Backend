"use strict";

const { async } = require("crypto-random-string");
const database = require("../infrastructure/database");

async function aumentarContadorVisitas(id) {
  const pool = await database();
  const query =
    "UPDATE articulos SET nro_visitas = nro_visitas + 1 WHERE id = ?";
  await pool.query(query, [id]);

  return true;
}

async function borrarArticuloPorId(id) {
  const pool = await database();
  const deleteQuery = "DELETE FROM articulos WHERE id = ?";
  await pool.query(deleteQuery, id);

  return true;
}

async function borrarReservaArticuloPorId(idArticulo) {
  const pool = await database();
  const updateQuery =
    "UPDATE articulos SET id_usuario_comprador = NULL WHERE id = ?";
  await pool.query(updateQuery, [idArticulo]);

  return true;
}

async function buscarArticuloPorId(id) {
  const pool = await database();
  const query = `SELECT id, id_usuario, id_categoria, titulo, descripcion, localizacion, precio, confirmacionVenta, 
  DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha, id_usuario_comprador, nro_visitas, foto1, foto2, foto3, foto4, foto5 FROM articulos WHERE id = ?`;
  const [articulo] = await pool.query(query, id);
  return articulo[0];
}

async function buscarArticulosPorCategoria(idCategoria) {
  const pool = await database();
  const query = `SELECT * FROM articulos WHERE confirmacionVenta IS NULL AND id_categoria = ? ORDER BY fecha DESC`;
  const [articulos] = await pool.query(query, idCategoria);

  return articulos;
}

async function buscarArticulosPorIdUsuario(id) {
  const pool = await database();
  const query =
    "SELECT * FROM articulos WHERE id_usuario = ? AND confirmacionVenta IS NULL ORDER BY fecha DESC";
  const [articulos] = await pool.query(query, id);

  return articulos;
}

async function confirmarVentaArticuloPorId(idArticulo, idComprador) {
  const pool = await database();
  const query1 =
    "INSERT INTO compras (id_articulo, id_comprador) VALUES (?, ?)";
  const [created] = await pool.query(query1, [idArticulo, idComprador]);
  const query2 =
    "UPDATE articulos SET confirmacionVenta = current_timestamp  WHERE id = ?";
  await pool.query(query2, [idArticulo]);

  return true;
}

async function crearArticulo(
  id_usuario,
  id_categoria,
  titulo,
  descripcion,
  localizacion,
  precio
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO articulos (id_usuario, id_categoria, titulo, descripcion, localizacion, precio) VALUES(?, ?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    id_usuario,
    id_categoria,
    titulo,
    descripcion,
    localizacion,
    precio,
  ]);

  return created.insertId;
}

async function crearArticuloFav(id_articulo, id_usuario) {
  const pool = await database();
  const insertQuerry =
    "INSERT INTO articulos_favoritos (id_articulo, id_usuario) VALUES(?, ?)";
  const [created] = await pool.query(insertQuerry, [id_articulo, id_usuario]);

  return true;
}

async function modificarArticuloPorId(idArticulo, modificarArticulo) {
  const {
    id_usuario,
    id_categoria,
    titulo,
    descripcion,
    localizacion,
    precio,
  } = modificarArticulo;
  const pool = await database();
  const updateQuery =
    "UPDATE articulos SET id_usuario = ?, id_categoria = ?, titulo = ?, descripcion = ?, localizacion = ?, precio = ? WHERE id = ?";
  await pool.query(updateQuery, [
    id_usuario,
    id_categoria,
    titulo,
    descripcion,
    localizacion,
    precio,
    idArticulo,
  ]);
  return true;
}

async function reservarArticuloPorId(idArticulo, idComprador) {
  const pool = await database();
  const updateQuery =
    "UPDATE articulos SET id_usuario_comprador = ? WHERE id = ?";
  await pool.query(updateQuery, [idComprador, idArticulo]);

  return true;
}

async function verArticulosPorPalabrasClaves(stringBusqueda) {
  const pool = await database();
  const query = `SELECT * FROM articulos WHERE confirmacionVenta IS NULL AND titulo LIKE ${stringBusqueda} ORDER BY fecha DESC`;
  const [articulos] = await pool.query(query);

  return articulos;
}

async function verTodosLosArticulos() {
  const pool = await database();
  const query =
    "SELECT * FROM articulos WHERE confirmacionVenta IS NULL ORDER BY fecha DESC";
  const [articulos] = await pool.query(query);

  return articulos;
}

module.exports = {
  aumentarContadorVisitas,
  borrarArticuloPorId,
  borrarReservaArticuloPorId,
  buscarArticuloPorId,
  buscarArticulosPorCategoria,
  buscarArticulosPorIdUsuario,
  confirmarVentaArticuloPorId,
  crearArticulo,
  crearArticuloFav,
  modificarArticuloPorId,
  reservarArticuloPorId,
  verArticulosPorPalabrasClaves,
  verTodosLosArticulos,
};
