'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

const features = [
  {
    icon: '🏗️',
    title: 'Premium Craftsmanship',
    description: 'Every Maple Crest property is built with the highest quality materials and exceptional attention to detail, ensuring lasting value and beauty.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Building',
    description: 'We lead the industry in green building practices, energy-efficient design, and sustainable community planning for a better tomorrow.',
  },
  {
    icon: '🏘️',
    title: 'Community Focus',
    description: 'We don\'t just build homes—we create vibrant, connected communities with parks, amenities, and gathering spaces that bring people together.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-dark-2">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose Maple Crest?"
          subtitle="We bring decades of experience, innovation, and a commitment to excellence to every community we build."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.1}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
