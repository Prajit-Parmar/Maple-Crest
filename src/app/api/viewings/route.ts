import { NextRequest } from 'next/server'
import { sendInquiryEmail } from '@/lib/email'

const viewings: any[] = []

export async function GET() {
  return Response.json(viewings)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const viewing = { id: Date.now().toString(), ...body, status: 'pending', createdAt: new Date().toISOString() }
    viewings.push(viewing)

    await sendInquiryEmail({
      type: 'Viewing Request',
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      details: {
        Project: body.project,
        'Preferred Date': body.preferredDate,
        'Preferred Time': body.preferredTime,
        Notes: body.notes || '—',
      },
    })

    return Response.json({ success: true, viewing })
  } catch {
    return Response.json({ success: false, message: 'Failed to schedule viewing.' }, { status: 500 })
  }
}
