'use strict'

module.exports = function setupRol (RolModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (rol) {
    const cond = {
      where: {
        id: rol.id
      }
    }

    const existingRol = await RolModel.findOne(cond)

    if (existingRol) {
      const updated = await RolModel.update(rol, cond)
      return updated ? RolModel.findOne(cond) : existingRol
    }

    const result = await RolModel.create(rol)
    return result.toJSON()
  }

  function findById (id) {
    return RolModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return RolModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}