'use client'

import { useState, useRef } from 'react'

interface FloorPlanViewerProps {
  name: string
  bedrooms: number
  bathrooms: number
  sqft: number
}

function Door({ x, y, rotation }: { x: number; y: number; rotation: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`}>
      <line x1="0" y1="0" x2="0" y2="12" stroke="#333" strokeWidth="1.5" />
      <path d="M 0,12 Q 12,12 12,0" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="2,1" />
    </g>
  )
}

function Window({ x, y, width, height = 4, vertical = false }: { x: number; y: number; width: number; height?: number; vertical?: boolean }) {
  if (vertical) {
    return <rect x={x} y={y} width={height} height={width} fill="#111" stroke="#666" strokeWidth="1" />
  }
  return <rect x={x} y={y} width={width} height={height} fill="#111" stroke="#666" strokeWidth="1" />
}

function DimensionLine({ x1, y1, x2, y2, label, offset = 12 }: { x1: number; y1: number; x2: number; y2: number; label: string; offset?: number }) {
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2 - 6
  return (
    <g>
      <line x1={x1} y1={y1 - offset} x2={x2} y2={y2 - offset} stroke="#666" strokeWidth="0.8" strokeDasharray="3,2" />
      <line x1={x1} y1={y1 - offset + 3} x2={x1} y2={y1 - offset - 3} stroke="#666" strokeWidth="0.8" />
      <line x1={x2} y1={y2 - offset + 3} x2={x2} y2={y2 - offset - 3} stroke="#666" strokeWidth="0.8" />
      <text x={midX} y={midY - offset} fill="#999" textAnchor="middle" fontSize="8" fontFamily="monospace">{label}</text>
    </g>
  )
}

function BedIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-10" y="-7" width="20" height="14" rx="2" fill="none" stroke="#555" strokeWidth="0.8" />
      <rect x="-8" y="-5" width="16" height="3" rx="1" fill="#333" />
      <rect x="-8" y="2" width="16" height="3" rx="1" fill="#333" />
      <circle cx="-6" cy="-2" r="1.5" fill="#555" />
      <circle cx="6" cy="-2" r="1.5" fill="#555" />
    </g>
  )
}

function SofaIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-8" y="-4" width="16" height="8" rx="2" fill="none" stroke="#555" strokeWidth="0.8" />
      <rect x="-6" y="-2" width="12" height="4" rx="1" fill="#333" />
    </g>
  )
}

function TableIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-6" y="-4" width="12" height="8" rx="1" fill="none" stroke="#555" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1" fill="#555" />
    </g>
  )
}

function ToiletIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-4" y="-5" width="8" height="10" rx="3" fill="none" stroke="#555" strokeWidth="0.8" />
      <rect x="-3" y="2" width="6" height="3" rx="1" fill="#333" />
    </g>
  )
}

function SinkIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-5" y="-3" width="10" height="6" rx="3" fill="none" stroke="#555" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1.5" fill="#333" />
    </g>
  )
}

function StoveIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-6" y="-3" width="12" height="6" rx="1" fill="none" stroke="#555" strokeWidth="0.8" />
      <circle cx="-3" cy="0" r="1.5" fill="#333" />
      <circle cx="3" cy="0" r="1.5" fill="#333" />
    </g>
  )
}

function RoomLabel({ x, y, label, size }: { x: number; y: number; label: string; size?: string }) {
  return (
    <g>
      <text x={x} y={y - 4} fill="#999" textAnchor="middle" fontSize="9" fontFamily="serif" fontWeight="600">{label}</text>
      {size && <text x={x} y={y + 6} fill="#666" textAnchor="middle" fontSize="7" fontFamily="monospace">{size}</text>}
    </g>
  )
}

function TwoBedroomPlan() {
  const w = 500, h = 380
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" style={{ background: '#161616' }}>
      <rect x="10" y="10" width={w-20} height={h-20} fill="#1c1c1c" stroke="#444" strokeWidth="2" rx="3" />

      {/* Outer walls */}
      <rect x="20" y="30" width="460" height="340" fill="none" stroke="#888" strokeWidth="2.5" rx="2" />

      {/* Interior walls */}
      <line x1="180" y1="30" x2="180" y2="220" stroke="#888" strokeWidth="2" />
      <line x1="330" y1="30" x2="330" y2="220" stroke="#888" strokeWidth="2" />
      <line x1="20" y1="220" x2="460" y2="220" stroke="#888" strokeWidth="2" />
      <line x1="180" y1="220" x2="180" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="330" y1="280" x2="460" y2="280" stroke="#888" strokeWidth="2" />

      {/* Doors */}
      <Door x={360} y={30} rotation={0} />
      <Door x={180} y={130} rotation={0} />
      <Door x={180} y={300} rotation={0} />
      <Door x={390} y={280} rotation={90} />
      <Door x={330} y={140} rotation={90} />
      <Door x={120} y={220} rotation={90} />

      {/* Windows */}
      <Window x={80} y={30} width={50} />
      <Window x={230} y={30} width={50} />
      <Window x={380} y={30} width={40} />
      <Window x={460} y={100} width={40} vertical />
      <Window x={460} y={160} width={40} vertical />
      <Window x={20} y={100} width={40} vertical />
      <Window x={20} y={300} width={40} vertical />
      <Window x={80} y={364} width={50} />
      <Window x={230} y={364} width={50} />

      {/* Room Labels */}
      <RoomLabel x={100} y={120} label="Living Room" size="16' × 14'" />
      <SofaIcon x={100} y={150} />
      <TableIcon x={100} y={175} />

      <RoomLabel x={255} y={120} label="Master Bedroom" size="14' × 12'" />
      <BedIcon x={255} y={150} />

      <RoomLabel x={395} y={120} label="Bedroom 2" size="12' × 10'" />
      <BedIcon x={395} y={145} />

      <RoomLabel x={100} y={290} label="Kitchen" size="12' × 10'" />
      <StoveIcon x={90} y={280} />
      <SinkIcon x={120} y={280} />

      <RoomLabel x={255} y={290} label="Dining" size="14' × 10'" />
      <TableIcon x={255} y={290} />

      <RoomLabel x={395} y={320} label="Bath" size="8' × 6'" />

      {/* Dimension lines */}
      <DimensionLine x1={20} y1={30} x2={460} y2={30} label="42'-6&quot;" />
      <DimensionLine x1={20} y1={30} x2={20} y2={370} label="32'-0&quot;" />

      {/* Scale */}
      <g transform="translate(20, 10)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#666" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#666" strokeWidth="1" />
        <text x="30" y="-5" fill="#666" textAnchor="middle" fontSize="7" fontFamily="monospace">10'</text>
      </g>

      {/* Title */}
      <text x={250} y={18} fill="#c8a84e" textAnchor="middle" fontSize="11" fontFamily="serif" fontWeight="600">2 BEDROOM FLOOR PLAN</text>
      <text x={250} y={376} fill="#666" textAnchor="middle" fontSize="8" fontFamily="monospace">Dimensions approximate • Scale 1/8\" = 1'-0&quot;</text>
    </svg>
  )
}

function ThreeBedroomPlan() {
  const w = 500, h = 380
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" style={{ background: '#161616' }}>
      <rect x="10" y="10" width={w-20} height={h-20} fill="#1c1c1c" stroke="#444" strokeWidth="2" rx="3" />
      <rect x="20" y="30" width="460" height="340" fill="none" stroke="#888" strokeWidth="2.5" rx="2" />

      {/* Walls */}
      <line x1="150" y1="30" x2="150" y2="200" stroke="#888" strokeWidth="2" />
      <line x1="310" y1="30" x2="310" y2="200" stroke="#888" strokeWidth="2" />
      <line x1="20" y1="200" x2="460" y2="200" stroke="#888" strokeWidth="2" />
      <line x1="150" y1="200" x2="150" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="310" y1="200" x2="310" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="310" y1="280" x2="460" y2="280" stroke="#888" strokeWidth="2" />

      {/* Doors */}
      <Door x={330} y={30} rotation={0} />
      <Door x={150} y={110} rotation={0} />
      <Door x={150} y={280} rotation={0} />
      <Door x={360} y={280} rotation={90} />
      <Door x={310} y={120} rotation={90} />
      <Door x={80} y={200} rotation={90} />

      {/* Windows */}
      <Window x={60} y={30} width={40} />
      <Window x={200} y={30} width={40} />
      <Window x={370} y={30} width={40} />
      <Window x={20} y={90} width={30} vertical />
      <Window x={20} y={300} width={30} vertical />
      <Window x={460} y={90} width={30} vertical />
      <Window x={460} y={320} width={30} vertical />
      <Window x={60} y={364} width={40} />
      <Window x={200} y={364} width={40} />

      {/* Labels */}
      <RoomLabel x={85} y={110} label="Living Room" size="18' × 14'" />
      <SofaIcon x={85} y={140} />
      <TableIcon x={85} y={165} />

      <RoomLabel x={230} y={110} label="Master Bedroom" size="14' × 12'" />
      <BedIcon x={230} y={140} />

      <RoomLabel x={385} y={110} label="Bedroom 2" size="12' × 10'" />
      <BedIcon x={385} y={140} />

      <RoomLabel x={85} y={280} label="Kitchen" size="14' × 10'" />
      <StoveIcon x={75} y={270} />
      <SinkIcon x={105} y={270} />

      <RoomLabel x={230} y={280} label="Dining" size="12' × 10'" />
      <TableIcon x={230} y={280} />

      <RoomLabel x={385} y={240} label="Bath" size="8' × 6'" />
      <ToiletIcon x={385} y={260} />

      <RoomLabel x={385} y={320} label="Bedroom 3" size="10' × 8'" />
      <BedIcon x={385} y={336} />

      <DimensionLine x1={20} y1={30} x2={460} y2={30} label="48'-0&quot;" />
      <DimensionLine x1={20} y1={30} x2={20} y2={370} label="36'-0&quot;" />

      <g transform="translate(20, 10)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#666" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#666" strokeWidth="1" />
        <text x="30" y="-5" fill="#666" textAnchor="middle" fontSize="7" fontFamily="monospace">10'</text>
      </g>

      <text x={250} y={18} fill="#c8a84e" textAnchor="middle" fontSize="11" fontFamily="serif" fontWeight="600">3 BEDROOM FLOOR PLAN</text>
      <text x={250} y={376} fill="#666" textAnchor="middle" fontSize="8" fontFamily="monospace">Dimensions approximate • Scale 1/8\" = 1'-0&quot;</text>
    </svg>
  )
}

function FourBedroomPlan() {
  const w = 500, h = 380
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" style={{ background: '#161616' }}>
      <rect x="10" y="10" width={w-20} height={h-20} fill="#1c1c1c" stroke="#444" strokeWidth="2" rx="3" />
      <rect x="20" y="30" width="460" height="340" fill="none" stroke="#888" strokeWidth="2.5" rx="2" />

      {/* Upper floor */}
      <line x1="130" y1="30" x2="130" y2="180" stroke="#888" strokeWidth="2" />
      <line x1="290" y1="30" x2="290" y2="180" stroke="#888" strokeWidth="2" />
      <line x1="20" y1="180" x2="460" y2="180" stroke="#888" strokeWidth="2" />
      <line x1="130" y1="180" x2="130" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="290" y1="180" x2="290" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="20" y1="270" x2="130" y2="270" stroke="#888" strokeWidth="2" />
      <line x1="290" y1="270" x2="460" y2="270" stroke="#888" strokeWidth="2" />
      <line x1="400" y1="180" x2="400" y2="270" stroke="#888" strokeWidth="2" />

      {/* Doors */}
      <Door x={310} y={30} rotation={0} />
      <Door x={130} y={100} rotation={0} />
      <Door x={60} y={180} rotation={90} />
      <Door x={130} y={250} rotation={0} />
      <Door x={330} y={270} rotation={90} />
      <Door x={430} y={270} rotation={90} />
      <Door x={290} y={130} rotation={90} />
      <Door x={290} y={330} rotation={0} />

      {/* Windows */}
      <Window x={50} y={30} width={35} />
      <Window x={180} y={30} width={35} />
      <Window x={340} y={30} width={35} />
      <Window x={20} y={80} width={25} vertical />
      <Window x={20} y={320} width={25} vertical />
      <Window x={460} y={80} width={25} vertical />
      <Window x={460} y={320} width={25} vertical />
      <Window x={50} y={364} width={35} />
      <Window x={180} y={364} width={35} />
      <Window x={340} y={364} width={35} />

      {/* Labels */}
      <RoomLabel x={75} y={100} label="Living Room" size="20' × 16'" />
      <SofaIcon x={75} y={130} />
      <TableIcon x={75} y={155} />

      <RoomLabel x={210} y={100} label="Master Bedroom" size="16' × 14'" />
      <BedIcon x={210} y={130} />

      <RoomLabel x={375} y={100} label="Bedroom 2" size="14' × 12'" />
      <BedIcon x={375} y={130} />

      <RoomLabel x={75} y={220} label="Bedroom 3" size="12' × 10'" />
      <BedIcon x={75} y={250} />

      <RoomLabel x={75} y={320} label="Kitchen" size="14' × 10'" />
      <StoveIcon x={65} y={310} />
      <SinkIcon x={95} y={310} />

      <RoomLabel x={210} y={220} label="Family Room" size="16' × 12'" />
      <SofaIcon x={210} y={255} />

      <RoomLabel x={345} y={220} label="Bedroom 4" size="12' × 10'" />
      <BedIcon x={345} y={250} />

      <RoomLabel x={375} y={320} label="Bath" size="8' × 6'" />
      <RoomLabel x={375} y={350} label="Bath 2" size="8' × 6'" />

      <DimensionLine x1={20} y1={30} x2={460} y2={30} label="52'-0&quot;" />
      <DimensionLine x1={20} y1={30} x2={20} y2={370} label="40'-0&quot;" />

      <g transform="translate(20, 10)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#666" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#666" strokeWidth="1" />
        <text x="30" y="-5" fill="#666" textAnchor="middle" fontSize="7" fontFamily="monospace">10'</text>
      </g>

      <text x={250} y={18} fill="#c8a84e" textAnchor="middle" fontSize="11" fontFamily="serif" fontWeight="600">4 BEDROOM FLOOR PLAN</text>
      <text x={250} y={376} fill="#666" textAnchor="middle" fontSize="8" fontFamily="monospace">Dimensions approximate • Scale 1/8\" = 1'-0&quot;</text>
    </svg>
  )
}

function OneBedroomPlan() {
  const w = 500, h = 380
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" style={{ background: '#161616' }}>
      <rect x="10" y="10" width={w-20} height={h-20} fill="#1c1c1c" stroke="#444" strokeWidth="2" rx="3" />
      <rect x="20" y="30" width="460" height="340" fill="none" stroke="#888" strokeWidth="2.5" rx="2" />

      <line x1="20" y1="210" x2="300" y2="210" stroke="#888" strokeWidth="2" />
      <line x1="300" y1="30" x2="300" y2="210" stroke="#888" strokeWidth="2" />
      <line x1="300" y1="210" x2="300" y2="370" stroke="#888" strokeWidth="2" />
      <line x1="140" y1="210" x2="140" y2="370" stroke="#888" strokeWidth="2" />

      <Door x={320} y={30} rotation={0} />
      <Door x={300} y={120} rotation={90} />
      <Door x={180} y={210} rotation={90} />
      <Door x={140} y={300} rotation={0} />

      <Window x={60} y={30} width={50} />
      <Window x={370} y={30} width={50} />
      <Window x={20} y={90} width={30} vertical />
      <Window x={20} y={290} width={30} vertical />
      <Window x={460} y={90} width={30} vertical />
      <Window x={60} y={364} width={50} />
      <Window x={370} y={364} width={50} />

      <RoomLabel x={160} y={120} label="Living / Dining" size="18' × 14'" />
      <SofaIcon x={140} y={145} />
      <TableIcon x={180} y={145} />

      <RoomLabel x={380} y={120} label="Bedroom" size="14' × 12'" />
      <BedIcon x={380} y={145} />

      <RoomLabel x={80} y={290} label="Kitchen" size="12' × 10'" />
      <StoveIcon x={70} y={280} />
      <SinkIcon x={100} y={280} />

      <RoomLabel x={220} y={290} label="Bath" size="8' × 6'" />
      <ToiletIcon x={220} y={310} />

      <DimensionLine x1={20} y1={30} x2={460} y2={30} label="36'-0&quot;" />
      <DimensionLine x1={20} y1={30} x2={20} y2={370} label="28'-0&quot;" />

      <g transform="translate(20, 10)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#666" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#666" strokeWidth="1" />
        <text x="30" y="-5" fill="#666" textAnchor="middle" fontSize="7" fontFamily="monospace">10'</text>
      </g>

      <text x={250} y={18} fill="#c8a84e" textAnchor="middle" fontSize="11" fontFamily="serif" fontWeight="600">1 BEDROOM + DEN FLOOR PLAN</text>
      <text x={250} y={376} fill="#666" textAnchor="middle" fontSize="8" fontFamily="monospace">Dimensions approximate • Scale 1/8\" = 1'-0&quot;</text>
    </svg>
  )
}

export default function FloorPlanViewer({ name, bedrooms, bathrooms, sqft }: FloorPlanViewerProps) {
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3))
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5))
  const reset = () => setScale(1)

  const PlanComponent = bedrooms === 1 ? OneBedroomPlan : bedrooms === 2 ? TwoBedroomPlan : bedrooms === 3 ? ThreeBedroomPlan : FourBedroomPlan

  return (
    <div className="glass rounded-xl p-6 hover:border-gold/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-gray-400 text-sm">{bedrooms} Bed | {bathrooms} Bath | {sqft.toLocaleString()} sq.ft</p>
        </div>
        <div className="flex gap-2">
          <button onClick={zoomOut} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30 cursor-pointer">−</button>
          <button onClick={reset} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30 cursor-pointer">↺</button>
          <button onClick={zoomIn} className="px-3 py-1 glass rounded text-sm text-white hover:border-gold/30 cursor-pointer">+</button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="w-full aspect-video bg-dark-2 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        <PlanComponent />
      </div>
    </div>
  )
}
