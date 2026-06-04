import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middleware/auth'

const router = Router()

const adminUser = {
  id: '1',
  username: 'admin',
  email: 'admin@maplecrest.ca',
  passwordHash: bcrypt.hashSync('admin123', 10),
  role: 'admin',
}

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (email !== adminUser.email) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, adminUser.passwordHash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(adminUser.id, adminUser.role)
    res.json({ token, user: { id: adminUser.id, username: adminUser.username, email: adminUser.email, role: adminUser.role } })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
