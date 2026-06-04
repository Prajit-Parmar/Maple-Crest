import { rentals } from '@/lib/data'

export async function GET() {
  return Response.json(rentals)
}
