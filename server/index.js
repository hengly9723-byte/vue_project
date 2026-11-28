import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import db from './db.js'

const app = express()
app.use(express.json({ limit: '5mb' })) // 5mb so avatar images fit
app.use(cookieParser())

const SESSION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, avatar: u.avatar }
}

function startSession(res, userId) {
  const token = crypto.randomBytes(32).toString('hex')
  db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .run(token, userId, Date.now() + SESSION_MS)

  res.cookie('sid', token, {
    httpOnly: true,                                // browser JS can't read it
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    maxAge: SESSION_MS,
  })
}

// Finds the logged-in user from the cookie
function requireAuth(req, res, next) {
  const token = req.cookies.sid
  if (!token) return res.status(401).json({ error: 'Not signed in' })

  const user = db.prepare(`
    SELECT u.* FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `).get(token, Date.now())

  if (!user) return res.status(401).json({ error: 'Session expired' })
  req.user = user
  next()
}

app.post('/api/auth/signup', (req, res) => {
  const name = String(req.body.name || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  if (!name) return res.status(400).json({ error: 'Name is required' })
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Enter a valid email' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })

  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (exists) return res.status(409).json({ error: 'Email is already registered' })

  const hash = bcrypt.hashSync(password, 10)
  const info = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)')
    .run(name, email, hash)

  startSession(res, info.lastInsertRowid)
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(publicUser(user))
})

app.post('/api/auth/signin', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase()
  const password = String(req.body.password || '')

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  // Same message for wrong email and wrong password, so attackers can't tell which
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  startSession(res, user.id)
  res.json(publicUser(user))
})

app.post('/api/auth/signout', (req, res) => {
  const token = req.cookies.sid
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token)
  res.clearCookie('sid')
  res.json({ ok: true })
})

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json(publicUser(req.user))
})

app.put('/api/profile', requireAuth, (req, res) => {
  const name = String(req.body.name ?? req.user.name).trim() || req.user.name
  const avatar = String(req.body.avatar ?? req.user.avatar)
  db.prepare('UPDATE users SET name = ?, avatar = ? WHERE id = ?').run(name, avatar, req.user.id)
  res.json(publicUser({ ...req.user, name, avatar }))
})

setInterval(() => {
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now())
}, 60 * 60 * 1000)

app.listen(3001, () => console.log('API running on http://localhost:3001'))