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

    let products = await activeOrder[0].getProducts()
    // set the status before sending
    res.send({orderId: activeOrder[0].dataValues.id, products}).status(200)
    console.log("this will still run");
  } catch (error) {
    next(error)
  }
})

// in keeping our routes "RESTful", we don't want to add the verb to the route
// someone like "POST api/cart/:orderId/:productId" implies that you're adding the
// product to the cart since it's a POST

//PUT api/cart/addproduct/:orderId/:productId
router.put('/addproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)

    const throughTable = await Order_Product.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })

    if (throughTable) {
      throughTable.increment('quantity')
    } else {
      await activeOrder.addProduct(product)
    }

    let products = await activeOrder.getProducts()

    res.send({orderId: req.params.orderId, products}).status(200)
  } catch (error) {
    next(error)
  }
})

// Similarly here, you can make this a DELETE route

//PUT api/cart/removeroduct/:orderId/:productId
router.put('/removeproduct/:orderId/:productId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    const product = await Product.findByPk(req.params.productId)

    await activeOrder.removeProduct(product)

    let updatedProducts = await activeOrder.getProducts()

    res.send({orderId: req.params.orderId, updatedProducts}).status(200)
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

    let products = await activeOrder.getProducts()

    res.send({orderId: req.params.orderId, products}).status(200)
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart/submitorder/:orderId
router.put('/submitorder/:orderId', async (req, res, next) => {
  try {
    const activeOrder = await Order.findByPk(req.params.orderId)
    res.send(await activeOrder.update({status: 'completed'}))
  } catch (error) {
    next(error)
  }
})
