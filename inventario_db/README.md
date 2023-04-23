## Inventario DB
Inventario db es un modulo que se encargará de crear la base de datos con todas sus relaciones, ademas de exportar el CRUD para cada entidad (entidad = tabla).

## Cómo crear la base de datos
Se debe ingresar a localhost/phpmyadmin (o desde la consola) y crear la base de datos manualmente (sin tablas). El nombre de la base de datos debe ser el mismo que se puso en el objeto de configuracion en setup.js

```
{
    database: 'inventario', // Nombre de la base de datos
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
    logging: s => console.log(s), 
    setup: true
}
```
Luego, estando dentro del directorio/carpeta inventario_db correr el siguiente script:
```
npm run setup
```
Si la salida dentro de la consola al final dice "success:", quiere decir que la base de datos se creo correctamente.
Si se quiere volver a re crear la base de datos desde 0, se debe borrar primero manualmente todas las tablas o la base de datos de MySQL.