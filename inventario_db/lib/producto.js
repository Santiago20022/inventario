'use strict'

module.exports = function setupProducto (ProductoModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (producto) {
    const cond = {
      where: {
        id: producto.id
      }
    }

    const existingProducto = await ProductoModel.findOne(cond)

    if (existingProducto) {
      const updated = await ProductoModel.update(producto, cond)
      return updated ? ProductoModel.findOne(cond) : existingProducto
    }

    const result = await ProductoModel.create(producto)
    return result.toJSON()
  }

  function findById (id) {
    return ProductoModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ProductoModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}