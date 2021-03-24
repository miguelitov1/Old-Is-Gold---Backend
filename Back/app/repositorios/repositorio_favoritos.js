"use strict";

const database = require("../infrastructure/database");

async function borrarArticuloFavoritoPorId(idArticulo, idUsuario) {
  const pool = await database();
  const query =
    "DELETE FROM articulos_favoritos WHERE id_articulo = ? AND id_usuario = ?";
  const [favorito] = await pool.query(query, [idArticulo, idUsuario]);
  return true;
}

async function buscarArticuloFavoritoPorId(id) {
  const pool = await database();
  const query = "select * FROM articulos_favoritos WHERE id_articulo = ?";
  const [favorito] = await pool.query(query, id);
  return favorito[0];
}

async function obtenerArticulosFavoritosPorUsuario(id) {
  const pool = await database();
  const query = `SELECT * FROM articulos JOIN articulos_favoritos ON articulos_favoritos.id_articulo = articulos.id 
  WHERE articulos_favoritos.id_usuario =${id} AND confirmacionVenta IS NULL
  ORDER BY articulos_favoritos.fecha DESC`;
  const [favoritos] = await pool.query(query);

  return favoritos;
}

module.exports = {
  borrarArticuloFavoritoPorId,
  buscarArticuloFavoritoPorId,
  obtenerArticulosFavoritosPorUsuario,
};
