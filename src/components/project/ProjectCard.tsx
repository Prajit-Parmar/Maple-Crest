'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiLocationMarker, HiHome } from 'react-icons/hi';

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    location: string;
    units: number;
    status: string;
    image: string;
  };
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    'Pre-Construction': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'Under Construction': 'bg-gold/20 text-gold border border-gold/30',
    Completed: 'bg-green-500/20 text-green-400 border border-green-500/30',
    'Coming Soon': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="glass rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 h-full">
          <div className="relative h-64 overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[project.status] || statusColors['Coming Soon']}`}>
                {project.status}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors mb-3">
              {project.title}
            </h3>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <HiLocationMarker className="w-4 h-4 mr-1 text-gold" />
              {project.location}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <HiHome className="w-4 h-4 mr-1 text-gold" />
              {project.units} Units
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
