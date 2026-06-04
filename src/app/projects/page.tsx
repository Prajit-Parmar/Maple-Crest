'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/project/ProjectCard';

const projects = [
  { slug: 'maple-heights-community', title: 'Maple Heights Community', location: 'Mississauga, Ontario', units: 245, status: 'Under Construction', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { slug: 'northern-pines-estates', title: 'Northern Pines Estates', location: 'Calgary, Alberta', units: 180, status: 'Completed', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80' },
  { slug: 'riverstone-residences', title: 'Riverstone Residences', location: 'Ottawa, Ontario', units: 320, status: 'Pre-Construction', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
  { slug: 'cedar-grove-townhomes', title: 'Cedar Grove Townhomes', location: 'London, Ontario', units: 120, status: 'Coming Soon', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { slug: 'lakeview-luxury-condominiums', title: 'Lakeview Luxury Condominiums', location: 'Burlington, Ontario', units: 280, status: 'Under Construction', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80' },
  { slug: 'aurora-hills-community', title: 'Aurora Hills Community', location: 'Edmonton, Alberta', units: 200, status: 'Pre-Construction', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Our Developments</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Featured <span className="gradient-gold">Projects</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover premium residential communities across Canada, meticulously designed and crafted by Maple Crest Developments.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (<ProjectCard key={project.slug} project={project} index={index} />))}
          </div>
        </div>
      </section>
    </main>
  );
}
