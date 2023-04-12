'use strict'

module.exports = function setupEmpleado (EmpleadoModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return EmpleadoModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return EmpleadoModel.findAll()
  }

  return {
    findById,
    findAll
  }
}