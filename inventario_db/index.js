'use strict'
const setupDatabase = require('./lib/db')
const setupProductoModel = require('./models/producto') //cambio todo esta par
const setupEmpleadoModel = require('./models/empleado') //no seria producto sino empleado 
const setupClienteModel = require('./models/cliente') //no seria producto sino empleado
const setupDetalle_pedidoModel = require('./models/detalle_pedido') //no seria producto sino empleado
const setupDetalle_ventaModel = require('./models/detalle_venta')
const setupMarcaModel = require('./models/marca')  
const setupProveedorModel = require('./models/proveedor')
const setupRolModel = require('./models/rol')
const setupTiendaModel = require('./models/tienda')
const setupVentaModel = require('./models/venta')
const defaults = require('defaults')
const setupProducto = require('./lib/producto')
const setupEmpleado = require('./lib/empleado')
const setupCliente = require('./lib/cliente')
const setupDetalle_pedido = require('./lib/detalle_pedido')
const setupDetalle_venta = require('./lib/detalle_venta')
const setupMarca = require('./lib/marca')
const setupProveedor = require('./lib/proveedor')
const setupRol = require('./lib/rol')
const setupTienda = require('./lib/tienda')
const setupVenta = require('./lib/venta')


module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const ProductoModel = setupProductoModel(config) //esto mismo con todos los models

  

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({force: true})
  }

  const Producto = setupProducto(ProductoModel) //lo mismo con todos los libs

  return {
    Producto
  }
}