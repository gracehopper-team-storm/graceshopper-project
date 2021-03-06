'use strict'

const db = require('../server/db')
const {User, Order, Address, Product} = require('../server/db/models')
const faker = require('faker')

async function seedUsers() {
  await User.create({
    firstName: 'Natalie',
    lastName: 'Lane',
    email: 'natalie.lane@gracehopper.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })
  await User.create({
    firstName: 'Kade',
    lastName: 'Cahe',
    email: 'kadecahe@gmail.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })
  await User.create({
    firstName: 'Jamie',
    lastName: 'Eunice',
    email: 'jamieecarrasquillo@gmail.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })
  await User.create({
    firstName: 'Mollie',
    lastName: 'Davidson-Blue',
    email: 'med1198@gmail.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })
  await User.create({
    firstName: 'Andrea',
    lastName: 'Crabtree',
    email: 'andreancrabtree@gmail.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })
  await User.create({
    firstName: 'Selina',
    lastName: 'Byeon',
    email: 'seonaebyeon1@gmail.com',
    password: 'ilovedogs123!',
    isAdmin: true
  })

  for (let i = 0; i < 25; i++) {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.internet.email()
    let password = faker.internet.password()

    await User.create({
      firstName,
      lastName,
      email,
      password
    })
  }

  console.log(`seeded 31 users`)
  console.log(`seeded successfully`)
}

//create order
async function seedOrder() {
  for (let i = 1; i < 31; i++) {
    await Order.create({
      status: 'in_cart',
      userId: i
    })
  }
}

async function seedAddresses() {
  for (let i = 0; i < 25; i++) {
    let streetAddress = faker.address.streetAddress()
    let city = faker.address.city()
    let state = faker.address.state()
    let zip = faker.address.zipCode()

    await Address.create({
      streetAddress,
      city,
      state,
      zip
    })
  }

  console.log(`seeded 25 addresses`)
  console.log(`seeded successfully`)
}

async function joinUserAddress(userId, addressId) {
  // find the user & address
  const user = await User.findOne({where: {id: userId}})
  const address = await Address.findOne({where: {id: addressId}})
  // add address and user to the join table with the custom method:
  await address.addUser(user)
}

async function associatesUserAddress() {
  for (let i = 0; i < 10; i++) {
    await joinUserAddress(i, 4)
  }
  console.log(`associated 10 user-addresses`)
  console.log(`associated successfully`)
}

// order product through table
// orderId and productId
async function joinOrderProduct(orderId, productId) {
  const order = await Order.findByPk(orderId)
  const product = await Product.findByPk(productId)

  await order.addProduct(product)
}

async function associatesOrderProduct() {
  for (let i = 1; i < 16; i++) {
    let numProducts = Math.floor(Math.random() * Math.floor(15))
    for (let j = 1; j < numProducts; j++) {
      let productId = Math.floor(Math.random() * Math.floor(100))
      await joinOrderProduct(i, productId)
    }
  }
}

async function seedProducts() {
  for (let i = 0; i < 100; i++) {
    let name = faker.commerce.productName()
    let description = faker.commerce.productDescription()
    let image =
      'https://i.etsystatic.com/13346155/r/il/1a3547/1602266077/il_1588xN.1602266077_nrem.jpg'
    let price = faker.commerce.price(1, 100, 2)
    let inventory = faker.random.number()

    await Product.create({
      name,
      description,
      image,
      price,
      inventory
    })
  }

  console.log(`seeded 100 products`)
  console.log(`seeded successfully`)
}

// We've separated the `` function from the `run` function.
// This way we can isolate the error handling and exit trapping.
// The `` function is concerned only with modifying the database.
async function runSeed() {
  console.log('ing...')
  try {
    await db.sync({force: true})
    console.log('db synced!')
    await seedUsers()
    await seedOrder()
    await seedAddresses()
    await seedProducts()
    await associatesUserAddress()
    await associatesOrderProduct()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `` function, IF we ran this module directly (`node `).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of ``.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = {seedAddresses, seedUsers, seedProducts, joinUserAddress}
