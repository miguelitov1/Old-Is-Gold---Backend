"use strict";

const database = require("../infrastructure/database");

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

async function buscarUsuarioPorEmail(email) {
  const pool = await database();
  // const query = `SELECT usuarios.*, activacion_usuarios.fecha_verificacion AS verificadoEn
  // FROM usuarios
  // LEFT JOIN activacion_usuarios ON activacion_usuarios.id_usuario = usuarios.id
  // WHERE usuarios.email = ?`;

  const query = `SELECT * FROM usuarios WHERE email = ?`;

  const [usuario] = await pool.query(query, email);

  return usuario[0];
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

async function borrarViejoCodigoDeVerificacion(id) {
  const pool = await database();
  const deleteQuery = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";

  await pool.query(deleteQuery, id);

  return true;
}

async function validarActivacion(code) {
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

async function borrarUsuarioPorId(id) {
  const pool = await database();
  const query = "DELETE FROM activacion_usuarios WHERE id_usuario = ?";
  await pool.query(query, id);
  const queryUsuario = "DELETE FROM usuarios WHERE id = ?";
  await pool.query(queryUsuario, id);

  return true;
}

async function buscarUsuarioPorNombreUsuario(nombreUsuario) {
  const pool = await database();
  // const query = `SELECT usuarios.*, activacion_usuarios.fecha_verificacion AS verificadoEn
  // FROM usuarios
  // LEFT JOIN activacion_usuarios ON activacion_usuarios.id_usuario = usuarios.id
  // WHERE usuarios.nombreUsuario = ?`;
  const query = `SELECT * FROM usuarios WHERE nombreUsuario = ?`;
  const [usuario] = await pool.query(query, nombreUsuario);

  return usuario[0];
}

async function buscarUsuarioPorId(id) {
  const pool = await database();
  const query = "SELECT * FROM usuarios WHERE id = ?";
  const [usuario] = await pool.query(query, id);

  return usuario[0];
}

async function actualizarUsuarioPorId(data) {
  const {
    id,
    nombre,
    apellidos,
    nombreUsuario,
    email,
    contrasenha,
    localidad,
  } = data;
  const pool = await database();
  const updateQuery = `UPDATE usuarios
  SET nombre = ?, apellidos = ?, nombreUsuario = ?, email = ?, contrasenha = ?, localidad = ?
  WHERE id = ?`;
  await pool.query(updateQuery, [
    nombre,
    apellidos,
    nombreUsuario,
    email,
    contrasenha,
    localidad,
    id,
  ]);

  return true;
}

async function buscarImagenDePerilDeUsuario(id) {
  const pool = await database();
  const query = "SELECT foto FROM usuarios WHERE id = ?";
  const [usuario] = await pool.query(query, id);

  return usuario[0];
}

async function subirImagenDePerfilDeUsuario(id, imagen) {
  const pool = await database();
  const updateQuery = "UPDATE usuarios SET foto = ? WHERE id = ?";
  await pool.query(updateQuery, [imagen, id]);

  return true;
}

module.exports = {
  actualizarUsuarioPorId,
  agregarCodigoDeVerificacion,
  buscarImagenDePerilDeUsuario,
  borrarUsuarioPorId,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  buscarUsuarioPorNombreUsuario,
  borrarViejoCodigoDeVerificacion,
  crearUsuario,
  subirImagenDePerfilDeUsuario,
  validarActivacion,
};
