# Proyecto8-Backend

# ENDPOINTS

## Usuarios

- **GET** - [api/v1/proyecto8/usuarios/:idUsuario/valoraciones] -Ver valoraciones de un usuario por id.

- **GET** - [api/v1/proyecto8/usuarios/activacion] - Valida un usuario. ✅

- **GET** - [api/v1/proyecto8/usuarios/:idUsuario] - Obtener usuario por id. **CON TOKEN**✅

- **GET** - [api/v1/proyecto8/usuarios/perfil] - Obtener perfil del usuario. **CON TOKEN**

- **GET** - [api/v1/proyecto8/usuarios/articulos] - Obtener articulos de usuario. ✅ **CON TOKEN**

- **GET** - [api/v1/proyecto8/usuarios/articulos/:idArticulo] - Obtener articulos de usuario por id. ✅

- **POST** - [api/v1/proyecto8/usuarios/subirImagen] - Subir foto de perfil.✅ **CON TOKEN**

- **POST** - [api/v1/proyecto8/usuarios/inicioSesion] - Login de usuario. ✅

- **POST** - [api/v1/proyecto8/usuarios/registro] - Crea un usuario pendiente de activar. ✅

- **POST** - [api/v1/proyecto8/usuarios/recuperarContrasenha] - Recuperar contraseña de usuario.

- **POST** - [api/v1/proyecto8/usuarios/nuevaContrasenha] - Insertar nueva contraseña de usuario tras recuperación.

- **PUT** - [api/v1/proyecto8/usuarios] - Editar datos de usuario. ✅ **CON TOKEN**

- **DELETE** - [api/v1/proyecto8/usuarios/:idUsuario] - Eliminar usuario. ✅ **CON TOKEN**

## Articulos

- **GET** - [api/v1/proyecto8/articulos/:idArticulo] - Obtener articulos por id. ✅

- **GET** - [api/v1/proyecto8/articulos/:palabrasClaves] - Obtener articulos por categoria. ✅

- **GET** - [api/v1/proyecto8/articulos/:palabrasClaves] - Obtener articulos por palabra clave.

- **POST** - [api/v1/proyecto8/articulos/:idArticulo] - Crear articulo favorito. **CON TOKEN**

- **POST** - [api/v1/proyecto8/articulos] - Crear articulo. ✅ **CON TOKEN**

- **PUT** - [api/v1/proyecto8/articulos/:idArticulo/reservarArticulo] - Reservar artículo. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/articulos/:idArticulo/borrarRecerba] - Borrar reserva de artículo. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/articulos/:idArticulo/confirmarVenta] - Confirmar Venta. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/articulos] - Editar articulo. ✅ **CON TOKEN**

- **DELETE** - [api/v1/proyecto8/articulos/:idArticulo] - Eliminar articulo por id. ✅ **CON TOKEN**

## Articulos-Favoritos

- **GET** - [api/v1/proyecto8/favoritos/] - Obtener articulos favoritos por usuario. **CON TOKEN**

- **DELETE** - [api/v1/proyecto8/favoritos/:idArticulo] - Eliminar articulos favoritos por id. **CON TOKEN**

## Compra-venta

- **GET** - [api/v1/proyecto8/compraVenta/ventas/compras/idUsuario] - Obtener articulos comprados por usuario. **CON TOKEN**

- **GET** - [api/v1/proyecto8/compraVenta/ventas/ventas/idUsuario] - Obtener articulos vendidos por usuario. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/ventas/verValoraciones/:idUsuario] - Mostrar valoraciones usuario. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/ventas/valoracion/:idArticulo] - Valorar compra. **CON TOKEN**

- **PUT** - [api/v1/proyecto8/ventas/respuesta/:idArticulo] - Responder valoracion. **CON TOKEN**

## Fotos

- **GET** - [api/v1/proyecto8/fotos/idArticulo] - Obtener fotos para articulo.

- **POST** - [api/v1/proyecto8/fotos/subirImagen/:idArticulo] - subir foto por id de articulo **CON TOKEN**

- **DELETE** - [api/v1/proyecto8/fotos/borrarImagen/:idArticulo] - Borrar fotos por id de articulo. **CON TOKEN**

## Mensajeria

- **GET** - [api/v1/proyecto8/mensajes] - Mostrar chats iniciados **CON TOKEN**

- **GET** - [api/v1/proyecto8/mensajes//:idArticulo/:idVendedor/:idComprador] - Mostrar mensajes entre dos usuarios **CON TOKEN**

- **POST** - [api/v1/proyecto8//:idArticulo/:idVendedor/:idComprador] - Poner un mensaje nuevo en la conversacion **CON TOKEN**

<!--
.put((req, res) => confirmarVentaArticuloPorId(

  put  borrarReservaArticuloPorId

  put  reservarArticuloPorId -->
