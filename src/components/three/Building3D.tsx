'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Building3D() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  const buildings = useMemo(() => {
    const blds: { position: [number, number, number]; scale: [number, number, number]; color: string }[] = [];
    const colors = ['#c8a84e', '#dcc87e', '#a8882e', '#b8983e', '#d4b85e'];

    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      const height = 0.5 + Math.random() * 2;
      const width = 0.2 + Math.random() * 0.4;
      const depth = 0.2 + Math.random() * 0.4;
      blds.push({
        position: [x, height / 2, z],
        scale: [width, height, depth],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return blds;
  }, []);

  const trees = useMemo(() => {
    const trs: { position: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      trs.push({
        position: [Math.cos(angle) * radius, 0.3, Math.sin(angle) * radius],
        scale: 0.15 + Math.random() * 0.2,
      });
    }
    return trs;
  }, []);

  return (
    <group ref={group}>
      <group position={[0, 0, 0]}>
        {buildings.map((b, i) => (
          <mesh key={i} position={b.position} castShadow>
            <boxGeometry args={b.scale} />
            <MeshDistortMaterial
              color={b.color}
              roughness={0.3}
              metalness={0.6}
              distort={0.1}
              speed={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>

      {trees.map((t, i) => (
        <group key={`tree-${i}`} position={t.position}>
          <mesh position={[0, t.scale * 1.5, 0]} castShadow>
            <coneGeometry args={[t.scale * 0.8, t.scale * 2, 8]} />
            <meshStandardMaterial color="#2d5a27" roughness={0.8} />
          </mesh>
          <mesh position={[0, t.scale * 0.3, 0]}>
            <cylinderGeometry args={[t.scale * 0.15, t.scale * 0.2, t.scale * 0.6, 6]} />
            <meshStandardMaterial color="#4a3728" roughness={0.9} />
          </mesh>
        </group>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
