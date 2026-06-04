'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import ProjectCard from '@/components/project/ProjectCard'

const projects = [
  { slug: 'maple-heights-community', title: 'Maple Heights Community', location: 'Mississauga, Ontario', units: 245, status: 'Under Construction', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { slug: 'northern-pines-estates', title: 'Northern Pines Estates', location: 'Calgary, Alberta', units: 180, status: 'Completed', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80' },
  { slug: 'riverstone-residences', title: 'Riverstone Residences', location: 'Ottawa, Ontario', units: 320, status: 'Pre-Construction', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
];

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3)

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          subtitle="Discover our premier communities across Canada, each designed with exceptional craftsmanship and attention to detail."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-block px-8 py-4 border border-gold/50 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all duration-300"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
