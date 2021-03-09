"use strict";

const database = require("../infrastructure/database");

async function borrarFotoPorId(idFoto) {
  const pool = await database();
  const deleteQuery = "DELETE FROM fotos_articulos WHERE id = ?";
  const [foto] = await pool.query(deleteQuery, idFoto);

  return foto;
}

async function buscarUsuarioPorIdFoto(idFoto) {
  const pool = await database();
  const query =
    "SELECT * from articulos a join fotos_articulos fa on a.id = fa.id_articulo WHERE fa.id = ?";
  const [foto] = await pool.query(query, idFoto);
  return foto;
}

async function obtenerFotosArticulo(idArticulo) {
  const pool = await database();
  const query = "SELECT fotos FROM fotos_articulos WHERE id_articulo = ?";
  const [fotos] = await pool.query(query, idArticulo);

  return fotos;
}

async function subirImagenDeArticulo(idArticulo, slot, imagen) {
  const pool = await database();
  const updateQuery = `UPDATE articulos SET foto${slot}=? WHERE id=?`;
  await pool.query(updateQuery, [imagen, idArticulo]);

  return true;
}

module.exports = {
  borrarFotoPorId,
  buscarUsuarioPorIdFoto,
  obtenerFotosArticulo,
  subirImagenDeArticulo,
};
