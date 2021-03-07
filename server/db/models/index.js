const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Address = require('./address')
const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define(
  'Order_Product',
  {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
  },
  {timestamps: false}
)

const User_Address = db.define(
  'User_Address',
  {
    type: Sequelize.ENUM(['billing', 'shipping'])
  },
  {timestamps: false}
)

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {through: Order_Product})
Order.belongsToMany(Product, {through: Order_Product})

User.belongsToMany(Address, {through: User_Address})
Address.belongsToMany(User, {through: User_Address})

module.exports = {
  User,
  Product,
  Order,
  Address,
  Order_Product,
  User_Address
}
