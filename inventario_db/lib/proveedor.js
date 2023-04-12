'use strict'

module.exports = function setupProveedor (ProveedorModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return ProveedorModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ProveedorModel.findAll()
  }

  return {
    findById,
    findAll
  }
}