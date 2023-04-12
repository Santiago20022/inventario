'use strict'

module.exports = function setupProveedor (ProveedorModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (proveedor) {
    const cond = {
      where: {
        id: proveedor.id
      }
    }

    const existingProveedor = await ProveedorModel.findOne(cond)

    if (existingProveedor) {
      const updated = await ProveedorModel.update(proveedor, cond)
      return updated ? ProveedorModel.findOne(cond) : existingProveedor
    }

    const result = await ProveedorModel.create(proveedor)
    return result.toJSON()
  }

  function findById (id) {
    return ProveedorModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ProveedorModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}