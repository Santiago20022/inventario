'use strict'

module.exports = function setupDetalle_venta (Detalle_ventaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return Detalle_ventaModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return Detalle_ventaModel.findAll()
  }

  return {
    findById,
    findAll
  }
}