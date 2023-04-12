'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupClienteModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('cliente', { // Nombre de la tabla
    cedula: {
      type: Sequelize.STRING,
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    nombre: {
      type: Sequelize.STRING, //INT -> abreviacion de INTEGER
      allowNull: false
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false
    },
    direccion: {
      type: Sequelize.STRING, //Double = Float. La diferencia es que Double recibe mas decimales
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}