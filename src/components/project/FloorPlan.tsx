'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloorPlanProps {
  floorPlans: {
    id: string;
    name: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    price: number;
    image: string;
  }[];
}

export default function FloorPlan({ floorPlans }: FloorPlanProps) {
  const [activePlan, setActivePlan] = useState(0);
  const [zoom, setZoom] = useState(1);

  const plan = floorPlans[activePlan];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {floorPlans.map((plan, index) => (
          <button
            key={plan.id}
            onClick={() => { setActivePlan(index); setZoom(1); }}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activePlan === index
                ? 'bg-gold text-dark shadow-lg shadow-gold/20'
                : 'glass text-gray-300 hover:text-gold'
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePlan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-2xl p-4 md:p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Bedrooms', value: plan.bedrooms },
              { label: 'Bathrooms', value: plan.bathrooms },
              { label: 'Square Feet', value: plan.sqft.toLocaleString() },
              { label: 'Starting From', value: `$${(plan.price / 1000).toFixed(0)}K` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-dark-3">
                <p className="text-2xl font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-xl bg-dark-3 flex items-center justify-center">
            <div className="w-full overflow-auto">
              <img
                src={plan.image}
                alt={plan.name}
                style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
                className="w-full h-auto max-h-[500px] object-contain cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.25))}
              className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-gold transition-all cursor-pointer"
            >
              Zoom Out
            </button>
            <span className="text-sm text-gold">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((prev) => Math.min(3, prev + 0.25))}
              className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-gold transition-all cursor-pointer"
            >
              Zoom In
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-4 py-2 glass rounded-lg text-sm text-gray-300 hover:text-gold transition-all cursor-pointer"
            >
              Reset
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
