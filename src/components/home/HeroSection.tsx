'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.5)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-dark via-dark-2 to-dark-3"
        style={{ transform: `translateY(${offsetY}px)` }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(245,158,11,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(114,35,0,0.1) 0%, transparent 50%)',
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: 'var(--font-source-code)' }}
        >
          Building Canada&apos;s Future,<br />
          <span className="gradient-gold">One Community at a Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Premium Residential, Commercial and Mixed-Use Developments Across Canada
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30"
          >
            Explore Projects
          </Link>
          <Link
            href="/viewing"
            className="px-8 py-4 border-2 border-primary/50 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            Book a Viewing
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
