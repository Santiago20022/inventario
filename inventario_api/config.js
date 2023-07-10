'use strict'

//este archivo contiene la cadena de conexion de la base de datos
module.exports = {
  db: {
    database:'inventario',
    username:'root',
    password:'root',
    host:'localhost',
    dialect:'mysql',
    logging: s => console.log(s)
  }
}
