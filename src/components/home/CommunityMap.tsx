'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import { projects } from '@/lib/data'
const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })

const markers: { lat: number; lng: number; title: string; subtitle: string }[] = projects.map((p) => ({
  lat: p.lat,
  lng: p.lng,
  title: p.title,
  subtitle: `${p.city}, ${p.province}`,
}))

const locations = [
  { city: 'Toronto', province: 'Ontario' },
  { city: 'Mississauga', province: 'Ontario' },
  { city: 'Ottawa', province: 'Ontario' },
  { city: 'London', province: 'Ontario' },
  { city: 'Burlington', province: 'Ontario' },
  { city: 'Calgary', province: 'Alberta' },
  { city: 'Edmonton', province: 'Alberta' },
  { city: 'Vancouver', province: 'British Columbia' },
]

export default function CommunityMap() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Communities Across Canada"
          subtitle="From Ontario to Alberta, we're building premium communities in Canada's fastest-growing cities."
        />
        <GlassCard className="p-8">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <MapView markers={markers} className="h-64 md:h-96" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {locations.map((loc) => (
              <div key={loc.city} className="glass rounded-lg p-4 text-center hover:border-gold/30 transition-all duration-300">
                <p className="text-white font-medium">{loc.city}</p>
                <p className="text-gray-500 text-sm">{loc.province}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
