'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import { rentals } from '@/lib/data'

const navItems = ['Dashboard', 'Leads', 'Viewings', 'Projects', 'Rentals']

export default function AdminRentalsPage() {
  return (
    <div className="min-h-screen bg-dark">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-dark-2 border-r border-gold/10 p-6 hidden lg:block">
          <h2 className="text-xl font-bold gradient-gold font-serif mb-8">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item} href={`/admin/${item.toLowerCase()}`} className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${item === 'Rentals' ? 'bg-gold/10 text-gold border border-gold/20' : 'text-gray-400 hover:text-gold hover:bg-gold/5'}`}>{item}</Link>
            ))}
          </nav>
          <div className="mt-8"><Link href="/" className="text-gray-500 text-sm hover:text-gold transition-colors">← Back to Website</Link></div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-white mb-8">Rental Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentals.map((r) => (
                <GlassCard key={r.id}>
                  <h3 className="text-white font-semibold mb-1">{r.title}</h3>
                  <p className="text-gold text-xl font-bold mb-2">${r.price.toLocaleString()}<span className="text-sm text-gray-400">/mo</span></p>
                  <p className="text-gray-400 text-sm mb-1">{r.bedrooms} bed | {r.bathrooms} bath | {r.sqft} sqft</p>
                  <p className="text-gray-500 text-sm">{r.city}, {r.province}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
