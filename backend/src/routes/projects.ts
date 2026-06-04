import { Router, Request, Response } from 'express'

const router = Router()

const projects = [
  { id: '1', slug: 'maple-heights-community', title: 'Maple Heights Community', city: 'Mississauga', province: 'Ontario', units: 245, status: 'Completed', type: 'Residential' },
  { id: '2', slug: 'northern-pines-estates', title: 'Northern Pines Estates', city: 'Calgary', province: 'Alberta', units: 120, status: 'Completed', type: 'Residential' },
  { id: '3', slug: 'riverstone-residences', title: 'Riverstone Residences', city: 'Ottawa', province: 'Ontario', units: 180, status: 'Under Construction', type: 'Condominium' },
  { id: '4', slug: 'cedar-grove-townhomes', title: 'Cedar Grove Townhomes', city: 'London', province: 'Ontario', units: 85, status: 'Completed', type: 'Townhome' },
  { id: '5', slug: 'lakeview-luxury-condominiums', title: 'Lakeview Luxury Condominiums', city: 'Burlington', province: 'Ontario', units: 210, status: 'Pre-Construction', type: 'Condominium' },
  { id: '6', slug: 'aurora-hills-community', title: 'Aurora Hills Community', city: 'Edmonton', province: 'Alberta', units: 320, status: 'Under Construction', type: 'Mixed-Use' },
]

router.get('/', (_req: Request, res: Response) => {
  res.json(projects)
})

router.get('/:slug', (req: Request, res: Response) => {
  const project = projects.find((p) => p.slug === req.params.slug)
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json(project)
})

export default router
