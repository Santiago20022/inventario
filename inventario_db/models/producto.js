'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupProductoModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('producto', { // Nombre de la tabla
    codigo_producto: {
      type: Sequelize.INTEGER,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    nombre: {
      type: Sequelize.STRING, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    precio: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    cantidad: {
      type: Sequelize.INTEGER, //Double = Float. La diferencia es que Double recibe mas decimales
      allowNull: false
    },
    f_vencimiento: {
      type: Sequelize.DATE,
      allowNull: false
    },
    id_marca: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_tienda: {
      type: Sequelize. INTEGER,
      allowNull: false
    }
  })
}