import { Router, Request, Response } from 'express'

const router = Router()
const viewings: any[] = []

router.get('/', (_req: Request, res: Response) => {
  res.json(viewings)
})

router.post('/', (req: Request, res: Response) => {
  const viewing = { id: Date.now().toString(), ...req.body, status: 'pending', createdAt: new Date().toISOString() }
  viewings.push(viewing)
  res.status(201).json({ success: true, viewing })
})

export default router
