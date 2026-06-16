'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { adminFetch } from '@/lib/api'

interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  city: string
  province: string
  units: number
  status: string
  type: string
  image: string
  address: string
  completionDate: string
}

const emptyProject = {
  slug: '', title: '', tagline: '', description: '',
  city: '', province: '', units: 0, status: 'Pre-Construction',
  type: 'Residential', image: '', address: '', completionDate: '',
}

const statusColors: Record<string, string> = {
  'Completed': 'text-green-400 bg-green-500/10',
  'Under Construction': 'text-blue-400 bg-blue-500/10',
  'Pre-Construction': 'text-gold bg-gold/10',
  'Coming Soon': 'text-purple-400 bg-purple-500/10',
}

const requiredFields = ['title', 'slug', 'city', 'province', 'status', 'type'] as const

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyProject)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { loadProjects() }, [])

  const loadProjects = async () => {
    try { setProjects(await adminFetch<Project[]>('/projects')) }
    catch { setProjects([]) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyProject)
    setFormErrors({})
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({ ...p })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const field of requiredFields) {
      const val = form[field]
      if (typeof val === 'string' && !val.trim()) errs[field] = 'Required'
    }
    if (!form.units || form.units <= 0) errs.units = 'Must be > 0'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    try {
      if (editing) {
        await adminFetch(`/projects/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) })
      } else {
        await adminFetch('/projects', { method: 'POST', body: JSON.stringify(form) })
      }
      setModalOpen(false)
      loadProjects()
    } catch { alert('Failed to save project') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/projects/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      loadProjects()
    } catch { alert('Failed to delete project') }
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-dark border ${formErrors[field] ? 'border-red-500' : 'border-gold/20'} rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors`

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button onClick={openCreate} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm">+ Add Project</button>
        </div>

        {loading ? <p className="text-gray-400">Loading...</p> : projects.length === 0 ? <p className="text-gray-500">No projects yet.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <GlassCard key={p.id}>
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[p.status] || 'text-gray-400 bg-gray-500/10'}`}>{p.status}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-xs text-gold hover:text-gold-light transition-colors cursor-pointer">Edit</button>
                    <button onClick={() => setDeleteId(p.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">Delete</button>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{p.city}, {p.province}</p>
                <p className="text-gray-400 text-sm">{p.units} units &middot; {p.type}</p>
              </GlassCard>
            ))}
          </div>
        )}
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Title <span className="text-red-400">*</span></label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass('title')} />{formErrors.title && <p className="text-red-400 text-xs mt-1">{formErrors.title}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Slug <span className="text-red-400">*</span></label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass('slug')} />{formErrors.slug && <p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}</div>
          </div>
          <div><label className="block text-xs text-gray-400 mb-1">Tagline</label><input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className={inputClass('tagline')} /></div>
          <div><label className="block text-xs text-gray-400 mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass('description')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">City <span className="text-red-400">*</span></label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass('city')} />{formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Province <span className="text-red-400">*</span></label><input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputClass('province')} />{formErrors.province && <p className="text-red-400 text-xs mt-1">{formErrors.province}</p>}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Units <span className="text-red-400">*</span></label><input type="number" value={form.units} onChange={(e) => setForm({ ...form, units: Number(e.target.value) })} className={inputClass('units')} />{formErrors.units && <p className="text-red-400 text-xs mt-1">{formErrors.units}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Status <span className="text-red-400">*</span></label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass('status')}><option>Pre-Construction</option><option>Under Construction</option><option>Completed</option><option>Coming Soon</option></select>{formErrors.status && <p className="text-red-400 text-xs mt-1">{formErrors.status}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Type <span className="text-red-400">*</span></label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass('type')}><option>Residential</option><option>Condominium</option><option>Townhome</option><option>Mixed-Use</option></select>{formErrors.type && <p className="text-red-400 text-xs mt-1">{formErrors.type}</p>}</div>
          </div>
          <div><label className="block text-xs text-gray-400 mb-1">Image URL</label><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass('image')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Address</label><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass('address')} /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Completion</label><input value={form.completionDate} onChange={(e) => setForm({ ...form, completionDate: e.target.value })} className={inputClass('completionDate')} /></div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-300 text-sm mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer">Delete</button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
