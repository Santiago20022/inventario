'use strict'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
    return ProductoModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll (filter) {
    let where = {}
    if (filter) {
      where = {
        [Op.or]: [
          { codigo: { [Op.like]: `%${filter}%` } },
          { nombre: { [Op.like]: `%${filter}%` } },
          { precio: { [Op.like]: `%${filter}%` } }
        ]
      }
    }
    return ProductoModel.findAll({ where })
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}