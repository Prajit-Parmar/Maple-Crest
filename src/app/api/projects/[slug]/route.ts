import { projects } from '@/lib/data'

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return Response.json({ error: 'Project not found' }, { status: 404 })
  return Response.json(project)
}
