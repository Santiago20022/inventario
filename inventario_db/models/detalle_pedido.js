'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupDetalle_PedidoModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('detalle_pedido', { // Nombre de la tabla
    id_proveedor: {
      type: Sequelize.INTEGER,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    id_producto: {
      type: Sequelize.INTEGER, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    id_tienda: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}