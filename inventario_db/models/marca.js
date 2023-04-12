'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupMarcaModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('marca', { // Nombre de la tabla
    // El ID no se coloca en los campos. Se autogenera con Sequelize.
    nombre: {
      type: Sequelize.STRING, // Lo mismo que varchar o text
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })
}