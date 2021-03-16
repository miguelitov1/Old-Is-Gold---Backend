"use strict";

const database = require("../infrastructure/database");

async function buscarMensajesPorArticulo(idArticulo, idVendedor, idComprador) {
  const pool = await database();
  //   const query = `SELECT mensaje, id_emisor, fecha FROM mensajeria
  // WHERE (id_emisor = ${idVendedor} OR id_receptor = ${idVendedor})
  // AND (id_emisor = ${idComprador} OR id_receptor = ${idComprador})
  // AND id_articulo = ${idArticulo}`;
  const query = `SELECT articulos.titulo, articulos.id_usuario, articulos.foto1, 
  mensajeria.id, mensajeria.id_emisor, mensajeria.id_receptor, mensajeria.mensaje, DATE_FORMAT(mensajeria.fecha, '%d/%m/%Y %H:%i') AS fecha, mensajeria.id_comprador, 
  mensajeria.id_vendedor, mensajeria.id_articulo
  FROM articulos
  JOIN mensajeria ON articulos.id = mensajeria.id_articulo
  WHERE (mensajeria.id_emisor = ${idVendedor} OR mensajeria.id_receptor = ${idVendedor}) 
  AND (mensajeria.id_emisor = ${idComprador} OR mensajeria.id_receptor = ${idComprador})
  AND id_articulo = ${idArticulo}`;
  const [mensajes] = await pool.query(query);

  return mensajes;
}

async function insertarNuevoMensaje(
  idArticulo,
  idEmisor,
  idReceptor,
  mensaje,
  idComprador,
  idVendedor
) {
  const pool = await database();
  const query = `INSERT INTO mensajeria (id_emisor, id_receptor, mensaje, id_articulo, id_comprador, id_vendedor) VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(query, [
    idEmisor,
    idReceptor,
    mensaje,
    idArticulo,
    idComprador,
    idVendedor,
  ]);

  return {
    id_emisor: idEmisor,
    id: result.insertId,
    id_receptor: idReceptor,
    fecha: new Date().toLocaleString(),
    mensaje: mensaje,
  };
}

async function mostrarChats(idUsuario) {
  const pool = await database();
  const query = `SELECT articulos.titulo, articulos.id_usuario, articulos.foto1, 
  mensajeria.id, mensajeria.id_emisor, mensajeria.id_receptor, mensajeria.mensaje, mensajeria.fecha, mensajeria.id_comprador, 
  mensajeria.id_vendedor, mensajeria.id_articulo
  FROM articulos
  JOIN mensajeria ON articulos.id = mensajeria.id_articulo
  WHERE mensajeria.id_emisor = ${idUsuario} OR mensajeria.id_receptor = ${idUsuario} ORDER BY mensajeria.fecha DESC`;
  const [chats] = await pool.query(query);

  return chats;
}

module.exports = {
  buscarMensajesPorArticulo,
  insertarNuevoMensaje,
  mostrarChats,
};
