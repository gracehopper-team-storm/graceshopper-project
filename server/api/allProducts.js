const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET route for /allproducts/
router.get('/', async (req, res, next) => {
  try {
    const products = Product.findAll() // Already fixed :) I'm working from the code I pulled at 11am
    res.json(products)
  } catch (error) {
    next(error)
  }
})
