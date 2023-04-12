'use strict'

module.exports = function setupCliente (ClienteModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return ClienteModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ClienteModel.findAll()
  }

  return {
    findById,
    findAll
  }
}