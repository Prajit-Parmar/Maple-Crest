const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

function getToken(): string | null {
  if (typeof window !== 'undefined') return localStorage.getItem('admin_token')
  return null
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `API error: ${res.statusText}`)
  return data
}

export async function adminFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { ...headers, ...options?.headers as Record<string, string> },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        window.location.href = '/admin/login'
      }
    }
    throw new Error(data.error || `API error: ${res.statusText}`)
  }
  return data
}

export async function fetchProjects() {
  return apiFetch('/projects')
}

export async function fetchProject(slug: string) {
  return apiFetch(`/projects/${slug}`)
}

export async function fetchRentals() {
  return apiFetch('/rentals')
}

export async function submitContactForm(data: Record<string, string>) {
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitLead(data: Record<string, string>) {
  return apiFetch('/leads', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitViewing(data: Record<string, string>) {
  return apiFetch('/viewings', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
