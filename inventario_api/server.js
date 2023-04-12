'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

// express error handler
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

  server.listen(port, () => console.log(`[inventario api] server listening on port ${port}`))
}

module.exports = server