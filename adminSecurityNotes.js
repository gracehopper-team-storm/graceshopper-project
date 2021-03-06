// *** Preventing Injection Attacks ***

//don't do this! it is vulnerable, anybody can look at req.body or sign in as an admin.
app.post('/users', async (req, res, next) => {
  let newUser = await User.create(req.body)
  res.json(newUser)
})

//instead do this! (destructure the request body to only contain the pertinent info and hide it from malicious intentions)
app.post('/users', async (req, res, next) => {
  let {name, password, address} = req.body
  let newUser = await User.create({name, password, address})

  res.json(newUser)
})

// *** Authorization via Express Gates ***

//Authentication == "who am I?"
//Authorization = "am I allowed to be here?"

//n-ary functions can take 1 or many callbacks.

//before the below GET routes, install a GATE that only allows the requests after confirming admin status.

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('none shall pass')
//gate ^^^

//dependency injection design pattern
app.get('/secrets', async (req, res, next) => {
  let creditCards = await Secrets.findAll()
  res.send(creditCards)
})

app.get('/corporate-data', async (req, res, next) => {
  let marketingData = await MarketingData.findAll()
  res.send(marketingData)
})

//Exercise: how can we extend this pattern to make sure Dan does not have access to Jess' cart?

// *** Hiding Secrets ***

//Instead of this:
app.get('/users', async (req, res, next) => {
  let user = await Users.findByPk(req.params.id) //returns all the user info

  res.json({user})
})

///Try this:
app.get('/users', async (req, res, next) => {
  let user = await Users.findByPk(req.params.id, {
    include: ['name', 'address', 'faveIceCream']
  })

  res.json({user})
})

//be judicious about what is returned from any get request!
