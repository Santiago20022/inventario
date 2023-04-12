'use strict'

module.exports = function setupEmpleado (EmpleadoModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (empleado) {
    const cond = {
      where: {
        id: empleado.id
      }
    }

    const existingEmpleado = await EmpleadoModel.findOne(cond)

    if (existingEmpleado) {
      const updated = await EmpleadoModel.update(empleado, cond)
      return updated ? EmpleadoModel.findOne(cond) : existingEmpleado
    }

    const result = await EmpleadoModel.create(empleado)
    return result.toJSON()
  }
  
  function findById (id) {
    return EmpleadoModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return EmpleadoModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}