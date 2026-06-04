import { Router, Request, Response } from 'express'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body
  res.json({ success: true, message: 'Thank you for your message. We will get back to you within 24 hours.' })
})

export default router
