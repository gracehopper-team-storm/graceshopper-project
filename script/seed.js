'use strict'

const db = require('../server/db')
const {User, Order, Address, Product} = require('../server/db/models')
const faker = require('faker')

async function seedUsers() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 10; i++) {
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

  console.log(`seeded 10 users`)
  console.log(`seeded successfully`)
}

async function seedAddresses() {
  // await db.sync({force: true})
  // console.log('db synced!')

  for (let i = 0; i < 10; i++) {
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

  console.log(`seeded 10 addresses`)
  console.log(`seeded successfully`)
}

// async function joinUserAddress(userId, addressId) {
//   // find the user & address
//   const user = await User.findOne({ where: { id: userId } });
//   const address = await Address.findOne({ where: { id: addressId } });
//   // add address and user to the join table with the custom method:
//   address.addUser(user);
// }

// async function associatesUserAddress(){
//   for(let i = 0; i < 10; i++){
//     await joinUserAddress(i, 4)
//   }
// }

async function seedProducts() {
  // await db.sync({force: true})
  // console.log('db synced!')

  for (let i = 0; i < 25; i++) {
    let name = faker.commerce.productName()
    let description = faker.commerce.productDescription()
    let image = faker.image.nature()
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

  console.log(`seeded 25 products`)
  console.log(`seeded successfully`)
}

// We've separated the `` function from the `run` function.
// This way we can isolate the error handling and exit trapping.
// The `` function is concerned only with modifying the database.
async function runSeed() {
  console.log('ing...')
  try {
    await seedUsers()
    await seedAddresses()
    await seedProducts()
    //await associatesUserAddress()
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
module.exports = {seedAddresses, seedUsers}
