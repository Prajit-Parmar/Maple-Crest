'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/admin/AdminLayout'
import GlassCard from '@/components/ui/GlassCard'
import { adminFetch } from '@/lib/api'

interface Stats {
  totalProjects: number
  totalLeads: number
  totalViewings: number
  totalRentals: number
  totalMessages: number
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminFetch<Stats>('/stats')
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats
    ? [
        { label: 'Total Leads', value: stats.totalLeads.toString(), color: 'text-blue-400' },
        { label: 'Viewing Requests', value: stats.totalViewings.toString(), color: 'text-yellow-400' },
        { label: 'Active Projects', value: stats.totalProjects.toString(), color: 'text-green-400' },
        { label: 'Rental Listings', value: stats.totalRentals.toString(), color: 'text-purple-400' },
      ]
    : [
        { label: 'Total Leads', value: '—', color: 'text-gray-400' },
        { label: 'Viewing Requests', value: '—', color: 'text-gray-400' },
        { label: 'Active Projects', value: '—', color: 'text-gray-400' },
        { label: 'Rental Listings', value: '—', color: 'text-gray-400' },
      ]

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {loading ? (
          <p className="text-gray-400">Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat) => (
              <GlassCard key={stat.label}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Monthly Leads</h3>
            <div className="flex items-end gap-2 h-40">
              {months.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-500">&nbsp;</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '40%' }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-full bg-gold/60 rounded-t"
                    style={{ height: `${30 + Math.sin(i) * 20 + 10}%` }}
                  />
                  <span className="text-[10px] text-gray-500">{m}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/admin/projects" className="block px-4 py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all text-sm font-medium">Manage Projects</a>
              <a href="/admin/rentals" className="block px-4 py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all text-sm font-medium">Manage Rentals</a>
              <a href="/admin/leads" className="block px-4 py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all text-sm font-medium">View Leads</a>
              <a href="/admin/viewings" className="block px-4 py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold/20 transition-all text-sm font-medium">View Viewings</a>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
