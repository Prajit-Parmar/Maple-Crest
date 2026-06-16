import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const viewings = await prisma.viewingRequest.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(viewings)
  } catch {
    res.status(500).json({ error: 'Failed to fetch viewings' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const viewing = await prisma.viewingRequest.create({ data: req.body })
    res.status(201).json({ success: true, viewing })
  } catch {
    res.status(500).json({ error: 'Failed to schedule viewing' })
  }
})

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const viewing = await prisma.viewingRequest.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(viewing)
  } catch {
    res.status(500).json({ error: 'Failed to update viewing' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.viewingRequest.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete viewing' })
  }
})

export default router
