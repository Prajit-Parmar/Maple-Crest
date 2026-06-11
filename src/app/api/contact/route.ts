import { NextRequest } from 'next/server'
import { sendInquiryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    await sendInquiryEmail({
      type: 'Contact',
      name,
      email,
      phone,
      details: { Subject: subject, Message: message },
    })

    return Response.json({ success: true, message: 'Thank you for your message. We will get back to you within 24 hours.' })
  } catch {
    return Response.json({ success: false, message: 'Failed to send message.' }, { status: 500 })
  }
}
