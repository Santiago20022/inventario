'use strict'

module.exports = function setupTienda (TiendaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (tienda) {
    if (tienda.id) {
      const cond = {
        where: {
          id: tienda.id
        }
      }

      const existingTienda = await TiendaModel.findOne(cond)

      if (existingTienda) {
        const updated = await TiendaModel.update(tienda, cond)
        return updated ? TiendaModel.findOne(cond) : existingTienda
      }
    }

    const result = await TiendaModel.create(tienda)
    return result.toJSON()
  }

  function findById (id) {
    return TiendaModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return TiendaModel.findAll()
  }

  function deleteTienda(id) {
    return TiendaModel.destroy({
      where: { id }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteTienda,
  }
}