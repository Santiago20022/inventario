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


module.exports = async function (config) { // Permite importar con require en otro archivo, es decir, exporta una función

  /**
   * Configuracion de modelos: Los modelos son la definicion de una tabla de la base de datos, con sus campos y tipos.
   */
  const sequelize = setupDatabase(config)
  const ProductoModel = setupProductoModel(config)
  const EmpleadoModel = setupEmpleadoModel(config)
  const ClienteModel = setupClienteModel(config)
  const DetallePedidoModel = setupDetallePedidoModel(config)
  const DetalleVentaModel = setupDetalleVentaModel(config)
  const MarcaModel = setupMarcaModel(config)
  const ProveedorModel = setupProveedorModel(config)
  const RolModel = setupRolModel(config)
  const TiendaModel = setupTiendaModel(config)
  const VentaModel = setupVentaModel(config)

  /**
   * Aca se define la relación de las tablas
   */

  // Un Rol puede pertenecer a uno o varios empleados
  RolModel.hasMany(EmpleadoModel) // hasMany = Puede tener uno o varios
  // Un empleado puede tener un rol
  EmpleadoModel.belongsTo(RolModel) // belogsTo = pertenece a 

  // Un empleado puede tener una o varias ventas
  EmpleadoModel.hasMany(VentaModel)
  // Una venta pertenece a un solo empleado
  VentaModel.belongsTo(EmpleadoModel)

  // Una tienda puede tener uno o varios empleados
  TiendaModel.hasMany(EmpleadoModel)
  // Un empleado puede pertenecer a una tienda
  EmpleadoModel.belongsTo(TiendaModel)

  // Una marca puede tener muchos productos
  MarcaModel.hasMany(ProductoModel)
  // Un producto puede pertenecer a una marca
  ProductoModel.belongsTo(MarcaModel)

  // Una tienda puede tener muchos productos
  TiendaModel.hasMany(ProductoModel)
  // Muchos productos pueden pertenecer a una tienda
  ProductoModel.belongsTo(TiendaModel)

  // Un detalle venta puede tener muchos productos
  ProductoModel.hasMany(DetalleVentaModel)
  // Un producto puede pertenecer a un detalle venta
  DetalleVentaModel.belongsTo(ProductoModel)

  // Un cliente puede tener una o varias ventas
  ClienteModel.hasMany(VentaModel)
  // Una venta puede pertenecer a un cliente
  VentaModel.belongsTo(ClienteModel)

  // Una venta puede tener varios detalles de venta
  VentaModel.hasMany(DetalleVentaModel)
  // Un detalle venta pertenece a una venta
  DetalleVentaModel.belongsTo(VentaModel)

  TiendaModel.hasMany(VentaModel)
  VentaModel.belongsTo(TiendaModel)

  TiendaModel.hasMany(DetallePedidoModel)
  DetallePedidoModel.belongsTo(TiendaModel)

  ProveedorModel.hasMany(DetallePedidoModel)
  DetallePedidoModel.belongsTo(ProveedorModel)

  ProductoModel.hasMany(DetallePedidoModel)
  DetallePedidoModel.belongsTo(ProductoModel)

  // Usar el usuario, contraseña y host del objeto de configuracion para acceder a la base de datos
  await sequelize.authenticate()

  if (config.setup) {
    // Si config.setup es true, borra y crea la base de datos de nuevo
    await sequelize.sync({force: true})
  }

  /**
   * Los libs son las funciones que contienen los CRUD para cada tabla
   */
  const Producto = setupProducto(ProductoModel)
  const Empleado = setupEmpleado(EmpleadoModel, sequelize)
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