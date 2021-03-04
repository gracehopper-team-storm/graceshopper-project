const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  streetAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Address
