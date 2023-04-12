const express = require('express')
const asyncify = require('express-asyncify')
const db = require('inventario-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Producto, Cliente, Empleado, Marca, Proveedor, Rol, Tienda, Venta

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
    Cliente = services.Cliente
    Empleado = services.Empleado
    Marca = services.Proveedor
    Proveedor = services.Proveedor
    Rol = services.Rol
    Tienda = services.Tienda
    Venta = services.Venta
  }
  next()
})

/**
 * API para productos
 */
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

api.post('/create/producto', async(req, res, next) => {
  console.log('entre a /create/producto')
  let data = req.body
  let result

  try {
    result = await Producto.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})


/**
 * API para cliente
 */

module.exports = api