'use strict'
const setupDatabase = require('./lib/db')
const setupProductoModel = require('./models/producto') //cambio todo esta par
const setupEmpleadoModel = require('./models/empleado') //no seria producto sino empleado 
const setupClienteModel = require('./models/cliente') //no seria producto sino empleado
const setupDetallePedidoModel = require('./models/detalle_pedido') //no seria producto sino empleado
const setupDetalleVentaModel = require('./models/detalle_venta')
const setupMarcaModel = require('./models/marca')  
const setupProveedorModel = require('./models/proveedor')
const setupRolModel = require('./models/rol')
const setupTiendaModel = require('./models/tienda')
const setupVentaModel = require('./models/venta')
const defaults = require('defaults')
const setupProducto = require('./lib/producto')
const setupEmpleado = require('./lib/empleado')
const setupCliente = require('./lib/cliente')
const setupDetallePedido = require('./lib/detalle_pedido')
const setupDetalleVenta = require('./lib/detalle_venta')
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
  const ProductoModel = setupProductoModel(config)
  const EmpleadoModel = setupEmpleadoModel(empleado)
  const ClienteModel = setupClienteModel(config)
  const DetallePedidoModel = setupDetallePedidoModel(config)
  const DetalleVentaModel = setupDetalleVentaModel(config)
  const MarcaModel = setupMarcaModel(config)
  const ProveedorModel = setupProveedorModel(config)
  const RolModel = setupRolModel(config)
  const TiendaModel = setupTiendaModel(config)
  const VentaModel = setupVentaModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({force: true})
  }

  const Producto = setupProducto(ProductoModel)
  const Empleado = setupEmpleado(EmpleadoModel)
  const Cliente = setupCliente(ClienteModel)
  const DetallePedido = setupDetallePedido(DetallePedidoModel)
  const DetalleVenta = setupDetalleVenta(DetalleVentaModel)
  const Marca = setupMarca(MarcaModel)
  const Proveedor = setupProveedor(ProveedorModel)
  const Rol = setupRol(RolModel)
  const Tienda = setupTienda(TiendaModel)
  const Venta = setupVenta(VentaModel)


  return {
    Producto,
    Empleado,
    Cliente,
    DetallePedido,
    DetalleVenta,
    Marca,
    Proveedor,
    Rol,
    Tienda,
    Venta
  }
}