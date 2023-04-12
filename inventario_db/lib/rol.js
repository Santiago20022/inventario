'use strict'

module.exports = function setupRol (RolModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return RolModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return RolModel.findAll()
  }

  return {
    findById,
    findAll
  }
}