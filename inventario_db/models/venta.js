'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupVentaModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('venta', { // Nombre de la tabla
    fecha_pedido: {
      type: Sequelize.DATE,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    id_empleado: {
      type: Sequelize.INTEGER, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    id_cliente: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total: {
      type: Sequelize.DOUBLE, //Double = Float. La diferencia es que Double recibe mas decimales
      allowNull: false
    },
    id_tienda: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}