import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
      include: { floorPlans: true },
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.create({ data: req.body })
    res.status(201).json(project)
  } catch {
    res.status(500).json({ error: 'Failed to create project' })
  }
})

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json(project)
  } catch {
    res.status(500).json({ error: 'Failed to update project' })
  }
})

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router
