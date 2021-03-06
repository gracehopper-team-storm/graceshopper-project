//can assume an active cart exists for logged in user
//we have created/found active cart when user logged in
//we need: that order id, product id

//adding a product to order
// cart/addproduct/orderid/productid

//order = Order.findByPk(orderId)
//product = Product.findByPk(productId)
//order.addProduct(product)

//removign a product from order
// cart/removeproduct/orderid/productid

//order = Order.findByPk(orderId)
//product = Product.findByPk(productId)
//order.removeProduct(product)

const router = require('express').Router()
const {Product, Order, User} = require('../db/models')
module.exports = router

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

router.put('/addproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)

    const updatedOrder = await activeOrder.addProduct(product)

    res.send(updatedOrder).status(200)
  } catch (error) {
    next(error)
  }
})

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
