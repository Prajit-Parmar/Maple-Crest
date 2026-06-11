'use client'

import Link from 'next/link'
import { HiMapPin, HiPhone, HiEnvelope } from 'react-icons/hi2'

export default function Footer() {
  return (
    <footer className="bg-dark-2 border-t-2 border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-primary -rotate-12" />
              <h3 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>Maple Crest</h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Building Canada&apos;s future, one community at a time. Premium residential, commercial and mixed-use developments across Canada.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b-2 border-primary pb-2">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/projects', label: 'Our Projects' },
                { href: '/buy', label: 'Buy a Property' },
                { href: '/rent', label: 'Rent a Property' },
                { href: '/viewing', label: 'Book a Viewing' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b-2 border-primary pb-2">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-primary/10 border border-primary">
                  <HiMapPin className="text-primary shrink-0" size={14} />
                </div>
                <p className="text-gray-500 text-sm">120 King Street West<br />Suite 1800<br />Toronto, Ontario, Canada</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-primary/10 border border-primary">
                  <HiPhone className="text-primary shrink-0" size={14} />
                </div>
                <a href="tel:+14165558900" className="text-gray-500 hover:text-primary transition-colors text-sm">(416) 555-8900</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center bg-primary/10 border border-primary">
                  <HiEnvelope className="text-primary shrink-0" size={14} />
                </div>
                <a href="mailto:info@maplecrestdevelopments.ca" className="text-gray-500 hover:text-primary transition-colors text-sm">info@maplecrestdevelopments.ca</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b-2 border-primary pb-2">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Stay updated with our latest projects and community news.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Your email" className="w-full bg-dark border-2 border-gray-700 px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
              <button className="bg-primary text-white font-bold px-4 py-2.5 text-sm uppercase tracking-wider hover:bg-primary-dark transition-colors border-2 border-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-amber-600/30 bg-amber-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
          <p className="text-amber-600/60 text-xs font-medium">
            🎓 Portfolio / Demo Project — This is not a real real estate company.
            All content is fictional and created for demonstration purposes only.
          </p>
        </div>
      </div>

      <div className="border-t-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm font-medium">
            &copy; {new Date().getFullYear()} Maple Crest Developments (Portfolio).
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
