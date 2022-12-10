# Proyecto Base Backend - Manual de instalación para entornos de desarrollo

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## 1. Requerimientos

| Nombre       | Versión | Descripción                                            | Instalación                                      |
|--------------|---------|--------------------------------------------------------|--------------------------------------------------|
| `PostgreSQL` | ^15     | Gestor de base de datos.                               | https://www.enterprisedb.com/downloads/postgres-postgresql-downloads |
| `NodeJS`     | ^14.6.0     | Entorno de programación de JavaScript.                 | `nvm install 14` https://github.com/nvm-sh/nvm   |
| `NPM`        | ^9      | Gestor de paquetes de NodeJS.                          | `npm install -g npm@latest`                       |


## 2. Instalación

### Clonación del proyecto e instalación de dependencias

```bash
# Clonación del proyecto
git clone https://github.com/Takirrod/trazo-backend.git

# Ingresamos dentro de la carpeta del proyecto
cd trazo-backend

# Instalamos dependencias
npm install
```

### Archivos de configuración.

Crear los archivos de configuración con base en los archivos `sample` y modificar los valores que sean necesarios, codigo valido solo en linux.

```bash
# Variables de entorno globales
cp .env.sample .env
```

## Creación y configuración de la Base de Datos

```bash
# Crear una base de datos, se recomienda el nombre de database_db para evitar cambios en las variables de entorno:
create database database_db;

# Seleccion de la base de datos creada:
\c database_db;

# Crear los siguientes esquemas de base de datos:
create schema usuarios;
create schema trazos;
create schema guardados;

# Configura la base de datos.
npm run setup
```

## Despliegue de la aplicación

```bash
# Ejecución en modo desarrollo (live-reload)
npm run start:dev
```

## Variables de entorno

**Datos de despliegue**

| Variable   | Valor por defecto | Descripción                                  |
|------------|-------------------|----------------------------------------------                    |
| `PORT`     | `3000`            | Puerto en el que se levantará la aplicación. |

\*\*\* La URL de despliegue sería: `http://localhost:3000/api`

**Configuración de la base de datos**

| Variable                 | Valor por defecto | Descripción                                                                                       |
|--------------------------|-------------------|---------------------------------------------------------------------------------------------------|
| `DB_HOST`                | `localhost`       | Host de la base de datos.                                                                         |
| `DB_USERNAME`            | `postgres`        | nombre de usuario de la base de datos.                                                            |
| `DB_PASSWORD`            | `postgres`        | contraseña de la base de datos.                                                                   |
| `DB_DATABASE`            | `database_db`     | nombre de la base de datos.                                                                       |
| `DB_PORT`                | `5432`            | puerto de despliegue de la base de datos.                                                         |
| `DB_SCHEMA_USUARIOS`     | `usuarios`        | Utilizado para almacenar la tabla usuarios, roles y todo lo relacionado con la autenticación.     |
| `DB_SCHEMA_TRAZOS` | `trazos`    | Utilizado para almacenar tablas relacionadas a los trazos como trazo y paso.                                             |
| `DB_SCHEMA_GUARDADOS` | `guardados`    | Utilizado para almanecar tablas de tipo guardado, que son los datos guardados.                                             |

**Configuración para módulo de autenticación**

| Variable                   | Valor por defecto | Descripción                                                                             |
|----------------------------|-------------------|-----------------------------------------------------------------------------------------|
| `JWT_SECRET`               |                   | Llave para generar los tokens de autorización. Genera una llave fuerte para producción. |
| `JWT_EXPIRES_IN`           |                   | Tiempo de expiración del token de autorización en milisegundos.                         |
| `TRAZO_SESSION_SECRET`           |                   | Clave secreta para la generacion de la sesion.                         |


**Configuración para el servicio de autenticacion de Google**

| Variable    | Valor por defecto | Descripción                                                       |
|-------------|-------------------|-------------------------------------------------------------------|
| `GOOGLE_CLIENT_ID`   |                   | ID del cliente de identificacion para la autenticacion de Google.   |