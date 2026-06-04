'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import { projects } from '@/lib/data'

const navItems = ['Dashboard', 'Leads', 'Viewings', 'Projects', 'Rentals']

export default function AdminProjectsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-dark-2 border-r border-gold/10 p-6 hidden lg:block">
          <h2 className="text-xl font-bold gradient-gold font-serif mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item} href={`/admin/${item.toLowerCase()}`} className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${item === 'Projects' ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-gold hover:bg-gold/5'}`}>{item}</Link>
            ))}
          </nav>
          <div className="mt-8"><Link href="/" className="text-gray-500 text-sm hover:text-gold transition-colors">← Back to Website</Link></div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <GlassCard key={p.id}>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-3 ${
                    p.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    p.status === 'Under Construction' ? 'bg-blue-500/20 text-blue-400' :
                    p.status === 'Pre-Construction' ? 'bg-gold/20 text-gold' : 'bg-purple-500/20 text-purple-400'
                  }`}>{p.status}</span>
                  <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{p.city}, {p.province}</p>
                  <p className="text-gray-400 text-sm">{p.units} units</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
