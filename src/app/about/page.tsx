'use client';

import { motion } from 'framer-motion';
import { HiUserGroup, HiShieldCheck, HiLightBulb, HiGlobe } from 'react-icons/hi';
import AnimatedSection from '@/components/ui/AnimatedSection';

const teamMembers = [
  { name: 'Robert Mitchell', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Jennifer Walsh', role: 'Chief Operating Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
  { name: 'Michael Chen', role: 'VP of Construction', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Sarah Thompson', role: 'Chief Architect', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
  { name: 'David Kumar', role: 'Head of Urban Planning', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Lisa Martineau', role: 'Director of Sustainability', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

const workforceStats = [
  { label: 'Licensed Contractors', value: '200+', icon: HiShieldCheck },
  { label: 'Skilled Tradespeople', value: '500+', icon: HiUserGroup },
  { label: 'Maintenance Teams', value: '50+', icon: HiLightBulb },
  { label: 'Safety Specialists', value: '30+', icon: HiGlobe },
];

const values = [
  { title: 'Innovation', description: 'We embrace cutting-edge construction technologies and smart home innovations to create communities of the future.' },
  { title: 'Sustainability', description: 'Our commitment to green building practices ensures energy-efficient homes and environmentally responsible developments.' },
  { title: 'Craftsmanship', description: 'Every detail matters. Our dedication to quality craftsmanship is evident in every project we deliver.' },
  { title: 'Community', description: 'We build more than homes — we build thriving communities where families can grow and flourish.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">About Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Building Canada&apos;s <span className="gradient-gold">Future</span></h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">Maple Crest Developments has been shaping Canadian communities through innovative construction, sustainable development, and exceptional craftsmanship.</p>
          </motion.div>

          <AnimatedSection>
            <div className="glass rounded-2xl p-8 md:p-12 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-400 leading-relaxed">
                    <p>Founded in 2009, Maple Crest Developments began with a simple vision: to create exceptional communities that enhance the lives of Canadians. Over the past 15 years, we have grown from a small local builder into one of Canada&apos;s most respected development companies.</p>
                    <p>With projects spanning from British Columbia to Nova Scotia, our portfolio includes master-planned communities, luxury condominiums, townhomes, and commercial developments. Each project reflects our unwavering commitment to quality, innovation, and sustainability.</p>
                    <p>Today, Maple Crest Developments employs over 800 professionals, including architects, engineers, urban planners, and skilled tradespeople, all dedicated to building Canada&apos;s future, one community at a time.</p>
                  </div>
                </div>
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white"><p className="text-2xl font-bold">15+</p><p className="text-sm text-gold">Years of Excellence</p></div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl font-bold text-center mb-12">Our <span className="gradient-gold">Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-2xl p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-16 h-16 rounded-xl gradient-gold flex items-center justify-center mx-auto mb-4">
                    {i === 0 && <HiLightBulb className="w-8 h-8 text-dark" />}{i === 1 && <HiGlobe className="w-8 h-8 text-dark" />}{i === 2 && <HiShieldCheck className="w-8 h-8 text-dark" />}{i === 3 && <HiUserGroup className="w-8 h-8 text-dark" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-center mb-12">Engineering <span className="gradient-gold">Excellence</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
              {teamMembers.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="glass rounded-2xl p-4 text-center hover:border-gold/30 transition-all group">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-cover bg-center border-2 border-gold/30 group-hover:border-gold transition-all" style={{ backgroundImage: `url(${member.image})` }} />
                  <h3 className="text-sm font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-gold">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-3xl font-bold text-center mb-12">Our <span className="gradient-gold">Workforce</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {workforceStats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass rounded-2xl p-6 text-center">
                  <stat.icon className="w-10 h-10 text-gold mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="glass rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Commitment to <span className="gradient-gold">Sustainability</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Green Building Practices', desc: 'We use environmentally responsible materials, reduce construction waste, and implement sustainable building practices across all our projects.', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80' },
                  { title: 'Energy Efficient Homes', desc: 'Our homes feature high-performance insulation, energy-efficient windows, smart thermostats, and ENERGY STAR certified appliances.', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80' },
                  { title: 'Smart Community Planning', desc: 'We design walkable neighborhoods with green spaces, bike lanes, and access to public transit to reduce carbon footprints.', image: 'https://images.unsplash.com/photo-1578996952316-1e47bc48ceda?w=400&q=80' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                    <div className="h-48 rounded-xl bg-cover bg-center mb-4" style={{ backgroundImage: `url(${item.image})` }} />
                    <h3 className="text-xl font-bold text-gold mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
