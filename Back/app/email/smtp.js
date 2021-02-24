"use strict";

const nodemailer = require("nodemailer");

const {
  HTTP_SERVER_DOMAIN,
  SMTP_PORT,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const transportador = nodemailer.createTransport({
  port: SMTP_PORT,
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  secure: false,
});

async function enviarEmailDeRegistro(nombre, email, codigoDeVerificacion) {
  const linkActivacion = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/usuarios/activacion?codigo_verificacion=${codigoDeVerificacion}`;

  const mailData = {
    from: "proyecto8.hab@gmail.com",
    to: email,
    subject: "Bienvenido a Proyecto8",
    text: `Hola ${nombre}.\nBienvenido a Proyecto8, la plataforma numero 1 en compra-venta de tecnologia retro.\nPara continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}`,
    html: `<h1>Hola ${nombre}.</h1><p>Bienvenido a Proyecto8, la plataforma número 1 en compra-venta de tecnologia retro.</p><p>Para continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}</p>`,
  };

  const data = await transportador.sendMail(mailData);

  return data;
}

async function enviarEmailDeValidacionCorrecta(nombre, email) {
  const mailData = {
    from: "proyecto8.hab@gmail.com",
    to: email,
    subject: "Tu cuenta se ha activado correctamente",
    text: `Hola ${nombre}.\n¡Tu cuenta se ha activado correctamente!`,
    html: `<h1>Hola ${nombre}.</h1><p>¡Tu cuenta se ha activado correctamente!</p>`,
  };

  const data = await transportador.sendMail(mailData);

  return data;
}

module.exports = {
  enviarEmailDeRegistro,
  enviarEmailDeValidacionCorrecta,
};
