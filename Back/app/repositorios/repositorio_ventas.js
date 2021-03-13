"use strict";

const database = require("../infrastructure/database");

async function agregarRespuestaVendedor(idArticulo, idComprador, comentario) {
  const pool = await database();
  const query = `UPDATE compras SET respuestaVendedor = ? WHERE id_articulo = ${idArticulo} AND id_comprador = ${idComprador}`;
  const [created] = await pool.query(query, comentario);

  return created.insertId;
}

async function buscarValoracionesPorIdVendedor(idVendedor) {
  const pool = await database();
  const query =
    "SELECT * FROM compras JOIN articulos ON compras.id_articulo = articulos.id WHERE articulos.id_usuario = ?";
  const [valoraciones] = await pool.query(query, idVendedor);

  return valoraciones;
}

async function buscarValoracionPorIdArticulo(idArticulo) {
  const pool = await database();
  const query = `SELECT * FROM compras WHERE id_articulo = ?`;
  const [valoracion] = await pool.query(query, idArticulo);

  return valoracion[0];
}

async function buscarIdVendedorPorIdArticulo(idArticulo) {
  const pool = await database();
  const query = `SELECT id_usuario FROM articulos WHERE id = ?`;
  const [valoracion] = await pool.query(query, idArticulo);

  return valoracion[0].id_usuario;
}

async function crearValoracion(
  idArticulo,
  idComprador,
  valoracion,
  comentario
) {
  const pool = await database();
  console.log(idArticulo, idComprador, valoracion, comentario);
  const query = `UPDATE compras SET valoracion = ?, comentarioValoracion = ? WHERE id_articulo = ${idArticulo} AND id_comprador = ${idComprador}`;
  const [created] = await pool.query(query, [valoracion, comentario]);

  return created.insertId;
}

async function obtenerCantidadDeValoraciones(idVendedor) {
  const pool = await database();
  const query = `SELECT COUNT(valoracion) as numValoraciones FROM compras JOIN articulos ON compras.id_articulo = articulos.id WHERE articulos.id_usuario = ?`;
  const [valoracion] = await pool.query(query, idVendedor);

  return valoracion[0].numValoraciones;
}

async function obtenerComprasPorIdUsuario(id) {
  const pool = await database();
  const query =
    "SELECT * FROM articulos JOIN compras ON articulos.id=compras.id_articulo WHERE compras.id_comprador = ?";
  const [articulos] = await pool.query(query, id);

  return articulos;
}

async function obtenerPromedioValoracion(idVendedor) {
  const pool = await database();
  const query = `SELECT ROUND(AVG(valoracion),2) as valoracionMedia FROM compras JOIN articulos ON compras.id_articulo = articulos.id WHERE articulos.id_usuario = ?`;
  const [valoracion] = await pool.query(query, idVendedor);

  return valoracion[0].valoracionMedia;
}

async function obtenerVentasPorIdUsuario(id) {
  const pool = await database();
  const query =
    "SELECT * FROM articulos JOIN compras ON articulos.id=compras.id_articulo WHERE articulos.id_usuario = ? AND articulos.confirmacionVenta = 1";
  const [articulos] = await pool.query(query, id);

  return articulos;
}

async function obtenerReservadosPorIdUsuario(id) {
  const pool = await database();
  const query =
    "SELECT * FROM articulos WHERE id_usuario = ? AND id_usuario_comprador IS NOT NULL AND confirmacionVenta = 0";
  const [articulos] = await pool.query(query, id);

  return articulos;
}

module.exports = {
  agregarRespuestaVendedor,
  buscarValoracionesPorIdVendedor,
  buscarValoracionPorIdArticulo,
  buscarIdVendedorPorIdArticulo,
  crearValoracion,
  obtenerCantidadDeValoraciones,
  obtenerComprasPorIdUsuario,
  obtenerPromedioValoracion,
  obtenerReservadosPorIdUsuario,
  obtenerVentasPorIdUsuario,
};
