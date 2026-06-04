import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  return Response.json({ success: true, message: 'Thank you for your message. We will get back to you within 24 hours.' })
}
