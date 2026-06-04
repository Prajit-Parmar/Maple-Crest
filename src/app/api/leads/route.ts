import { NextRequest } from 'next/server'

const leads: any[] = []

export async function GET() {
  return Response.json(leads)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const lead = { id: Date.now().toString(), ...body, createdAt: new Date().toISOString() }
  leads.push(lead)
  return Response.json({ success: true, lead })
}
