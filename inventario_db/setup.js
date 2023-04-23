'use strict'
const db = require('./') // Cuando encontramos ./ solo, es decir, importamos index.js

async function setup () {
  const config = { // Objeto que contiene la cadena de conexión a la base de datos
    database: 'inventario', // Nombre de la base de datos
    username: 'root', // Nombre de usuario de mi base de datos local
    password: 'root', // Contraseña de mi usuario de mysql local
    host: 'localhost',
    dialect: 'mysql', // Que tipo de base de datos de datos voy a usar, en este caso, MySQL
    logging: s => console.log(s), // En caso de error, hace un console.log con lo que pasó
    /**
     * Setup: true -> Quiere decir que borra la base de datos con todos los datos que tenga y la vuelve a crear
     * Setup: false -> Quiere decir que solo se creara una conexión a la base de datos.
     */
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('success: ')
  process.exit(0)
}

function handleFatalError (error) {
  console.log(`'[Fatal error]' ${error.message}`)
  console.log(error.stack)
  process.exit(1)
}

setup()