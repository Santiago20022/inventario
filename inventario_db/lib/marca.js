'use strict'

module.exports = function setupMarca (MarcaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  function findById (id) {
    return MarcaModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return MarcaModel.findAll()
  }

  return {
    findById,
    findAll
  }
}