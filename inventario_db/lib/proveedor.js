'use strict'

module.exports = function setupProveedor (ProveedorModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (proveedor) {
    const cond = proveedor.id ? ({
      where: {
        id: proveedor.id
      }
    }) : null

    const existingProveedor = cond ? await ProveedorModel.findOne(cond) : null

    if (existingProveedor) {
      const updated = await ProveedorModel.update(proveedor, cond)
      return updated ? ProveedorModel.findOne(cond) : existingProveedor
    }

    const result = await ProveedorModel.create(proveedor)
    return result.toJSON()
  }

  function findById (id) {
    return ProveedorModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return ProveedorModel.findAll()
  }

  function deleteProveedor(id) {
    return ProveedorModel.destroy({
      where: { id }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteProveedor,
  }
}