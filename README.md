## Inventario

Este proyecto se divide en 3 modulos

- inventario_db
- inventario_api
- inventario-web

A continuación se describira en orden los modulos como deben ser ejecutados para que el proyecto corra.

# Inventario_db

Este modulo utiliza una libreria llamada sequelize que sirve para manejar multiples tipos de bases de datos, en este caso estaremos usando MySQL. Este modulo se encarga de:
- Generar los modelos / esquemas de las tablas de la base de datos, es decir, tiene la deficion de las tablas.
- Genera las relaciones entre los modelos para crear una base de datos relacional.
- Exporta las funciones que se usaran para el CRUD.

En la carpeta `inventario_db/lib` se encontraran las funciones para los CRUD.
En la carpeta `inventario_db/models` se encontraran las deficiones de las tablas de la base de datos.
El archivo `inventario_db/index.js` se encarga de la logica para generar las relaciones entre tablas y exportar las funciones del CRUD.
El archivo `inventario_db/setup.js` se encarga de la creación de la base de datos en MySQL.

Para crear la base de datos se debe navegar hasta la carpeta `inventario_db` (cd `cd Documents/media/invnetario_db`), se debe correr los siguientes comandos (en orden):
- npm install
- npm run setup -> Este comando solo debe hacerse si la base de datos no esta creada o quiere crearse desde 0 otra vez

# Inventario_api

Este modulo crea unas funciones que podran ser utilizadas en el frontend para hacer un CRUD.
Aquí se require el modulo de `inventario_db` ya que se utilizaran las funciones de la carpeta `lib` para la creacion, actualizacion, lectura y eliminación de registros en la base de datos.

API significa Application programming interface que basicamente es un conjunto de funciones y procedimientos que pueden ser accedidos por otros servicios, en nuestro caso por el front-end.

Un API tiene unos verbos HTTP, que en otras palabras son la manera como interacturemos con los datos, los cuales son:
GET -> Se utiliza para traer datos, en terminos de CRUD seria Read
POST -> Se utiliza para guardar y actualizar datos, en terminos de CRUD seria Cread y Update
DELETE -> Se utiliza para borrar datos, en terminos de CRUD seria Delete

Documentación de la API:
- api.get('/productos') -> Trae TODOS los productos de la base de datos
- api.post('/create/producto') -> Crea o actualiza un producto en la base de datos
- api.get('/clients') -> Trae TODOS los clientes de la base de datos
- api.post('/create/client') -> Crea o actualiza un cliente en la base de datos
- api.get('/empleados') -> Trae TODOS los empleados de la base de datos
- api.get('/empleado/:id') -> Trae un solo empleado de la base de datos dependiendo del ID
- api.post('/create/empleado') -> Crea o actualiza un empleado en la base de datos
- api.delete('/delete/empleado') -> Borra un empleado de la base de datos
- api.get('/marcas') -> Trae TODAS las marcas de la base de datos
- api.get('/marca/:id') -> Trae una sola marca de la base de datos dependiendo del ID
- api.post('/create/marca') -> Crea o actualiza una marca en la base de datos
- api.delete('/delete/marca') -> Borra una marca de la base de datos
- api.get('/proveedores') -> Trae todos los proveedores de la base de datos
- api.get('/proveedor/:id') -> Trae un solo proveedor de la base de datos dependiendo del ID
- api.post('/create/proveedor') -> Crea o actualiza un proveedor en la base de datos
- api.delete('/delete/proveedor') -> Borra un proveedor de la base de datos
- api.get('/roles') -> Trae TODOS los roles de la base de datos
- api.get('/rol/:id') -> Trae un solo rol de la base de datos dependiendo del ID
- api.post('/create/rol') -> Crea o actualiza un rol de la base de datos
- api.delete('/delete/rol') -> Borra un rol de la base de datos
- api.get('/tiendas') -> Trae todas las tiendas de la base de datos
- api.get('/tienda/:id') -> Trae una sola tienda de la base de datos dependiendo del ID
- api.post('/create/tienda') -> Crea o actualiza una tienda de la base de datos
- api.delete('/delete/tienda') -> Borra una tienda de la base de datos
