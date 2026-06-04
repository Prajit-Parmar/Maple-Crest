'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Building3D from '@/components/three/Building3D';

export default function BuildingViewer3D() {
  return (
    <div className="glass rounded-2xl p-4 md:p-6">
      <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-dark-3">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [5, 3, 5], fov: 45 }}
            shadows
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.3} />
            <pointLight position={[0, 5, 0]} intensity={0.3} />
            <Building3D />
            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.4}
              scale={10}
              blur={2.5}
            />
            <Environment preset="city" />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={15}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
        </Suspense>
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">
        Drag to rotate | Scroll to zoom | Right-click to pan
      </p>
    </div>
  );
}
