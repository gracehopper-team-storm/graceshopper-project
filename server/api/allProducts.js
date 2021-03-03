const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET route for /allproducts/
router.get('/', async (req, res, next) => {
  try {
    const products = Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
