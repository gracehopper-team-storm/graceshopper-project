const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'A full description is comming soon.'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://c.i.etsystatic.com/19586643/r/il/afd3d5/2705948432/il_1588xN.2705948432_omh6.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Product
