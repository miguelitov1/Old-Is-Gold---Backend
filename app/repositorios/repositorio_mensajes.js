"use strict";

const database = require("../infrastructure/database");

async function buscarMensajesPorArticulo(idArticulo, idVendedor, idComprador) {
  const pool = await database();
  const query = `SELECT mensaje, id_emisor, fecha FROM mensajeria 
WHERE (id_emisor = ${idVendedor} OR id_receptor = ${idVendedor}) 
AND (id_emisor = ${idComprador} OR id_receptor = ${idComprador}) 
AND id_articulo = ${idArticulo}`;
  const [mensajes] = await pool.query(query);

  return mensajes;
}

async function insertarNuevoMensaje(idArticulo, idEmisor, idReceptor, mensaje) {
  const pool = await database();
  const query = `INSERT INTO mensajeria (id_emisor, id_receptor, mensaje, id_articulo) VALUES (?, ?, ?, ?)`;
  await pool.query(query, [idEmisor, idReceptor, mensaje, idArticulo]);

  return true;
}

async function mostrarChats(idUsuario) {
  const pool = await database();
  const query = `SELECT articulos.titulo FROM articulos
  JOIN mensajeria ON articulos.id = mensajeria.id_articulo
  WHERE mensajeria.id_emisor = ${idUsuario} OR mensajeria.id_receptor = ${idUsuario} GROUP BY articulos.titulo`;
  const [chats] = await pool.query(query);

  return chats;
}

module.exports = {
  mostrarChats,
  insertarNuevoMensaje,
  buscarMensajesPorArticulo,
};
