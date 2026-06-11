'use client'

import { useState, use } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiCalendar, HiHome, HiOfficeBuilding, HiAcademicCap, HiShoppingBag, HiTruck } from 'react-icons/hi'
import { projects } from '@/lib/data'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })

const iconMap: Record<string, React.ReactNode> = {
  amenities: <HiOfficeBuilding className="text-gold" size={20} />,
  schools: <HiAcademicCap className="text-gold" size={20} />,
  shopping: <HiShoppingBag className="text-gold" size={20} />,
  transit: <HiTruck className="text-gold" size={20} />,
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projects.find((p) => p.slug === slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(0)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-gold hover:underline">Back to Projects</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="relative pt-24">
        <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <Image src={project.images[selectedImage]} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'Under Construction' ? 'bg-blue-500/20 text-blue-400' :
                  project.status === 'Pre-Construction' ? 'bg-gold/20 text-gold' : 'bg-purple-500/20 text-purple-400'
                }`}>{project.status}</span>
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-2">{project.title}</h1>
                <p className="text-xl text-gray-300">{project.tagline}</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {project.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === i ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <Image src={img} alt="" width={96} height={64} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-serif text-white mb-6">Community Overview</h2>
              <p className="text-gray-400 leading-relaxed mb-8">{project.longDescription}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { icon: <HiHome size={24} />, label: 'Units', value: project.units },
                  { icon: <HiCalendar size={24} />, label: 'Completion', value: project.completionDate },
                  { icon: <HiLocationMarker size={24} />, label: 'Location', value: project.city },
                  { icon: <HiOfficeBuilding size={24} />, label: 'Type', value: project.type },
                ].map((item) => (
                  <GlassCard key={item.label}>
                    <div className="text-gold mb-2">{item.icon}</div>
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                  </GlassCard>
                ))}
              </div>

              <h2 className="text-3xl font-bold font-serif text-white mb-6">Floor Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {project.floorPlans.map((plan, i) => (
                  <button key={plan.id} onClick={() => setSelectedPlan(i)} className={`glass rounded-xl p-6 text-left transition-all duration-300 ${selectedPlan === i ? 'border-gold' : 'hover:border-gold/30'}`}>
                    <p className="text-gold font-semibold mb-1">{plan.name}</p>
                    <p className="text-2xl font-bold text-white mb-2">{plan.sqft} sq.ft</p>
                    <p className="text-gray-400 text-sm">{plan.bedrooms} Bed | {plan.bathrooms} Bath</p>
                  </button>
                ))}
              </div>

              {project.floorPlans[selectedPlan] && (
                <GlassCard className="mb-12">
                  <div className="aspect-video bg-gradient-to-br from-dark-3 to-dark-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl block mb-4">📐</span>
                      <p className="text-gold font-semibold">{project.floorPlans[selectedPlan].name}</p>
                      <p className="text-gray-400 text-sm">{project.floorPlans[selectedPlan].sqft} sq.ft - {project.floorPlans[selectedPlan].bedrooms} Bedrooms</p>
                    </div>
                  </div>
                </GlassCard>
              )}

              <h2 className="text-3xl font-bold font-serif text-white mb-6">3D Building Viewer</h2>
              <GlassCard className="mb-12">
                <div className="aspect-video bg-gradient-to-br from-dark-3 to-dark-4 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-4">🏗️</span>
                    <p className="text-gold font-semibold mb-2">3D Building Viewer</p>
                    <p className="text-gray-400 text-sm">Interactive 3D model loading...</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div>
              <div className="sticky top-24">
                <GlassCard className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                  <ul className="space-y-2">
                    {project.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-3 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" /> {a}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Nearby Schools</h3>
                  <ul className="space-y-2">
                    {project.schools.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-gray-400 text-sm">
                        <HiAcademicCap className="text-gold shrink-0" size={16} /> {s}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Shopping</h3>
                  <ul className="space-y-2">
                    {project.shopping.map((s) => (
                      <li key={s} className="flex items-center gap-3 text-gray-400 text-sm">
                        <HiShoppingBag className="text-gold shrink-0" size={16} /> {s}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Transit Access</h3>
                  <ul className="space-y-2">
                    {project.transit.map((t) => (
                      <li key={t} className="flex items-center gap-3 text-gray-400 text-sm">
                        <HiTruck className="text-gold shrink-0" size={16} /> {t}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full" /> {f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">Location</h3>
                  <p className="text-gray-400 text-sm mb-2">{project.address}</p>
                  <p className="text-gray-400 text-sm mb-4">{project.city}, {project.province}</p>
                  <div className="h-40 rounded-lg overflow-hidden">
                    <MapView
                      markers={[{ lat: project.lat, lng: project.lng, title: project.title, subtitle: project.address }]}
                      zoom={14}
                      height="160px"
                    />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
