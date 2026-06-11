import { NextRequest } from 'next/server'
import { sendInquiryEmail } from '@/lib/email'

const leads: any[] = []

export async function GET() {
  return Response.json(leads)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lead = { id: Date.now().toString(), ...body, createdAt: new Date().toISOString() }
    leads.push(lead)

    const details: Record<string, string> = {}
    if (body.project) details.Project = body.project
    if (body.propertyType) details['Property Type'] = body.propertyType
    if (body.budget) details.Budget = body.budget
    if (body.moveInDate) details['Move-In Date'] = body.moveInDate
    if (body.notes) details.Notes = body.notes

    await sendInquiryEmail({
      type: body.type === 'purchase' ? 'Purchase Inquiry' : 'Lead',
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      details,
    })

    return Response.json({ success: true, lead })
  } catch {
    return Response.json({ success: false, message: 'Failed to submit lead.' }, { status: 500 })
  }
}
