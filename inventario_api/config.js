'use strict'

module.exports = {
  db: {
    database: process.env.DB_NAME || 'inventario',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || 'root',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => console.log(s)

  }
}


