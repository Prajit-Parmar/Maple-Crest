import { Router, Request, Response } from 'express'

const router = Router()
const leads: any[] = []

router.get('/', (_req: Request, res: Response) => {
  res.json(leads)
})

router.post('/', (req: Request, res: Response) => {
  const lead = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() }
  leads.push(lead)
  res.status(201).json({ success: true, lead })
})

export default router
