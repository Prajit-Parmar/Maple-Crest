'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Sarah & Michael Thompson',
    role: 'Homeowners, Maple Heights',
    content: 'Maple Crest built our dream home. The attention to detail and quality of craftsmanship exceeded our expectations. From the first consultation to the final walkthrough, their team was professional and transparent.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
  },
  {
    name: 'David Chen',
    role: 'Investor, Toronto',
    content: 'As a real estate investor, I have worked with many developers. Maple Crest stands out for their timely delivery, superior construction quality, and excellent after-sales service. Highly recommended.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    name: 'Emily & James Wilson',
    role: 'Residents, Northern Pines',
    content: 'The community Maple Crest created is incredible. The parks, the walking trails, and the sense of community are beyond what we imagined. Our home is beautifully designed and energy-efficient.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dark-2" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our{' '}
            <span className="gradient-gold">Residents</span> Say
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 md:p-12 text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-gold/30"
                    style={{ backgroundImage: `url(${testimonials[current].image})` }}
                  />
                  <div className="text-left">
                    <p className="font-bold text-white">{testimonials[current].name}</p>
                    <p className="text-sm text-gold">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold hover:bg-gold/20 transition-all cursor-pointer"
            >
              <HiChevronLeft size={20} />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === current ? 'bg-gold w-6' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold hover:bg-gold/20 transition-all cursor-pointer"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
