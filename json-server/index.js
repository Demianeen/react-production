const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')

const server = jsonServer.create()

const router = jsonServer.router(
  path.resolve(__dirname, 'db.json')
)

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Need for a small delay so that the request does not pass instantly, imitating a real api
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

// Login endpoint
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body
    const db = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, 'db.json'),
        'UTF-8'
      )
    )
    const { users = [] } = db

    const userFromBd = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    )

    if (userFromBd) {
      return res.json(userFromBd)
    }

    return res
      .status(403)
      .json({ message: 'User not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: e.message })
  }
})

// check if the user is authorized
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' })
  }

  next()
})

server.use(router)

// start server
server.listen(8000, () => {
  console.log('server is running on 8000 port')
})
