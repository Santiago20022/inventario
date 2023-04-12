'use strict'

module.exports = function setupVenta (VentaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return VentaModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return VentaModel.findAll()
  }

  return {
    findById,
    findAll
  }
}