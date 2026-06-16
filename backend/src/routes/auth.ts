import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest, generateToken } from '../middleware/auth'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user.id, user.role)
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/users', authenticateToken, async (_req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.adminUser.findMany({
      select: { id: true, username: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(users)
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.post('/register', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password, role } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' })
    }
    const existing = await prisma.adminUser.findFirst({
      where: { OR: [{ email }, { username }] },
    })
    if (existing) {
      return res.status(409).json({ error: 'Email or username already exists' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.adminUser.create({
      data: { username, email, passwordHash, role: role || 'admin' },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    })
    res.status(201).json(user)
  } catch {
    res.status(500).json({ error: 'Failed to create user' })
  }
})

router.delete('/users/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.adminUser.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
