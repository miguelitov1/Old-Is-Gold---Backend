"use strict";

const Joi = require("joi");
const repositorioMensajes = require("../../repositorios/repositorio_mensajes");
const crear_error_jason = require("../errores/crear_error_json");

const schema = Joi.number().positive().required();

async function mostrarChats(req, res) {
  try {
    const idUsuario = req.auth.id;
    await schema.validateAsync(idUsuario);

    const chats = await repositorioMensajes.mostrarChats(idUsuario);

    if (!chats) {
      const error = new Error("Aún no has iniciado una conversacion con nadie");
      error.status = 400;
      throw error;
    }

    res.send(chats);
  } catch (err) {
    crear_error_jason(err, res);
  }
}

module.exports = mostrarChats;
