'use client'

import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Building() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={group}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 2, 3]} />
        <meshPhysicalMaterial color="#c8a84e" metalness={0.3} roughness={0.7} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[2.5, 1, 2.5]} />
        <meshPhysicalMaterial color="#dcc87e" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[2, 0.8, 2]} />
        <meshPhysicalMaterial color="#c8a84e" metalness={0.5} roughness={0.5} />
      </mesh>
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 1.6]}>
          <boxGeometry args={[0.3, 0.8, 0.1]} />
          <meshPhysicalMaterial color="#ffffff" emissive="#ffeedd" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={1} />
      </mesh>
    </group>
  )
}

function Trees() {
  const positions: [number, number, number][] = [
    [-4, 0, -3], [4, 0, 3], [-3, 0, 4], [3.5, 0, -4], [-3.5, 0, -3.5], [4, 0, -3],
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 1]} />
            <meshPhysicalMaterial color="#4a3728" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.6, 0.8, 6]} />
            <meshPhysicalMaterial color="#2d5a27" />
          </mesh>
        </group>
      ))}
    </>
  )
}

export default function BuildingViewer() {
  const [nightMode, setNightMode] = useState(false)

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-dark-3 border border-gold/10">
      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={[nightMode ? '#0a0a1a' : '#87CEEB']} />
          <ambientLight intensity={nightMode ? 0.1 : 0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={nightMode ? 0.2 : 1}
            color={nightMode ? '#4466aa' : '#ffffff'}
          />
          <pointLight position={[0, 5, 0]} intensity={nightMode ? 0.5 : 0} color="#ffd700" />
          <Building />
          <Trees />
          <ContactShadows position={[0, -0.1, 0]} opacity={0.5} scale={10} blur={2} />
          <Environment preset="city" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={4}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
      <button
        onClick={() => setNightMode(!nightMode)}
        className="absolute top-4 right-4 glass px-4 py-2 rounded-lg text-sm text-white hover:border-gold/30 transition-all z-10"
      >
        {nightMode ? '☀️ Day Mode' : '🌙 Night Mode'}
      </button>
      <div className="absolute bottom-4 left-4 glass px-3 py-1 rounded text-xs text-gray-400 z-10">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}
