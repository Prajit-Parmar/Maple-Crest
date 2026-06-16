import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const [totalProjects, totalLeads, totalViewings, totalRentals, totalMessages] = await Promise.all([
      prisma.project.count(),
      prisma.lead.count(),
      prisma.viewingRequest.count(),
      prisma.rentalProperty.count(),
      prisma.contactMessage.count(),
    ])
    res.json({ totalProjects, totalLeads, totalViewings, totalRentals, totalMessages })
  } catch {
    res.status(500).json({ message: 'Failed to fetch stats' })
  }
})

export default router
