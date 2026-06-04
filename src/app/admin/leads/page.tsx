'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'

const leads = [
  { id: 1, name: 'John Smith', email: 'john@email.com', phone: '(416) 555-0101', type: 'Purchase', project: 'Maple Heights', date: '2025-06-03', status: 'New' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(416) 555-0102', type: 'Viewing', project: 'Riverstone', date: '2025-06-02', status: 'Contacted' },
  { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '(416) 555-0103', type: 'Purchase', project: 'Lakeview', date: '2025-06-01', status: 'New' },
  { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '(416) 555-0104', type: 'Contact', project: 'N/A', date: '2025-05-30', status: 'Closed' },
  { id: 5, name: 'Robert Wilson', email: 'robert@email.com', phone: '(416) 555-0105', type: 'Rental', project: 'Northern Pines', date: '2025-05-29', status: 'New' },
  { id: 6, name: 'Jennifer Lee', email: 'jennifer@email.com', phone: '(416) 555-0106', type: 'Purchase', project: 'Aurora Hills', date: '2025-05-28', status: 'Contacted' },
]

const navItems = ['Dashboard', 'Leads', 'Viewings', 'Projects', 'Rentals']

export default function AdminLeadsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-dark-2 border-r border-gold/10 p-6 hidden lg:block">
          <h2 className="text-xl font-bold gradient-gold font-serif mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/admin/${item.toLowerCase()}`}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  item === 'Leads' ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-gold hover:bg-gold/5'
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="mt-8">
            <Link href="/" className="text-gray-500 text-sm hover:text-gold transition-colors">← Back to Website</Link>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white mb-8">Leads Management</h1>
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
                      <th className="text-left py-4 px-4 text-gray-400 text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-white text-sm">{lead.name}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{lead.email}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{lead.phone}</td>
                        <td className="py-4 px-4"><span className="text-gold text-xs bg-gold/10 px-2 py-1 rounded">{lead.type}</span></td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{lead.date}</td>
                        <td className="py-4 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            lead.status === 'New' ? 'text-blue-400 bg-blue-500/10' :
                            lead.status === 'Contacted' ? 'text-yellow-400 bg-yellow-500/10' : 'text-gray-400 bg-gray-500/10'
                          }`}>{lead.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
