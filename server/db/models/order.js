const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  session_id: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('in_cart', 'completed')
  }
})

module.exports = Order
