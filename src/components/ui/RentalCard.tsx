'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiCalendar } from 'react-icons/hi'

interface RentalCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  bedrooms: number
  bathrooms: number
  parking: number
  availabilityDate: string
}

export default function RentalCard({ id, title, description, image, price, bedrooms, bathrooms, parking, availabilityDate }: RentalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-dark-3 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-500"
    >
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold gradient-gold">${price.toLocaleString()}<span className="text-sm text-gray-400">/mo</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span>{bedrooms} Bed</span>
          <span>{bathrooms} Bath</span>
          <span>{parking} Parking</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <HiCalendar size={16} className="text-gold" />
          <span>Available: {new Date(availabilityDate).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Link
          href={`/rent/${id}`}
          className="block w-full text-center bg-gold/10 border border-gold/30 text-gold py-2 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300 font-medium"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}
