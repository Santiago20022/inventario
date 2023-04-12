'use strict'

module.exports = function setupProducto (ProductoModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return ProductoModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ProductoModel.findAll()
  }

  return {
    findById,
    findAll
  }
}