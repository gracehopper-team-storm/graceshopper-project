const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Address = require('./address')

User.hasMany(Order)
Order.belongsTo(User)

const Order_Product = sequelize.define(
  'Order_Product',
  {
    quantity: SEQUELIZE.Integer,
  },
  {timestamps: false}
)
Product.belongsToMany(Order, {through: Order_Product})
Order.belongsToMany(Product, {through: Order_Product})

const User_Address = sequelize.define(
  'User_Address',
  {
    type: SEQUELIZE.ENUM(['billing', 'shipping']),
  },
  {timestamps: false}
)
User.belongsToMany(Address, {through: User_Address})
Address.belongsToMany(User, {through: User_Address})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
}
