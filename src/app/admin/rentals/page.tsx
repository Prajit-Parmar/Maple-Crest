'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { adminFetch } from '@/lib/api'

interface Rental {
  id: string
  title: string
  description: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  city: string
  province: string
  address: string
  parking: number
  availabilityDate: string
  projectName: string
}

const emptyRental = {
  title: '', description: '', price: 0, bedrooms: 0, bathrooms: 0,
  sqft: 0, city: '', province: '', address: '', parking: 0,
  availabilityDate: '', projectName: '', images: [],
}

const requiredFields = ['title', 'city', 'province'] as const

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Rental | null>(null)
  const [form, setForm] = useState(emptyRental)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { loadRentals() }, [])

  const loadRentals = async () => {
    try { setRentals(await adminFetch<Rental[]>('/rentals')) }
    catch { setRentals([]) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setEditing(null)
    setForm(emptyRental)
    setFormErrors({})
    setModalOpen(true)
  }

  const openEdit = (r: Rental) => {
    setEditing(r)
    setForm({ ...r })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const field of requiredFields) {
      const val = form[field]
      if (typeof val === 'string' && !val.trim()) errs[field] = 'Required'
    }
    if (!form.title || !form.title.trim()) errs.title = 'Required'
    if (!form.price || form.price <= 0) errs.price = 'Must be > 0'
    if (!form.bedrooms || form.bedrooms <= 0) errs.bedrooms = 'Must be > 0'
    if (!form.bathrooms || form.bathrooms <= 0) errs.bathrooms = 'Must be > 0'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    try {
      if (editing) {
        await adminFetch(`/rentals/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) })
      } else {
        await adminFetch('/rentals', { method: 'POST', body: JSON.stringify(form) })
      }
      setModalOpen(false)
      loadRentals()
    } catch { alert('Failed to save rental') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/rentals/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      loadRentals()
    } catch { alert('Failed to delete rental') }
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-dark border ${formErrors[field] ? 'border-red-500' : 'border-gold/20'} rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors`

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Rental Listings</h1>
          <button onClick={openCreate} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm">+ Add Rental</button>
        </div>

        {loading ? <p className="text-gray-400">Loading...</p> : rentals.length === 0 ? <p className="text-gray-500">No rentals yet.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((r) => (
              <GlassCard key={r.id}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold">{r.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEdit(r)} className="text-xs text-gold hover:text-gold-light transition-colors cursor-pointer">Edit</button>
                    <button onClick={() => setDeleteId(r.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">Delete</button>
                  </div>
                </div>
                <p className="text-gold text-xl font-bold mb-2">${r.price.toLocaleString()}<span className="text-sm text-gray-400">/mo</span></p>
                <p className="text-gray-400 text-sm mb-1">{r.bedrooms} bed | {r.bathrooms} bath | {r.sqft} sqft</p>
                <p className="text-gray-500 text-sm">{r.city}, {r.province}</p>
              </GlassCard>
            ))}
          </div>
        )}
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Rental' : 'Add Rental'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1">Title <span className="text-red-400">*</span></label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass('title')} />{formErrors.title && <p className="text-red-400 text-xs mt-1">{formErrors.title}</p>}</div>
            <div className="col-span-2"><label className="block text-xs text-gray-400 mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass('description')} /></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Price/month <span className="text-red-400">*</span></label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inputClass('price')} />{formErrors.price && <p className="text-red-400 text-xs mt-1">{formErrors.price}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Bedrooms <span className="text-red-400">*</span></label><input type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className={inputClass('bedrooms')} />{formErrors.bedrooms && <p className="text-red-400 text-xs mt-1">{formErrors.bedrooms}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Bathrooms <span className="text-red-400">*</span></label><input type="number" step="0.5" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} className={inputClass('bathrooms')} />{formErrors.bathrooms && <p className="text-red-400 text-xs mt-1">{formErrors.bathrooms}</p>}</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Sq Ft</label><input type="number" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: Number(e.target.value) })} className={inputClass('sqft')} /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Parking</label><input type="number" value={form.parking} onChange={(e) => setForm({ ...form, parking: Number(e.target.value) })} className={inputClass('parking')} /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Available</label><input value={form.availabilityDate} onChange={(e) => setForm({ ...form, availabilityDate: e.target.value })} className={inputClass('availabilityDate')} placeholder="2025-07-01" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">City <span className="text-red-400">*</span></label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass('city')} />{formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Province <span className="text-red-400">*</span></label><input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputClass('province')} />{formErrors.province && <p className="text-red-400 text-xs mt-1">{formErrors.province}</p>}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Address</label><input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass('address')} /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Project</label><input value={form.projectName} onChange={(e) => setForm({ ...form, projectName: e.target.value })} className={inputClass('projectName')} /></div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm disabled:opacity-50 cursor-pointer">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-300 text-sm mb-6">Are you sure you want to delete this rental listing? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer">Delete</button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
