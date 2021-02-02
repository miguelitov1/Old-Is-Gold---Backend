"use strict";

const database = require("../infrastructure/database");

async function crearArticulo(
  id_usuario,
  id_categoria,
  titulo,
  descripcion,
  localizacion,
  precio
) {
  const pool = await database();
  const insertQuerry =
    "INSERT INTO articulos (id_usuario, id_categoria, titulo, descripcion, localizacion, precio) VALUES(?, ?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuerry, [
    id_usuario,
    id_categoria,
    titulo,
    descripcion,
    localizacion,
    precio,
  ]);

  return created.insertId;
}
async function verTodo() {
  const pool = await database();
  const query = "SELECT * FROM articulos";
  const [articulos] = await pool.query(query);

  return articulos;
}

async function borrarPorId(id) {
  const pool = await database();
  const deleteQuery = "DELETE FROM articulos WHERE id = ?";
  await pool.query(deleteQuery, id);

  return true;
}

async function buscarPorId(id) {
  const pool = await database();
  const query = "SELECT * FROM articulos WHERE id = ?";
  const [articulo] = await pool.query(query, id);
  return articulo[0];
}

async function modificarPorId(id, modificarArticulo) {
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
    id,
  ]);
  return true;
}
// async function findReviewsByCarId(carId) {
//   const pool = await database();
//   const query = `SELECT * FROM cars
//     LEFT JOIN reviews ON reviews.car_id = cars.id
//     WHERE cars.id = ?`;
//   const [reviews] = await pool.query(query, carId);

//   return reviews;
// }

// BUSCAR POR TITULO Y CATEGORIA
// async function findByBrandAndModel(brand, model) {
//   const pool = await database();
//   const query = 'SELECT * FROM cars WHERE brand = ? AND model = ?';
//   const [cars] = await pool.query(query, [brand, model]);

//   return cars[0];
// }

module.exports = {
  crearArticulo,
  verTodo,
  borrarPorId,
  buscarPorId,
  modificarPorId,
};
