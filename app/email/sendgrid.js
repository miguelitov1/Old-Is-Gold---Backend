"use strict";

const sgMail = require("@sendgrid/mail");

async function enviarEmailDeRegistro(nombre, email, codigoVerificacion) {
  try {
    const {
      HTTP_SERVER_DOMAIN,
      SENDGRID_KEY,
      SENDGRID_MAIL_FROM,
    } = process.env;

    sgMail.setApiKey(SENDGRID_KEY);

    const linkActivacion = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/usuarios/activacion?codigo_verificacion=${codigoVerificacion}`;

    const contenidoEmail = {
      to: email,
      from: SENDGRID_MAIL_FROM,
      subject: "Bienvenido a Proyecto8",
      text: `Hola ${nombre}.\nBienvenido a Proyecto8, la plataforma numero 1 en compra-venta de tecnologia retro.\nPara continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}`,
      html: `<h1>Hola ${nombre}.</h1><p>Bienvenido a Proyecto8, la plataforma número 1 en compra-venta de tecnologia retro.</p><p>Para continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}</p>`,
    };

    await sgMail.send(contenidoEmail);
  } catch (error) {
    console.log(error);
  }
}

async function enviarMailRecuperarContrasenha(
  nombre,
  email,
  codigoVerificacion
) {
  const { HTTP_SERVER_DOMAIN, SENDGRID_KEY, SENDGRID_MAIL_FROM } = process.env;

  sendgrid.setApiKey(SENDGRID_KEY);

  const linkRecuperacionContraseña = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/usuarios/recuperarContrasenha?codigoVerificcion=${codigoVerificacion}`;

  const contenidoEmail = {
    to: email,
    from: SENDGRID_MAIL_FROM,
    subject: "Recuperar contraseña",
    text: `Hola ${nombre}.\nEntra al siguiente link para recuperar su cuenta con una contraseña nueva ${linkRecuperacionContraseña}`,
    html: `<h1>Hola ${nombre}.</h1><p>Entra al siguiente link para recuperar su cuenta con una contraseña nueva ${linkRecuperacionContraseña}</p>`,
  };

  await sgMail.send(contenidoEmail);
}

async function enviarEmailDeValidacionCorrecta(nombre, email, text, html) {
  const { HTTP_SERVER_DOMAIN, SENDGRID_KEY, SENDGRID_MAIL_FROM } = process.env;

  sendgrid.setApiKey(SENDGRID_KEY);
  const contentEmail = {
    from: SENDGRID_MAIL_FROM,
    to: email,
    subject: "Tu cuenta se ha activado correctamente",
    text: `Hola ${nombre}.\n¡Tu cuenta se ha activado correctamente!`,
    html: `<h1>Hola ${nombre}.</h1><p>¡Tu cuenta se ha activado correctamente!</p>`,
  };

  //   await sendgrid.send(contentEmail);
}

module.exports = {
  enviarEmailDeRegistro,
  enviarMailRecuperarContrasenha,
  enviarEmailDeValidacionCorrecta,
};
