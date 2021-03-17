"use strict";

const database = require("../infrastructure/database");

async function activarUsuario(code) {
  const now = new Date();
  const verificadoEn = now.toISOString().substring(0, 19).replace("T", " ");

  const pool = await database();
  const updateQuery = `UPDATE activacion_usuarios
  SET fecha_verificacion = ?
    WHERE codigo_verificacion = ?
    AND fecha_verificacion IS NULL`;
  const [validacion] = await pool.query(updateQuery, [verificadoEn, code]);

  return validacion.affectedRows === 1; //si es verdadero devuelve 1, si es falso devuelve 0
}

async function actualizarUsuarioPorId(data) {
  const {
    idUsuario,
    nombre,
    apellidos,
    nombreUsuario,
    email,
    contrasenha,
    localidad,
    foto,
  } = data;
  const pool = await database();
  const updateQuery = `UPDATE usuarios SET nombre = ?, apellidos = ?, nombreUsuario = ?, email = ?, contrasenha = ?, localidad = ?,foto=? WHERE id = ?`;
  await pool.query(updateQuery, [
    nombre,
    apellidos,
    nombreUsuario,
    email,
    contrasenha,
    localidad,
    foto,
    idUsuario,
  ]);

  return true;
}

async function agregarCodigoDeVerificacion(idUsuario, codigo) {
  const now = new Date();
  const creadoEn = now.toISOString().substring(0, 19).replace("T", " ");
  const data = {
    id_usuario: idUsuario,
    codigo_verificacion: codigo,
    fecha_creacion: creadoEn,
  };
  const pool = await database();
  const insertQuery = "INSERT INTO activacion_usuarios SET ?";
  const [created] = await pool.query(insertQuery, data);

  return created.insertId;
}

async function borrarUsuarioPorId(idUsuario) {
  const pool = await database();
  const query = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";
  await pool.query(query, idUsuario);
  const queryUsuario = "DELETE FROM usuarios WHERE id = ?";
  await pool.query(queryUsuario, idUsuario);

  return true;
}

async function borrarViejoCodigoDeVerificacion(idUsuario) {
  const pool = await database();
  const deleteQuery = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";

  await pool.query(deleteQuery, idUsuario);

  return true;
}

async function buscarCodigoVerificacionPorIdUsuario(idUsuario) {
  const pool = await database();
  const query =
    "SELECT codigo_verificacion FROM activacion_usuarios WHERE id_usuario = ? AND fecha_verificacion IS NOT NULL";
  const codigoActivacion = await pool.query(query, idUsuario);
  return codigoActivacion;
}

async function buscarImagenDePerilDeUsuario(idUsuario) {
  const pool = await database();
  const query = "SELECT foto FROM usuarios WHERE id = ?";
  const [usuario] = await pool.query(query, idUsuario);

  return usuario[0];
}

async function buscarUsuarioPorEmail(email) {
  const pool = await database();
  const query = `SELECT usuarios.*, activacion_usuarios.fecha_verificacion AS verificadoEn
  FROM usuarios
  LEFT JOIN activacion_usuarios ON activacion_usuarios.id_usuario = usuarios.id
  WHERE usuarios.email = ?`;

  const [usuario] = await pool.query(query, email);

  return usuario[0];
}

async function buscarUsuarioPorId(idUsuario) {
  const pool = await database();
  const query = "SELECT * FROM usuarios WHERE id = ?";
  const [usuario] = await pool.query(query, idUsuario);

  return usuario[0];
}

async function buscarUsuarioPorNombreUsuario(nombreUsuario) {
  const pool = await database();
  const query = `SELECT usuarios.*, activacion_usuarios.fecha_verificacion AS verificadoEn
  FROM usuarios
  LEFT JOIN activacion_usuarios ON activacion_usuarios.id_usuario = usuarios.id
  WHERE usuarios.nombreUsuario = ?`;
  const [usuario] = await pool.query(query, nombreUsuario);

  return usuario[0];
}

async function crearUsuario(
  nombre,
  apellido,
  email,
  contrasenhaHash,
  nombreUsuario,
  localidad
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO usuarios (nombre, apellidos, email, contrasenha, nombreUsuario, localidad) VALUES(?, ?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    nombre,
    apellido,
    email,
    contrasenhaHash,
    nombreUsuario,
    localidad,
  ]);

  return created.insertId;
}

async function obtenerComprasUsuario(idUsuario) {
  const pool = await database();
  const query = `SELECT id_comprador, COUNT(id_comprador) AS cantidad_compras FROM compras 
  WHERE id_comprador = ${idUsuario} GROUP BY id_comprador = ${idUsuario}`;
  const [ventas] = await pool.query(query);
  return ventas;
}

async function obtenerVentasUsuario(idUsuario) {
  const pool = await database();
  const query = `SELECT id_usuario, COUNT(id_usuario) AS cantidad_ventas FROM articulos 
  WHERE id_usuario = ${idUsuario} AND confirmacionVenta IS NOT NULL GROUP BY id_usuario = ${idUsuario}`;
  const [ventas] = await pool.query(query);
  return ventas;
}

async function subirImagenDePerfilDeUsuario(idUsuario, imagen) {
  const pool = await database();
  const updateQuery = "UPDATE usuarios SET foto = ? WHERE id = ?";
  await pool.query(updateQuery, [imagen, idUsuario]);

  return true;
}

module.exports = {
  activarUsuario,
  actualizarUsuarioPorId,
  agregarCodigoDeVerificacion,
  borrarUsuarioPorId,
  borrarViejoCodigoDeVerificacion,
  buscarCodigoVerificacionPorIdUsuario,
  buscarImagenDePerilDeUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  buscarUsuarioPorNombreUsuario,
  crearUsuario,
  obtenerComprasUsuario,
  obtenerVentasUsuario,
  subirImagenDePerfilDeUsuario,
};
