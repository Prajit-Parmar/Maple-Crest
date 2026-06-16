'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { adminFetch } from '@/lib/api'

interface Viewing {
  id: string
  name: string
  email: string
  phone: string
  project: string
  preferredDate: string
  preferredTime: string
  notes?: string
  status: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-500/10',
  confirmed: 'text-green-400 bg-green-500/10',
  cancelled: 'text-red-400 bg-red-500/10',
}

const requiredFields = ['name', 'email', 'phone', 'project', 'preferredDate', 'preferredTime'] as const

export default function AdminViewingsPage() {
  const [viewings, setViewings] = useState<Viewing[]>([])
  const [loading, setLoading] = useState(true)
  const [editViewing, setEditViewing] = useState<Viewing | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => { loadViewings() }, [])

  const loadViewings = async () => {
    try { setViewings(await adminFetch<Viewing[]>('/viewings')) }
    catch { setViewings([]) }
    finally { setLoading(false) }
  }

  const validate = () => {
    if (!editViewing) return {}
    const errs: Record<string, string> = {}
    for (const field of requiredFields) {
      const val = editViewing[field as keyof Viewing]
      if (typeof val === 'string' && !val.trim()) errs[field] = 'Required'
    }
    if (editViewing.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editViewing.email)) errs.email = 'Invalid email'
    return errs
  }

  const handleEdit = async () => {
    if (!editViewing) return
    const errs = validate()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    try {
      await adminFetch(`/viewings/${editViewing.id}`, { method: 'PUT', body: JSON.stringify(editViewing) })
      setEditViewing(null)
      setFormErrors({})
      loadViewings()
    } catch { alert('Failed to update viewing') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/viewings/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      loadViewings()
    } catch { alert('Failed to delete viewing') }
  }

  const filtered = statusFilter === 'all' ? viewings : viewings.filter((v) => v.status === statusFilter)
  const formatDate = (d: string) => new Date(d).toLocaleDateString()

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-dark border ${formErrors[field] ? 'border-red-500' : 'border-gold/20'} rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors`

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Viewing Requests</h1>
          <div className="flex gap-2">
            {['all', 'pending', 'confirmed', 'cancelled'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${statusFilter === s ? 'bg-gold text-dark' : 'bg-dark-3 text-gray-400 hover:text-white'}`}>{s}</button>
            ))}
          </div>
        </div>

        {loading ? <p className="text-gray-400">Loading...</p> : filtered.length === 0 ? <p className="text-gray-500">No viewings found.</p> : (
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Project</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Time</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Status</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4"><p className="text-white text-sm">{v.name}</p><p className="text-gray-500 text-xs">{v.email}</p></td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{v.project}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{v.preferredDate}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{v.preferredTime}</td>
                      <td className="py-4 px-4"><span className={`text-xs px-2 py-1 rounded ${statusColors[v.status] || 'text-gray-400 bg-gray-500/10'}`}>{v.status}</span></td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditViewing(v); setFormErrors({}) }} className="text-xs text-gold hover:text-gold-light transition-colors cursor-pointer">Edit</button>
                          <button onClick={() => setDeleteId(v.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </motion.div>

      <Modal isOpen={!!editViewing} onClose={() => { setEditViewing(null); setFormErrors({}) }} title="Edit Viewing" size="md">
        {editViewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-400 mb-1">Name <span className="text-red-400">*</span></label><input value={editViewing.name} onChange={(e) => setEditViewing({ ...editViewing, name: e.target.value })} className={inputClass('name')} />{formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}</div>
              <div><label className="block text-xs text-gray-400 mb-1">Email <span className="text-red-400">*</span></label><input value={editViewing.email} onChange={(e) => setEditViewing({ ...editViewing, email: e.target.value })} className={inputClass('email')} />{formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-400 mb-1">Phone <span className="text-red-400">*</span></label><input value={editViewing.phone} onChange={(e) => setEditViewing({ ...editViewing, phone: e.target.value })} className={inputClass('phone')} />{formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}</div>
              <div><label className="block text-xs text-gray-400 mb-1">Project <span className="text-red-400">*</span></label><input value={editViewing.project} onChange={(e) => setEditViewing({ ...editViewing, project: e.target.value })} className={inputClass('project')} />{formErrors.project && <p className="text-red-400 text-xs mt-1">{formErrors.project}</p>}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-400 mb-1">Date <span className="text-red-400">*</span></label><input value={editViewing.preferredDate} onChange={(e) => setEditViewing({ ...editViewing, preferredDate: e.target.value })} className={inputClass('preferredDate')} />{formErrors.preferredDate && <p className="text-red-400 text-xs mt-1">{formErrors.preferredDate}</p>}</div>
              <div><label className="block text-xs text-gray-400 mb-1">Time <span className="text-red-400">*</span></label><input value={editViewing.preferredTime} onChange={(e) => setEditViewing({ ...editViewing, preferredTime: e.target.value })} className={inputClass('preferredTime')} />{formErrors.preferredTime && <p className="text-red-400 text-xs mt-1">{formErrors.preferredTime}</p>}</div>
            </div>
            <div><label className="block text-xs text-gray-400 mb-1">Status</label>
              <select value={editViewing.status} onChange={(e) => setEditViewing({ ...editViewing, status: e.target.value })} className="w-full px-3 py-2 bg-dark border border-gold/20 rounded-lg text-white text-sm focus:outline-none focus:border-gold">
                <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option>
              </select>
            </div>
            {editViewing.notes && <div><label className="block text-xs text-gray-400 mb-1">Notes</label><p className="text-gray-300 text-sm bg-dark-3 p-3 rounded-lg">{editViewing.notes}</p></div>}
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => { setEditViewing(null); setFormErrors({}) }} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleEdit} disabled={saving} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-300 text-sm mb-6">Are you sure you want to delete this viewing request? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer">Delete</button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
