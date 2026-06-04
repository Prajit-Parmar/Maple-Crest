'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  slug: string
  title: string
  tagline: string
  image: string
  status: string
  units: number
  city: string
  province: string
}

export default function ProjectCard({ slug, title, tagline, image, status, units, city, province }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group relative overflow-hidden rounded-xl bg-dark-3 border border-gold/10 hover:border-gold/30 transition-all duration-500"
      >
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'Completed' ? 'bg-green-500/20 text-green-400' :
              status === 'Under Construction' ? 'bg-blue-500/20 text-blue-400' :
              status === 'Pre-Construction' ? 'bg-gold/20 text-gold' :
              'bg-purple-500/20 text-purple-400'
            }`}>
              {status}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300">{city}, {province}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{tagline}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{units} Units</span>
            <span className="text-gold group-hover:translate-x-1 transition-transform duration-300">
              View Details &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
