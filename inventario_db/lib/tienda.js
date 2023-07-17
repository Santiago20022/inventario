'use strict'

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function setupTienda (TiendaModel) { //cambio el setup<nombreTabla> y el parametro <nombreTablaModel>
  async function createOrUpdate (tienda) {
    if (tienda.id) {
      const cond = {
        where: {
          id: tienda.id
        }
      }

      const existingTienda = await TiendaModel.findOne(cond)

      if (existingTienda) {
        const updated = await TiendaModel.update(tienda, cond)
        return updated ? TiendaModel.findOne(cond) : existingTienda
      }
    }

    const result = await TiendaModel.create(tienda)
    return result.toJSON()
  }

  function findById (id) {
    return TiendaModel.findByPk(id) // <nombreTablaModel>
  }

  function findAll (filter) {
    let where = {}
    if (filter) {
      where = {
        [Op.or]: [
          { razon_social: { [Op.like]: `%${filter}%` } },
          { direccion: { [Op.like]: `%${filter}%` } },
          { telefono: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } }
        ]
      }
    }
    return TiendaModel.findAll({ where })
  }

  function deleteTienda(id) {
    return TiendaModel.destroy({
      where: { id }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    deleteTienda,
  }
}