import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const rentals = await prisma.rentalProperty.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(rentals)
  } catch {
    res.status(500).json({ error: 'Failed to fetch rentals' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const rental = await prisma.rentalProperty.findUnique({ where: { id: req.params.id } })
    if (!rental) return res.status(404).json({ error: 'Rental not found' })
    res.json(rental)
  } catch {
    res.status(500).json({ error: 'Failed to fetch rental' })
  }
})

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const rental = await prisma.rentalProperty.create({ data: req.body })
    res.status(201).json(rental)
  } catch {
    res.status(500).json({ error: 'Failed to create rental' })
  }
})

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const rental = await prisma.rentalProperty.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(rental)
  } catch {
    res.status(500).json({ error: 'Failed to update rental' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.rentalProperty.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete rental' })
  }
})

export default router
