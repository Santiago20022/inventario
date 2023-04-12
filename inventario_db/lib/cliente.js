'use strict'

module.exports = function setupCliente (ClienteModel) {
  async function createOrUpdate (client) {
    const cond = {
      where: {
        id: client.id
      }
    }

    const existingClient = await ClienteModel.findOne(cond)

    if (existingClient) {
      const updated = await ClienteModel.update(client, cond)
      return updated ? ClienteModel.findOne(cond) : existingClient
    }

    const result = await ClienteModel.create(client)
    return result.toJSON()
  }

  function findById (id) {
    return ClienteModel.findById(id) // <nombreTablaModel>
  }

  function findAll () {
    return ClienteModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findAll
  }
}