'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', active: true },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/viewings', label: 'Viewings' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/rentals', label: 'Rentals' },
]

const stats = [
  { label: 'Total Leads', value: '156', change: '+12%', icon: '📋' },
  { label: 'Viewing Requests', value: '43', change: '+8%', icon: '📅' },
  { label: 'Active Projects', value: '6', change: '0%', icon: '🏗️' },
  { label: 'Rental Listings', value: '6', change: '+2', icon: '🏠' },
]

const monthlyData = [65, 78, 45, 92, 88, 110, 95, 120, 105, 130, 145, 156]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const recentLeads = [
  { name: 'John Smith', email: 'john@email.com', type: 'Purchase', date: '2025-06-03' },
  { name: 'Sarah Johnson', email: 'sarah@email.com', type: 'Viewing', date: '2025-06-02' },
  { name: 'Michael Brown', email: 'michael@email.com', type: 'Contact', date: '2025-06-01' },
  { name: 'Emily Davis', email: 'emily@email.com', type: 'Purchase', date: '2025-05-30' },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-dark-2 border-r border-gold/10 p-6 hidden lg:block">
          <h2 className="text-xl font-bold gradient-gold font-serif mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  item.active ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-gold hover:bg-gold/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <Link href="/" className="text-gray-500 text-sm hover:text-gold transition-colors">← Back to Website</Link>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <GlassCard key={stat.label}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</span>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <GlassCard>
                <h3 className="text-lg font-semibold text-white mb-6">Monthly Leads</h3>
                <div className="flex items-end gap-2 h-40">
                  {monthlyData.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-500">{val}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(val / 156) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="w-full bg-gold/60 rounded-t"
                        style={{ height: `${(val / 156) * 100}%` }}
                      />
                      <span className="text-[10px] text-gray-500">{months[i]}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentLeads.map((lead, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-white text-sm font-medium">{lead.name}</p>
                        <p className="text-gray-500 text-xs">{lead.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gold text-xs">{lead.type}</span>
                        <p className="text-gray-500 text-xs">{lead.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
