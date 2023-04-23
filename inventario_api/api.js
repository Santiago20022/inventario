const express = require('express')
const asyncify = require('express-asyncify')
const db = require('inventario-db')
const config = require('./config')

const api = asyncify(express.Router())

let services, Producto, Cliente, Empleado, Marca, Proveedor, Rol, Tienda, Venta

api.use('*', async (req, res, next) => { // * significa, que cada vez que se llame cualquier ruta del api, va a entrar primero a este bloque de codigo
  if (!services) {
    console.log('Conectando a la base de datos')
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    /**
     * Estos son los libs de inventario_db, es decir, los CRUD
     */
    Producto = services.Producto
    Cliente = services.Cliente
    Empleado = services.Empleado
    Marca = services.Marca
    Proveedor = services.Proveedor
    Rol = services.Rol
    Tienda = services.Tienda
    Venta = services.Venta
  }
  next() // Ejecuta la ruta que originalmente se llamo
})

/**
 * API para productos
 * GET: Trae datos, es decir, es el READ de un CRUD
 * POST: Inserta o actualiza, es decir es el CREAR y UPDATE de un CRUD
 * DELETE: Borra datos, es decir es el DELETE de un CRUD
 */
api.get('/productos',async (req, res, next) => {
  console.log('Entre a /productos')
  let productos = []

  try {
    productos = await Producto.findAll()
  } catch (e) {
    next(e)
  }
  res.send(productos) // Envia una respues al frontend con todos los datos
})

api.post('/create/producto', async(req, res, next) => {
  console.log('entre a /create/producto')
  /**
   * {
   *  codigo_producto: ##,
   *  nombre: "",
   *  precio: ##,
   *  cantidad: ##,
   *  f_vencimiento: MM-DD-YYYY
   * }
   */
  let data = req.body // Obtiene los datos que se enviaron del formulario del frontend
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
 api.get('/clients',async (req, res, next) => {
  console.log('Entre a /clients')
  let clientes = []

  try {
    clientes = await Cliente.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(clientes)
})

api.post('/create/client', async(req, res, next) => {
  console.log('entre a /create/client')
  let data = req.body
  let result

  try {
    result = await Cliente.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para empleados
 */
 api.get('/empleados',async (req, res, next) => {
  console.log('Entre a /empleados')
  let empleados = []

  try {
    empleados = await Empleados.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(empleados)
})

api.post('/create/empleado', async(req, res, next) => {
  console.log('entre a /create/empleado')
  let data = req.body
  let result

  try {
    result = await Empleado.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para marca
 */
 api.get('/marcas',async (req, res, next) => {
  console.log('Entre a /marcas')
  let marcas = []

  try {
    marcas = await Marca.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(marcas)
})

api.post('/create/marca', async(req, res, next) => {
  console.log('entre a /create/marca')
  let data = req.body
  let result

  try {
    result = await Marca.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para proveedor
 */
 api.get('/proveedores',async (req, res, next) => {
  console.log('Entre a /proveedores')
  let proveedores = []

  try {
    proveedores = await Proveedor.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(proveedores)
})

api.post('/create/proveedor', async(req, res, next) => {
  console.log('entre a /create/proveedor')
  let data = req.body
  let result

  try {
    result = await Proveedor.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para rol
 */
 api.get('/roles',async (req, res, next) => {
  console.log('Entre a /roles')
  let roles = []

  try {
    roles = await Rol.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(roles)
})

api.post('/create/rol', async(req, res, next) => {
  console.log('entre a /create/rol')
  let data = req.body
  let result

  try {
    result = await Rol.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para tienda
 */
 api.get('/tiendas',async (req, res, next) => {
  console.log('Entre a /tiendas')
  let tiendas = []

  try {
    tiendas = await Tienda.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(tiendas)
})

api.post('/create/tienda', async(req, res, next) => {
  console.log('entre a /create/tienda')
  let data = req.body
  let result

  try {
    result = await Tienda.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

/**
 * API para venta
 */
 api.get('/ventas',async (req, res, next) => {
  console.log('Entre a /ventas')
  let ventas = []

  try {
    ventas = await Venta.findAll()   
  } catch (e) {
    next(e)
  }
  res.send(ventas)
})

api.post('/create/venta', async(req, res, next) => {
  console.log('entre a /create/venta')
  let data = req.body
  let result

  try {
    result = await Venta.createOrUpdate(data)
  } catch (error) {
    next(error)
  }

  res.status(200).send(result)
})

module.exports = api