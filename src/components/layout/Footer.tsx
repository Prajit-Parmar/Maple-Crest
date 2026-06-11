'use client'

import Link from 'next/link'
import { HiMapPin, HiPhone, HiEnvelope } from 'react-icons/hi2'

export default function Footer() {
  return (
    <footer className="bg-dark text-white border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-source-code)' }}>
              🍁 Maple Crest
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building Canada&apos;s future, one community at a time. Premium residential, commercial and mixed-use developments across Canada.
            </p>
          </div>

          <div>
            <h4 className="text-primary font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/projects', label: 'Our Projects' },
                { href: '/buy', label: 'Buy a Property' },
                { href: '/rent', label: 'Rent a Property' },
                { href: '/viewing', label: 'Book a Viewing' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-300 hover:text-primary transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-semibold mb-4 uppercase tracking-wider text-sm">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <HiMapPin className="text-primary mt-1 shrink-0" size={16} />
                <p className="text-gray-300 text-sm">120 King Street West<br />Suite 1800<br />Toronto, Ontario, Canada</p>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="text-primary shrink-0" size={16} />
                <a href="tel:+14165558900" className="text-gray-300 hover:text-primary transition-colors text-sm">(416) 555-8900</a>
              </div>
              <div className="flex items-center gap-3">
                <HiEnvelope className="text-primary shrink-0" size={16} />
                <a href="mailto:info@maplecrestdevelopments.ca" className="text-gray-300 hover:text-primary transition-colors text-sm">info@maplecrestdevelopments.ca</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-primary font-semibold mb-4 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">Stay updated with our latest projects and community news.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 bg-dark-2 border border-primary/30 rounded-l px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
              <button className="bg-primary text-white font-semibold px-5 py-2.5 rounded-r text-sm hover:bg-primary-dark transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
          <p className="text-primary/80 text-xs font-medium">
            🎓 Portfolio / Demo Project — This is not a real real estate company.
            All content is fictional and created for demonstration purposes only.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Maple Crest Developments (Portfolio).
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
