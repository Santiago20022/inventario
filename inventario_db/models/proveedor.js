'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupProveedorModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('proveedor', { // Nombre de la tabla
    nombre: {
      type: Sequelize.STRING,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    direccion: {
      type: Sequelize.STRING, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING, //Double = Float. La diferencia es que Double recibe mas decimales
      allowNull: false
    }
  })
}