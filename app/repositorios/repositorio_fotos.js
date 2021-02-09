"use strict";

const database = require("../infrastructure/database");

async function borrarFotoPorId(idArticulo) {
  const pool = await database();
  const deleteQuery = "DELETE FROM fotos_articulos WHERE id_articulo = ?";
  const [foto] = await pool.query(deleteQuery, idArticulo);

  return foto;
}

async function buscarUsuarioPorIdFoto(idArticulo) {
  const pool = await database();
  const query =
    "SELECT * from articulos a join fotos_articulos fa on a.id = fa.id_articulo WHERE fa.id_articulo = ?";
  const [foto] = await pool.query(query, idArticulo);
  return foto;
}

async function obtenerFotosArticulo(idArticulo) {
  const pool = await database();
  const query = "SELECT fotos FROM fotos_articulos WHERE id_articulo = ?";
  const [fotos] = await pool.query(query, idArticulo);

  return fotos;
}

async function subirImagenDeArticulo(idArticulo, imagen) {
  const pool = await database();
  const updateQuery =
    "INSERT INTO fotos_articulos (fotos, id_articulo) VALUES (?,?)";
  await pool.query(updateQuery, [imagen, idArticulo]);

  return true;
}

module.exports = {
  subirImagenDeArticulo,
  obtenerFotosArticulo,
  borrarFotoPorId,
  buscarUsuarioPorIdFoto,
};
