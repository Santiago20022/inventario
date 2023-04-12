'use strict'

module.exports = function setupTienda (TiendaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return TiendaModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return TiendaModel.findAll()
  }

  return {
    findById,
    findAll
  }
}