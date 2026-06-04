const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.statusText}`)
  return res.json()
}

export async function fetchProjects(): Promise<import('@/types').Project[]> {
  const res = await fetch('/api/projects', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}

export async function fetchProject(slug: string): Promise<import('@/types').Project> {
  const res = await fetch(`/api/projects/${slug}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch project')
  return res.json()
}

export async function fetchRentals(): Promise<import('@/types').RentalProperty[]> {
  const res = await fetch('/api/rentals', { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch rentals')
  return res.json()
}

export async function submitContactForm(data: Record<string, string>) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit form')
  return res.json()
}

export async function submitLead(data: Record<string, string>) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit lead')
  return res.json()
}

export async function submitViewing(data: Record<string, string>) {
  const res = await fetch('/api/viewings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to schedule viewing')
  return res.json()
}
