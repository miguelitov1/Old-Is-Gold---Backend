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

async function enviarEmailDeReserva(nombre, email, titulo, idArticulo) {
  try {
    const {
      HTTP_SERVER_DOMAIN,
      SENDGRID_KEY,
      SENDGRID_MAIL_FROM,
    } = process.env;

    sgMail.setApiKey(SENDGRID_KEY);

    const linkConfirmacion = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/articulos/${idArticulo}/confirmarVenta`;
    const linkNegacion = `${HTTP_SERVER_DOMAIN}/api/v1/proyecto8/articulos/${idArticulo}/borrarReserva`;

    const contenidoEmail = {
      to: email,
      from: SENDGRID_MAIL_FROM,
      subject: "¡Han reservado uno de tus productos!",
      text: `Hola ${nombre}.\n¡Enhorabuena! Alguien está interesado en ${titulo} que has publicado en nuestra pagina.\nPara confirmar la venta has click en el siguiente enlace ${linkConfirmacion}.\nPara negar la reserva has click en el siguiente enlace ${linkNegacion}.\n O puedes gestionar la reserva accediendo a tus productos a través de la pagina`,
      html: `<h1>Hola ${nombre}.</h1><p>¡Enhorabuena! Alguien está interesado en ${titulo} que has publicado en nuestra pagina.</p><p>Para confirmar la venta has click en el siguiente enlace ${linkConfirmacion}</p><p>\nPara negar la reserva has click en el siguiente enlace ${linkNegacion}.</p><p>O puedes gestionar la reserva accediendo a tus productos a través de la pagina</p>`,
    };

    await sgMail.send(contenidoEmail);
  } catch (error) {
    console.log(error);
  }
}

async function enviarEmailDeCancelacionReserva(nombre, email, titulo) {
  try {
    const { SENDGRID_KEY, SENDGRID_MAIL_FROM } = process.env;

    sgMail.setApiKey(SENDGRID_KEY);

    const contenidoEmail = {
      to: email,
      from: SENDGRID_MAIL_FROM,
      subject: "Lo sentimos...un usuario cancelo tu reserva :(",
      text: `Hola ${nombre}.\nLo sentimos, el vendedor del articulo ${titulo} ha cancelado tu reserva.\nPuedes vovler a contactar con el para saber su motivo.`,
      html: `<h1>Hola ${nombre}.</h1><p>Lo sentimos, el vendedor del articulo ${titulo} ha cancelado tu reserva..</p><p>Puedes vovler a contactar con el para saber su motivo.</p>`,
    };

    await sgMail.send(contenidoEmail);
  } catch (error) {
    console.log(error);
  }
}

async function enviarMailDeConfirmacionVenta(nombre, email, titulo) {
  try {
    const { SENDGRID_KEY, SENDGRID_MAIL_FROM } = process.env;

    sgMail.setApiKey(SENDGRID_KEY);

    const contenidoEmail = {
      to: email,
      from: SENDGRID_MAIL_FROM,
      subject: "¡Han sido el comprador del articulo que estabas deseando!",
      text: `Hola ${nombre}.\nEl vendedor de ${titulo} ha aceptado tu reserva.\nPuedes ponerte en contacto con el para terminar de concretar la compra.\n¡No olvides calificar al vendedor luego de terminar la transacción!`,
      html: `<h1>Hola ${nombre}.</h1><p>El vendedor de ${titulo} ha aceptado tu reserva.</p><p>Puedes ponerte en contacto con el para terminar de concretar la compra.</p><p>¡No olvides calificar al vendedor luego de terminar la transacción!</p>`,
    };

    await sgMail.send(contenidoEmail);
  } catch (error) {
    console.log(error);
  }
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
  enviarEmailDeReserva,
  enviarEmailDeCancelacionReserva,
  enviarMailDeConfirmacionVenta,
  enviarMailRecuperarContrasenha,
  enviarEmailDeValidacionCorrecta,
};
