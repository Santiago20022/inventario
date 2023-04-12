'use strict'

module.exports = function setupMarca (MarcaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (marca) {
    const cond = {
      where: {
        id: marca.id
      }
    }

    const existingMarca = await MarcaModel.findOne(cond)

    if (existingMarca) {
      const updated = await MarcaModel.update(marca, cond)
      return updated ? MarcaModel.findOne(cond) : existingMarca
    }

    const result = await MarcaModel.create(marca)
    return result.toJSON()
  }

  function findById (id) {
    return MarcaModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return MarcaModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}