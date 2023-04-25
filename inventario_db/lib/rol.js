'use strict'

module.exports = function setupRol (RolModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (rol) {
    if (rol.id) {
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
    }
    
    const result = await RolModel.create(rol)
    return result.toJSON()
  }

  function findById (id) {
    return RolModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return RolModel.findAll()
  }

  function deleteRol(id) {
    return RolModel.destroy({
      where: { id }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteRol,
  }
}