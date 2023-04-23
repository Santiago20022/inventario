'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupProductoModel(config) { // Cambiar nombre de la funcion por setup<NombreTabla>Model
  const sequelize = setupDatabase(config)
  /**
   * El campo ID (primary key) se crea automaticamete por sequelize, es decir todas las tablas de la bd
   * van a tener el campo ID y sera autoincrementable.
   * Es lo mismo en SQL que:
   * CREATE TABLE producto(
   *  codigo_producto INT NOT NULL,
   *  nombre VARCHAR NOT NULL,
   *  precio DOUBLE NOT NULL,
   *  cantidad INT NOT NULL,
   *  f_vencimiento DATE NOT NULL
   * )
   */;
  return sequelize.define('producto', { // Nombre de la tabla
    codigo_producto: {
      type: Sequelize.INTEGER, //INT -> abreviacion de INTEGER
      allowNull: false // false: NO puede ser nulo, true SI puede ser nulo
    },
    nombre: {
      type: Sequelize.STRING,
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
  })
}