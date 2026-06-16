'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { adminFetch } from '@/lib/api'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  type: string
  project?: string
  budget?: string
  notes?: string
  createdAt: string
}

const typeColors: Record<string, string> = {
  purchase: 'text-gold bg-gold/10',
  viewing: 'text-blue-400 bg-blue-500/10',
  rental: 'text-purple-400 bg-purple-500/10',
  contact: 'text-gray-400 bg-gray-500/10',
}

const requiredFields = ['name', 'email', 'phone', 'type'] as const

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [editLead, setEditLead] = useState<Lead | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadLeads() }, [])

  const loadLeads = async () => {
    try { setLeads(await adminFetch<Lead[]>('/leads')) }
    catch { setLeads([]) }
    finally { setLoading(false) }
  }

  const validate = () => {
    if (!editLead) return {}
    const errs: Record<string, string> = {}
    for (const field of requiredFields) {
      const val = editLead[field as keyof Lead]
      if (typeof val === 'string' && !val.trim()) errs[field] = 'Required'
    }
    if (editLead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editLead.email)) errs.email = 'Invalid email'
    return errs
  }

  const handleEdit = async () => {
    if (!editLead) return
    const errs = validate()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    try {
      await adminFetch(`/leads/${editLead.id}`, { method: 'PUT', body: JSON.stringify(editLead) })
      setEditLead(null)
      setFormErrors({})
      loadLeads()
    } catch { alert('Failed to update lead') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/leads/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      loadLeads()
    } catch { alert('Failed to delete lead') }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString()

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-dark border ${formErrors[field] ? 'border-red-500' : 'border-gold/20'} rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors`

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Leads Management</h1>

        {loading ? <p className="text-gray-400">Loading...</p> : leads.length === 0 ? <p className="text-gray-500">No leads yet.</p> : (
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Name</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Phone</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Type</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Date</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white text-sm">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{lead.email}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{lead.phone}</td>
                      <td className="py-4 px-4"><span className={`text-xs px-2 py-1 rounded ${typeColors[lead.type] || 'text-gray-400 bg-gray-500/10'}`}>{lead.type}</span></td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{formatDate(lead.createdAt)}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditLead(lead); setFormErrors({}) }} className="text-xs text-gold hover:text-gold-light transition-colors cursor-pointer">Edit</button>
                          <button onClick={() => setDeleteId(lead.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">Delete</button>
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

      <Modal isOpen={!!editLead} onClose={() => { setEditLead(null); setFormErrors({}) }} title="Edit Lead" size="md">
        {editLead && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-400 mb-1">Name <span className="text-red-400">*</span></label><input value={editLead.name} onChange={(e) => setEditLead({ ...editLead, name: e.target.value })} className={inputClass('name')} />{formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}</div>
              <div><label className="block text-xs text-gray-400 mb-1">Email <span className="text-red-400">*</span></label><input value={editLead.email} onChange={(e) => setEditLead({ ...editLead, email: e.target.value })} className={inputClass('email')} />{formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-400 mb-1">Phone <span className="text-red-400">*</span></label><input value={editLead.phone} onChange={(e) => setEditLead({ ...editLead, phone: e.target.value })} className={inputClass('phone')} />{formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}</div>
              <div><label className="block text-xs text-gray-400 mb-1">Type <span className="text-red-400">*</span></label><select value={editLead.type} onChange={(e) => setEditLead({ ...editLead, type: e.target.value })} className={inputClass('type')}><option>purchase</option><option>rental</option><option>viewing</option><option>contact</option></select>{formErrors.type && <p className="text-red-400 text-xs mt-1">{formErrors.type}</p>}</div>
            </div>
            <div><label className="block text-xs text-gray-400 mb-1">Project</label><input value={editLead.project || ''} onChange={(e) => setEditLead({ ...editLead, project: e.target.value })} className="w-full px-3 py-2 bg-dark border border-gold/20 rounded-lg text-white text-sm focus:outline-none focus:border-gold" /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Notes</label><textarea value={editLead.notes || ''} onChange={(e) => setEditLead({ ...editLead, notes: e.target.value })} rows={3} className="w-full px-3 py-2 bg-dark border border-gold/20 rounded-lg text-white text-sm focus:outline-none focus:border-gold" /></div>
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => { setEditLead(null); setFormErrors({}) }} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleEdit} disabled={saving} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-300 text-sm mb-6">Are you sure you want to delete this lead? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer">Delete</button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
