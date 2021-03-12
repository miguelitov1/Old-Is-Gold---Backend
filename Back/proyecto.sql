-- Creacion base datos

create database proyecto8 collate='utf8mb4_spanish_ci' character set = "utf8mb4";

-- Seleccion base datos
use proyecto8;

-- creacion tablas 
create table usuarios(
id int unsigned auto_increment primary key,
nombreUsuario varchar(20) unique not null,
nombre varchar(30) not null,
apellidos varchar(60) not null,
contrasenha varchar(255) not null,
localidad varchar(40),
foto varchar(60) default "defaultAvatar.jpg",
email varchar(60) unique not null,
fecha timestamp default current_timestamp
);

create table categorias(
id int unsigned auto_increment primary key,
titulo varchar(60) not null
);

create table articulos(
id int unsigned auto_increment primary key,
id_usuario int unsigned not null,
id_categoria int unsigned not null,
titulo varchar(60) not null,
descripcion longtext not null,
localizacion varchar(400) not null,
precio decimal(8,2) not null,
id_usuario_comprador int unsigned,
confirmacionVenta boolean default 0,
fecha timestamp default current_timestamp,
nro_visitas int unsigned default 0,
foto1 VARCHAR(120) DEFAULT NULL,
foto2 VARCHAR(120) DEFAULT NULL,
foto3 VARCHAR(120) DEFAULT NULL,
foto4 VARCHAR(120) DEFAULT NULL,
foto5 VARCHAR(120) DEFAULT NULL,
constraint articulo_usuarioid_fk foreign key (id_usuario)
	references usuarios(id) on delete cascade,
constraint articulo_categoriaid_fk foreign key (id_categoria)
	references categorias(id) on delete cascade 
);
 
create table compras(
id_articulo int unsigned not null,
id_comprador int unsigned not null,
fecha timestamp default current_timestamp,
valoracion tinyint,
comentarioValoracion varchar (255),
respuestaVendedor varchar (255) DEFAULT NULL,
primary key(id_articulo, id_comprador),
constraint compra_articuloid_fk foreign key (id_articulo)
	references articulos(id) on delete cascade,
constraint compra_usuarioid_fk foreign key (id_comprador)
	references usuarios(id) on delete cascade
);

create table articulos_favoritos(
id_articulo int unsigned not null,
id_usuario int unsigned not null,
fecha timestamp default current_timestamp,
primary key(id_articulo, id_usuario),
constraint favoritos_articuloid_fk foreign key (id_articulo)
	references articulos(id) on delete cascade,
constraint favoritos_usuarioid_fk foreign key (id_usuario)
	references usuarios(id) on delete cascade
);

create table fotos_articulos(
id int unsigned auto_increment primary key,
fotos longblob,
id_articulo int unsigned not null,
constraint fotoarticulo_articuloid_fk foreign key (id_articulo)
	references articulos(id) on delete cascade
);

CREATE TABLE activacion_usuarios (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
id_usuario int NOT NULL,
codigo_verificacion char(64) NOT NULL,
fecha_creacion datetime NOT NULL,
fecha_verificacion datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE mensajeria (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
id_emisor INT UNSIGNED NOT NULL,
id_receptor INT UNSIGNED NOT NULL,
id_articulo INT UNSIGNED NOT NULL,
id_comprador INT UNSIGNED NOT NULL,
id_vendedor INT UNSIGNED NOT NULL,
mensaje VARCHAR (255) NOT NULL,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
constraint mensajeria_idarticulo_fk foreign key (id_articulo)
	references articulos(id) on delete cascade
)






