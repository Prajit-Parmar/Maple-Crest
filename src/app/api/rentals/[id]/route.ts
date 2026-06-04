import { rentals } from '@/lib/data'

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rental = rentals.find((r) => r.id === id)
  if (!rental) return Response.json({ error: 'Rental not found' }, { status: 404 })
  return Response.json(rental)
}
