'use client'

import Link from 'next/link'
import { HiMapPin, HiPhone, HiEnvelope } from 'react-icons/hi2'

export default function Footer() {
  return (
    <footer className="bg-dark-2 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold gradient-gold font-serif mb-4">Maple Crest</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building Canada&apos;s future, one community at a time. Premium residential, commercial and mixed-use developments across Canada.
            </p>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/projects', label: 'Our Projects' },
                { href: '/buy', label: 'Buy a Property' },
                { href: '/rent', label: 'Rent a Property' },
                { href: '/viewing', label: 'Book a Viewing' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-400 hover:text-gold transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <HiMapPin className="text-gold mt-1 shrink-0" size={16} />
                <p className="text-gray-400 text-sm">120 King Street West<br />Suite 1800<br />Toronto, Ontario, Canada</p>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="text-gold shrink-0" size={16} />
                <a href="tel:+14165558900" className="text-gray-400 hover:text-gold transition-colors text-sm">(416) 555-8900</a>
              </div>
              <div className="flex items-center gap-3">
                <HiEnvelope className="text-gold shrink-0" size={16} />
                <a href="mailto:info@maplecrestdevelopments.ca" className="text-gray-400 hover:text-gold transition-colors text-sm">info@maplecrestdevelopments.ca</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest projects and community news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-dark border border-gold/20 rounded-l px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold"
              />
              <button className="bg-gold text-dark font-semibold px-4 py-2 rounded-r text-sm hover:bg-gold-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Maple Crest Developments. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gold text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gold text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
