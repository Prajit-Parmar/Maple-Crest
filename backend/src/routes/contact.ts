import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || '', subject, message },
    })
    res.json({ success: true, message: 'Thank you for your message. We will get back to you within 24 hours.' })
  } catch {
    res.status(500).json({ error: 'Failed to send message' })
  }
})

router.get('/', async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(messages)
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

export default router
