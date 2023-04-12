'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupEmpleadoModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  return sequelize.define('empleados', { // Nombre de la tabla
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
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    clave: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_rol: {
      type: Sequelize. INTEGER,
      allowNull: false
    },
    id_tienda: {
      type: Sequelize. INTEGER,
      allowNull: false
    }
  })
}