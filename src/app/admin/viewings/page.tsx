'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'

const viewings = [
  { id: 1, name: 'Alice Cooper', email: 'alice@email.com', phone: '(416) 555-0201', project: 'Maple Heights Community', date: '2025-06-10', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, name: 'Bob Martin', email: 'bob@email.com', phone: '(416) 555-0202', project: 'Riverstone Residences', date: '2025-06-12', time: '2:00 PM', status: 'Pending' },
  { id: 3, name: 'Carol White', email: 'carol@email.com', phone: '(416) 555-0203', project: 'Lakeview Luxury Condos', date: '2025-06-15', time: '11:00 AM', status: 'Pending' },
  { id: 4, name: 'David Kim', email: 'david@email.com', phone: '(416) 555-0204', project: 'Northern Pines Estates', date: '2025-06-08', time: '1:00 PM', status: 'Cancelled' },
]

const navItems = ['Dashboard', 'Leads', 'Viewings', 'Projects', 'Rentals']

export default function AdminViewingsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-dark-2 border-r border-gold/10 p-6 hidden lg:block">
          <h2 className="text-xl font-bold gradient-gold font-serif mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item} href={`/admin/${item.toLowerCase()}`} className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${item === 'Viewings' ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-gold hover:bg-gold/5'}`}>{item}</Link>
            ))}
          </nav>
          <div className="mt-8"><Link href="/" className="text-gray-500 text-sm hover:text-gold transition-colors">← Back to Website</Link></div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white mb-8">Viewing Requests</h1>
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
                    </tr>
                  </thead>
                  <tbody>
                    {viewings.map((v) => (
                      <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4"><p className="text-white text-sm">{v.name}</p><p className="text-gray-500 text-xs">{v.email}</p></td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{v.project}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{v.date}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">{v.time}</td>
                        <td className="py-4 px-4"><span className={`text-xs px-2 py-1 rounded ${
                          v.status === 'Confirmed' ? 'text-green-400 bg-green-500/10' :
                          v.status === 'Pending' ? 'text-yellow-400 bg-yellow-500/10' : 'text-red-400 bg-red-500/10'
                        }`}>{v.status}</span></td>
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
