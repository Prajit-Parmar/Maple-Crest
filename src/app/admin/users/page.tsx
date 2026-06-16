'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import Modal from '@/components/ui/Modal'
import { adminFetch } from '@/lib/api'

interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  createdAt: string
}

const requiredFields = ['username', 'email', 'password'] as const

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'admin' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { loadUsers() }, [])

  const loadUsers = async () => {
    try { setUsers(await adminFetch<AdminUser[]>('/auth/users')) }
    catch { setUsers([]) }
    finally { setLoading(false) }
  }

  const openCreate = () => {
    setForm({ username: '', email: '', password: '', role: 'admin' })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    for (const field of requiredFields) {
      if (!form[field].trim()) errs[field] = 'Required'
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (form.password && form.password.length < 6) errs.password = 'At least 6 characters'
    return errs
  }

  const handleSave = async () => {
    const errs = validate()
    setFormErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSaving(true)
    try {
      await adminFetch('/auth/register', { method: 'POST', body: JSON.stringify(form) })
      setModalOpen(false)
      loadUsers()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to create user')
    }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    try {
      await adminFetch(`/auth/users/${id}`, { method: 'DELETE' })
      setDeleteId(null)
      loadUsers()
    } catch { alert('Failed to delete user') }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString()

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-dark border ${formErrors[field] ? 'border-red-500' : 'border-gold/20'} rounded-lg text-white text-sm focus:outline-none focus:border-gold transition-colors`

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Users</h1>
          <button onClick={openCreate} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm">+ Add User</button>
        </div>

        {loading ? <p className="text-gray-400">Loading...</p> : users.length === 0 ? <p className="text-gray-500">No users yet.</p> : (
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Username</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Email</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Role</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Created</th>
                    <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white text-sm">{u.username}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{u.email}</td>
                      <td className="py-4 px-4"><span className="text-xs px-2 py-1 rounded text-gold bg-gold/10">{u.role}</span></td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{formatDate(u.createdAt)}</td>
                      <td className="py-4 px-4">
                        <button onClick={() => setDeleteId(u.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Admin User" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Username <span className="text-red-400">*</span></label><input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className={inputClass('username')} />{formErrors.username && <p className="text-red-400 text-xs mt-1">{formErrors.username}</p>}</div>
            <div><label className="block text-xs text-gray-400 mb-1">Role</label><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 bg-dark border border-gold/20 rounded-lg text-white text-sm focus:outline-none focus:border-gold"><option value="admin">Admin</option><option value="manager">Manager</option></select></div>
          </div>
          <div><label className="block text-xs text-gray-400 mb-1">Email <span className="text-red-400">*</span></label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />{formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}</div>
          <div><label className="block text-xs text-gray-400 mb-1">Password <span className="text-red-400">*</span></label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass('password')} />{formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}</div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-all text-sm disabled:opacity-50 cursor-pointer">{saving ? 'Creating...' : 'Create User'}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete" size="sm">
        <p className="text-gray-300 text-sm mb-6">Are you sure you want to delete this user? They will no longer be able to log in.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
          <button onClick={() => deleteId && handleDelete(deleteId)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer">Delete</button>
        </div>
      </Modal>
    </AdminLayout>
  )
}
