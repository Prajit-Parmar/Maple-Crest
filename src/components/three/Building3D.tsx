'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BuildingTower({ position, height, width, depth, color }: { position: [number, number, number]; height: number; width: number; depth: number; color: string }) {
  const meshRef = useRef<THREE.Group>(null)
  const floors = Math.floor(height / 0.35)
  const floorHeight = height / floors

  return (
    <group ref={meshRef} position={position}>
      {/* Main building body */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color="#2a2a2a"
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Glass panels / windows on front face */}
      {Array.from({ length: floors }).map((_, fi) =>
        Array.from({ length: Math.floor(width / 0.3) }).map((_, wi) => {
          const gap = 0.04
          const w = (width - 0.2) / Math.floor(width / 0.3) - gap
          const h = floorHeight * 0.6
          return (
            <mesh
              key={`win-${fi}-${wi}`}
              position={[
                -width / 2 + 0.1 + wi * (w + gap) + w / 2,
                fi * floorHeight + floorHeight * 0.25 + h / 2,
                depth / 2 + 0.005,
              ]}
            >
              <planeGeometry args={[w, h]} />
              <meshPhysicalMaterial
                color={color}
                transparent
                opacity={0.3 + Math.random() * 0.4}
                roughness={0.1}
                metalness={0.9}
                envMapIntensity={1}
              />
            </mesh>
          )
        })
      )}

      {/* Glass panels on back face */}
      {Array.from({ length: floors }).map((_, fi) =>
        Array.from({ length: Math.floor(width / 0.3) }).map((_, wi) => {
          const gap = 0.04
          const w = (width - 0.2) / Math.floor(width / 0.3) - gap
          const h = floorHeight * 0.6
          return (
            <mesh
              key={`win-b-${fi}-${wi}`}
              position={[
                -width / 2 + 0.1 + wi * (w + gap) + w / 2,
                fi * floorHeight + floorHeight * 0.25 + h / 2,
                -depth / 2 - 0.005,
              ]}
              rotation={[0, Math.PI, 0]}
            >
              <planeGeometry args={[w, h]} />
              <meshPhysicalMaterial
                color={color}
                transparent
                opacity={0.2 + Math.random() * 0.3}
                roughness={0.1}
                metalness={0.9}
                envMapIntensity={0.8}
              />
            </mesh>
          )
        })
      )}

      {/* Floor divider lines */}
      {Array.from({ length: floors + 1 }).map((_, fi) => (
        <mesh key={`floor-${fi}`} position={[0, fi * floorHeight, 0]}>
          <boxGeometry args={[width + 0.02, 0.02, depth + 0.02]} />
          <meshStandardMaterial color="#555" roughness={0.8} />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width + 0.05, 0.04, depth + 0.05]} />
        <meshStandardMaterial color="#444" roughness={0.9} metalness={0.2} />
      </mesh>
    </group>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function Paths() {
  return (
    <group>
      {/* Walkway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2.5]}>
        <planeGeometry args={[1.2, 3]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
    </group>
  )
}

function StreetLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 1]} />
        <meshStandardMaterial color="#555" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#c8a84e" emissive="#c8a84e" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Tree({ position, scale: s }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position}>
      <mesh position={[0, s * 0.3, 0]} castShadow>
        <cylinderGeometry args={[s * 0.06, s * 0.08, s * 0.6, 6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0, s * 0.8, 0]} castShadow>
        <coneGeometry args={[s * 0.35, s * 0.7, 8]} />
        <meshStandardMaterial color="#1a4a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, s * 1.1, 0]} castShadow>
        <coneGeometry args={[s * 0.28, s * 0.5, 8]} />
        <meshStandardMaterial color="#2a5a2a" roughness={0.8} />
      </mesh>
    </group>
  )
}

export default function Building3D() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  const towers = useMemo(() => [
    { position: [-1.2, 0, -0.8] as [number, number, number], height: 2.8, width: 1.4, depth: 1.0, color: '#88ccff' },
    { position: [1.0, 0, -0.5] as [number, number, number], height: 2.2, width: 1.0, depth: 0.8, color: '#aaddff' },
    { position: [-0.8, 0, 1.5] as [number, number, number], height: 1.8, width: 0.8, depth: 0.7, color: '#99ddff' },
    { position: [1.3, 0, 1.2] as [number, number, number], height: 2.0, width: 0.9, depth: 0.7, color: '#88ddff' },
  ], [])

  const trees = useMemo(() => {
    const trs: { position: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 1.5
      trs.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
        scale: 0.4 + Math.random() * 0.3,
      })
    }
    return trs
  }, [])

  const lamps = useMemo(() => {
    const angles = [0.3, 1.8, 3.5, 5.0]
    return angles.map((a) => [Math.cos(a) * 2.8, 0, Math.sin(a) * 2.8] as [number, number, number])
  }, [])

  return (
    <group ref={group}>
      <Ground />
      <Paths />

      {towers.map((t, i) => (
        <BuildingTower key={i} {...t} />
      ))}

      {trees.map((t, i) => (
        <Tree key={`tree-${i}`} {...t} />
      ))}

      {lamps.map((l, i) => (
        <StreetLamp key={`lamp-${i}`} position={l} />
      ))}
    </group>
  )
}
