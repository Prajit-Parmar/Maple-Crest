import { NextRequest } from 'next/server'

const viewings: any[] = []

export async function GET() {
  return Response.json(viewings)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const viewing = { id: Date.now().toString(), ...body, status: 'pending', createdAt: new Date().toISOString() }
  viewings.push(viewing)
  return Response.json({ success: true, viewing })
}
