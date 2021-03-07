const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// Admin has access to edit and remove the user
const isAdmin = (req, res, next) => {
  return req.user.isAdmin
    ? next()
    : res.status(200).send('You do not have admin access')
}
// GET/users/
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//PUT api/user/:id
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)

    let {firstName, lastName, email, password} = req.body
    let updatedUser = await user.update({firstName, lastName, email, password})
    res.json(updatedUser).status(200)
  } catch (err) {
    next(err)
  }
})

//DELETE api/user/:id

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id)
    if (!user) {
      res.sendStatus(404)
    } else {
      await user.destroy()
      res.sendStatus(204)
    }
  } catch (error) {
    next(error)
  }
})
