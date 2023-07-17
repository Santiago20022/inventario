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

  function findAll (filter) {
    let filterCondition = ''
    if (filter) {
      filterCondition = `
        AND (t1.cedula LIKE '%${filter}%'
          OR t1.nombre LIKE '%${filter}%'
          OR t1.apellido LIKE '%${filter}%'
          OR t1.email LIKE '%${filter}%')
      `
    }
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
      WHERE t1.rolId = t2.id
      ${filterCondition}`,
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