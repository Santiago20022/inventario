const express = require('express')
const asyncify = require('express-asyncify')
const db = require('inventario-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Producto

api.use('*', async (req, res, next) => {
  if (!services) {
    console.log('Conectando a la base de datos')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    console.log(services)
    Producto = services.Producto
  }
  next()
})

api.get('/productos',async (req, res, next) => {
  console.log('Entre a /productos')
  let productos = []

  try {
    productos = await Producto.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(productos)
})

module.exports = api