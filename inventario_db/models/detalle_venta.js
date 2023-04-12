'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupDetalle_VentaModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('detalle_venta', { // Nombre de la tabla
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    id_producto: {
      type: Sequelize.INTEGER, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    id_venta: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  })
}