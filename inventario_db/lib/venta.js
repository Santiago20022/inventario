'use strict'

module.exports = function setupVenta (VentaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (venta) {
    const cond = {
      where: {
        id: venta.id
      }
    }

    const existingTienda = await TiendaModel.findOne(cond)

    if (existingTienda) {
      const updated = await TiendaModel.update(tienda, cond)
      return updated ? TiendaModel.findOne(cond) : existingTienda
    }

    const result = await TiendaModel.create(tienda)
    return result.toJSON()
  }

  function findById (id) {
    return VentaModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return VentaModel.findAll()
  }

  return {
    findById,
    findAll
  }
}