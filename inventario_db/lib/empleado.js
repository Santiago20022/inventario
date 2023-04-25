'use strict'

module.exports = function setupEmpleado (EmpleadoModel, sequelize) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (empleado) {
    if (empleado.id) {
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
    }

    const result = await EmpleadoModel.create(empleado)
    return result.toJSON()
  }
  
  function findById (id) {
    return EmpleadoModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll () {
    return sequelize.query(`
      SELECT
        t1.id,
        t1.cedula,
        t1.nombre,
        t1.apellido,
        t1.direccion,
        t1.email,
        t2.nombre AS rol
      FROM
        empleados t1,
        rols t2
      WHERE t1.rolId = t2.id`,
      { type: sequelize.QueryTypes.SELECT}
    )
  }

  function deleteEmpleado(id) {
    return EmpleadoModel.destroy({
      where: { id }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteEmpleado,
  }
}