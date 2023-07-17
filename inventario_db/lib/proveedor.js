'use strict'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

  function findAll (filter) {
    let where = {}
    if (filter) {
      where = {
        [Op.or]: [
          { nombre: { [Op.like]: `%${filter}%` } },
          { direccion: { [Op.like]: `%${filter}%` } },
          { telefono: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } }
        ]
      }
    }
    return ProveedorModel.findAll({ where })
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