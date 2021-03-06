const router = require('express').Router()
const {Product, Order, User, Order_Product} = require('../db/models')
module.exports = router

//Find or create a user's active order
//GET api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'in_cart'
      }
    })
    res.send(activeOrder).status(201)
  } catch (error) {
    next(error)
  }
})

//PUT api/cart/addproduct/:orderId/:productId
router.put('/addproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)

    const productInCart = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })

    if (productInCart) {
      productInCart.increment('quantity')
    } else {
      await activeOrder.addProduct(product)
    }

    res.send(productInCart).status(200)
  } catch (error) {
    next(error)
  }
})

//PUT api/cart/addproduct/:orderId/:productId
router.put('/removeproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)

    const updatedOrder = await activeOrder.removeProduct(product)

    res.send(activeOrder).status(200)
  } catch (error) {
    next(error)
  }
})

//PUT api/cart/decrementproduct/:orderId/:productId
router.put('/decrementproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)

    const productInCart = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })

    if (productInCart.quantity > 1) {
      productInCart.decrement('quantity')
    }

    res.send(productInCart).status(200)
  } catch (error) {
    next(error)
  }
})
