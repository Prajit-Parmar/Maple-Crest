'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface FloorPlanViewerProps {
  name: string
  bedrooms: number
  bathrooms: number
  sqft: number
}

function FloorPlanSVG({ bedrooms }: { bedrooms: number }) {
  const width = 400
  const height = 300
  const colors = { wall: '#c8a84e', interior: '#1a1a1a', door: '#dcc87e', label: '#ffffff' }

  if (bedrooms === 2) {
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <rect x="10" y="10" width={width-20} height={height-20} fill={colors.interior} stroke={colors.wall} strokeWidth="2" rx="4" />
        <rect x="30" y="40" width="120" height="100" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="90" y="95" fill={colors.label} textAnchor="middle" fontSize="12" fontFamily="serif">Living Room</text>
        <rect x="170" y="40" width="100" height="100" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="220" y="95" fill={colors.label} textAnchor="middle" fontSize="12" fontFamily="serif">Bedroom 1</text>
        <rect x="290" y="40" width="80" height="80" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="330" y="85" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Bedroom 2</text>
        <rect x="30" y="170" width="80" height="60" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="70" y="205" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Kitchen</text>
        <rect x="130" y="170" width="60" height="60" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="160" y="205" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Bath</text>
        <rect x="210" y="170" width="100" height="40" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
        <text x="260" y="195" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Dining</text>
        <line x1="30" y1="140" x2="170" y2="140" stroke={colors.door} strokeWidth="1" strokeDasharray="4,4" />
        <line x1="170" y1="90" x2="170" y2="140" stroke={colors.door} strokeWidth="1" strokeDasharray="4,4" />
        <text x="200" y="25" fill={colors.wall} textAnchor="middle" fontSize="14" fontFamily="serif">2 Bedroom Floor Plan</text>
      </svg>
    )
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <rect x="10" y="10" width={width-20} height={height-20} fill={colors.interior} stroke={colors.wall} strokeWidth="2" rx="4" />
      <rect x="20" y="40" width="100" height="90" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="70" y="90" fill={colors.label} textAnchor="middle" fontSize="11" fontFamily="serif">Living</text>
      <rect x="140" y="40" width="80" height="90" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="180" y="90" fill={colors.label} textAnchor="middle" fontSize="11" fontFamily="serif">Bed 1</text>
      <rect x="240" y="40" width="70" height="90" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="275" y="90" fill={colors.label} textAnchor="middle" fontSize="11" fontFamily="serif">Bed 2</text>
      <rect x="320" y="40" width="60" height="60" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="350" y="75" fill={colors.label} textAnchor="middle" fontSize="9" fontFamily="serif">Bed 3</text>
      <rect x="20" y="160" width="80" height="60" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="60" y="195" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Kitchen</text>
      <rect x="120" y="160" width="60" height="60" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="150" y="195" fill={colors.label} textAnchor="middle" fontSize="10" fontFamily="serif">Dining</text>
      <rect x="200" y="160" width="50" height="40" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="225" y="185" fill={colors.label} textAnchor="middle" fontSize="9" fontFamily="serif">Bath</text>
      <rect x="270" y="160" width="60" height="40" fill="#222" stroke={colors.wall} strokeWidth="1.5" rx="2" />
      <text x="300" y="185" fill={colors.label} textAnchor="middle" fontSize="9" fontFamily="serif">Bath 2</text>
      <text x="200" y="25" fill={colors.wall} textAnchor="middle" fontSize="14" fontFamily="serif">{bedrooms} Bedroom Floor Plan</text>
    </svg>
  )
}

export default function FloorPlanViewer({ name, bedrooms, bathrooms, sqft }: FloorPlanViewerProps) {
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3))
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5))
  const reset = () => setScale(1)

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-gray-400 text-sm">{bedrooms} Bed | {bathrooms} Bath | {sqft} sq.ft</p>
        </div>
        <div className="flex gap-2">
          <button onClick={zoomOut} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30">−</button>
          <button onClick={reset} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30">↺</button>
          <button onClick={zoomIn} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30">+</button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="w-full aspect-video bg-dark-2 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <FloorPlanSVG bedrooms={bedrooms} />
      </div>
    </div>
  )
}
