/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import jsonServer from 'json-server'
import type { User } from '@/entities/User'
import type { Profile } from '@/entities/Profile'
import type { Article } from '@/entities/Article'
import type { ArticleRating } from '@/features/ArticleRating'
import type { ProfileRating } from '@/features/ProfileRating'

const server = jsonServer.create()

const pathToDb = path.resolve(__dirname, 'db.json')

type DbUser = User & { password: string }

interface DbSchema {
  users: DbUser[]
  profile: Profile[]
  articles: Article[]
  notifications: Notification[]
  comments: Comment[]
  'article-rating': (typeof ArticleRating)[]
  'profile-rating': (typeof ProfileRating)[]
}

const router = jsonServer.router<DbSchema>(pathToDb)

const HTTP_PORT = 8000
const HTTPS_PORT = 8443

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Need for a small delay so that the request does not pass instantly, imitating a real api
server.use(async (_req, _res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

const getNewId = (collectionName: keyof DbSchema) => {
  const maxArticleId = Math.max(
    ...router.db.get(collectionName).map('id').value(),
    0,
  )
  return maxArticleId + 1
}

// Login endpoint
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body

    const userFromBd = router.db
      .get('users')
      .find({ username, password })
      .value()

    if (userFromBd) {
      return res.json(userFromBd)
    }

    return res.status(403).json({ message: 'User not found' })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message })
    }

    return res.status(500).json({ message: 'UNKNOWN_SERVER_ERROR' })
  }
})

// Register endpoint
server.post('/register', (req, res) => {
  try {
    const { username, password, roles } = req.body

    const userFromBd = router.db
      .get('users')
      .find({ username })
      .value()

    if (userFromBd) {
      return res.status(403).json({ message: 'USER_ALREADY_EXIST' })
    }

    const newUserId = getNewId('users')
    const newUser = {
      id: newUserId,
      username,
      password,
      roles,
      jsonSettings: {},
      features: {},
    }

    router.db.get('users').push(newUser).write()

    router.db
      .get('profile')
      .push({
        id: newUserId,
        username,
      })
      .write()

    return res.json(newUser)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'UNKNOWN_SERVER_ERROR' })
  }
})

// Create article endpoint
server.post('/articles', (req, res) => {
  try {
    const createdAt = new Date().toString()
    const views = Math.floor(Math.random() * 10000)

    const newArticleId = getNewId('articles')
    const newArticle = {
      id: newArticleId,
      ...req.body,
      createdAt,
      views,
    }

    router.db.get('articles').push(newArticle).write()

    return res.json(newArticle)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: 'UNKNOWN_SERVER_ERROR' })
  }
})

// check if the user is authorized
server.use((req, res, next) => {
  if (req.path === '/articles' && req.method === 'GET') {
    return next()
  }

  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' })
  }

  return next()
})

server.use(router)

const httpServer = http.createServer(server)

httpServer.listen(HTTP_PORT, () =>
  console.log(`http server listening on ${HTTP_PORT} port`),
)

// run https server if ssl certificates are available
try {
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/mybrandview.co.uk/privkey.pem',
    'utf8',
  )
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/mybrandview.co.uk/cert.pem',
    'utf8',
  )
  const ca = fs.readFileSync(
    '/etc/letsencrypt/live/mybrandview.co.uk/chain.pem',
    'utf8',
  )

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca,
  }

  const httpsServer = https.createServer(credentials, server)

  httpsServer.listen(HTTPS_PORT, () =>
    console.log(`https server listening on ${HTTPS_PORT} port`),
  )
} catch (error) {
  console.log(
    'No SSL certificates found, HTTPS server is not running',
  )
}
