#  Bibliotech — API REST para una biblioteca

##  Descripción

**Bibliotech** es una API REST desarrollada con Node.js y Express para gestionar la información de una biblioteca. Permite trabajar con autores, usuarios, libros y préstamos, además de contar con funcionalidades de autenticación y manejo de errores.

El proyecto utiliza MongoDB como base de datos y Mongoose para realizar la conexión y gestionar la información.

##  Tecnologías utilizadas

* **Node.js:** entorno de ejecución de JavaScript.
* **Express:** framework para crear la API REST.
* **MongoDB:** base de datos NoSQL.
* **Mongoose:** conexión y gestión de datos en MongoDB.
* **JSON Web Token (JWT):** tecnología utilizada para trabajar con tokens de autenticación.
* **bcryptjs:** biblioteca para el manejo de contraseñas.
* **dotenv:** gestión de variables de entorno.
* **CORS:** configuración de solicitudes entre diferentes orígenes.
* **express-validator:** validación de datos de entrada.
* **Nodemon:** herramienta para reiniciar automáticamente el servidor durante el desarrollo.

##  Funcionalidades principales

La API está organizada en los siguientes módulos:

##  Autenticación

* Gestión de las rutas de autenticación.
* Operaciones relacionadas con el registro y el inicio de sesión.
* Manejo de tokens de autenticación.

##  Autores

* Módulo para gestionar la información de los autores.
* Operaciones de consulta, creación y actualización, según los controladores implementados.

## Usuarios

* Módulo para gestionar los usuarios de la aplicación.
* Consultas y operaciones relacionadas con los usuarios y sus roles.

## Libros

* Módulo para gestionar la información de los libros.
* Consultas y operaciones relacionadas con los libros disponibles.

##  Préstamos

* Módulo para gestionar los préstamos de libros.
* Operaciones relacionadas con las consultas, devoluciones y préstamos vencidos.

##  Manejo de errores

* Registro de solicitudes mediante un middleware.
* Manejo de rutas no encontradas.
* Gestión centralizada de errores.


##  Instalación y ejecución

## 1. Clonar el repositorio

```bash
git clone https://github.com/josguecar277-code/BIBLIOTECA-TECH.git
```

## 2. Ingresar a la carpeta del proyecto

```bash
cd BIBLIOTECA-TECH
```

## 3. Instalar las dependencias

```bash
npm install
```

## 4. Configurar las variables de entorno

Crea un archivo llamado `.env` en la raíz del proyecto y configura las variables necesarias:

```env
PORT=3000
MONGO_URL=tu_url_de_conexion_a_mongodb
```

* PORT: puerto en el que se ejecutará el servidor.
* MONGO_URL: cadena de conexión a la base de datos MongoDB.

**Importante:** reemplaza los valores de ejemplo por tu configuración real. No publiques contraseñas ni credenciales de conexión en el repositorio.

## 5. Iniciar el servidor

Para ejecutar la aplicación normalmente:

```bash
npm start
```

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Si todo está configurado correctamente, la consola mostrará un mensaje indicando que la conexión con MongoDB fue exitosa y otro con el puerto en el que está escuchando el servidor.

## Rutas principales de la API

La aplicación organiza sus rutas mediante los siguientes prefijos:

| Módulo        | Prefijo        |
| ------------- | -------------- |
| Autenticación | /api/auth      |
| Autores       | /api/authors   |
| Usuarios      | /api/users     |
| Libros        | /api/books     |
| Préstamos     | /api/loans     |

Estos prefijos se encuentran configurados en `server.js`.

Para conocer las rutas completas, los métodos HTTP y los parámetros que acepta cada operación, consulta los archivos correspondientes dentro de la carpeta `routes/`.

## Pruebas con Postman

Puedes utilizar Postman para enviar solicitudes HTTP a la API y comprobar el funcionamiento de sus módulos.

## Pasos generales

1. Inicia el servidor y verifica que la conexión con MongoDB funcione correctamente.
2. Abre Postman.
3. Crea una colección llamada **Bibliotech**.
4. Organiza las solicitudes según los módulos de la API.
5. Configura el método HTTP, la URL, los encabezados y el cuerpo de cada solicitud según la operación que quieras probar.
6. Ejecuta las solicitudes y revisa las respuestas del servidor.

Como los prefijos de las rutas ya están definidos, las URL completas dependerán de los endpoints implementados en los archivos de `routes/`.

Si un endpoint requiere autenticación, configura el token y los encabezados correspondientes de acuerdo con su implementación.

##  Dependencias

Las dependencias principales del proyecto se encuentran declaradas en `package.json`.

Para instalarlas, ejecuta:

```bash 
npm install
```

Los comandos disponibles para ejecutar la aplicación son:

| Comando             | Descripción                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm start`         | Inicia el servidor.                                          |
| `npm run dev`       | Inicia el servidor con Nodemon para facilitar el desarrollo. |
| `npm run start:dev` | Inicia Nodemon con la opción de inspección de Node.js.       |


##  Autor

Proyecto académico desarrollado como ejercicio de programación y construcción de una API REST.

##  Licencia

El archivo `package.json` declara la licencia ISC.
