'use strict'

/**
 * Este archivo es el primero que se ejecuta y crea un servidor que va a correr en el puerto 3000.
 * Es decir http://localhost:3000.
 * Tambien creara una ruta llamada /api que podra se accedida desde http://localhost:3000/api
 */
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const cors = require('cors')
const bodyParser = require('body-parser')

const api = require('./api')

const port = 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use(bodyParser.json({limit: "100mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
app.use(cors())
app.use('/api', api) // Aca se crea la ruta /api, que va a usar el archivo api.js

// express error handler, si ocurre algun error dentro de api.js, vendra a esta funcion para mostrar el error
app.use((err, req, res, next) => {
  console.log(`Error ${err.message}`)
  if (err.message.match(/not found/)) {
    return res.status(404).send({error: err.message})
  }
  res.status(500).send({error: err.message})
})

function handleFatalError (err) {
  console.log(`[fatal error] ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  // Subir el servidor al puerto 3000
  server.listen(port, () => console.log(`[inventario api] server listening on port ${port}`))
}

module.exports = server