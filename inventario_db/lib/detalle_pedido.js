'use strict'

module.exports = function setupDetalle_pedido (Detalle_pedidoModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return Detalle_pedidoModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return Detalle_pedidoModel.findAll()
  }

  return {
    findById,
    findAll
  }
}