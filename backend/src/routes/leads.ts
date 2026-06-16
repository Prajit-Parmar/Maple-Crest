import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(leads)
  } catch {
    res.status(500).json({ error: 'Failed to fetch leads' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.create({ data: req.body })
    res.status(201).json({ success: true, lead })
  } catch {
    res.status(500).json({ error: 'Failed to submit lead' })
  }
})

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(lead)
  } catch {
    res.status(500).json({ error: 'Failed to update lead' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete lead' })
  }
})

export default router
