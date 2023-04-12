'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupRolModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('rol', { // Nombre de la tabla
    nombre: {
      type: Sequelize.STRING,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    descripcion: {
      type: Sequelize.STRING, //INT -> abreviacion de INTEGER
      allowNull: false
    }
  })
}