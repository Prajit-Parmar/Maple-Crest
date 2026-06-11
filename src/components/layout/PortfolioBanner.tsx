'use client'

import { useState, useEffect } from 'react'
import { HiX } from 'react-icons/hi'

export default function PortfolioBanner() {
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-banner-dismissed')
    if (stored === 'true') setDismissed(true)
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`relative z-50 bg-amber-600 text-amber-50 text-center text-xs sm:text-sm font-medium px-4 py-2.5 transition-all duration-500 ${
        visible ? 'opacity-100 max-h-12' : 'opacity-0 max-h-0 py-0 overflow-hidden'
      }`}
    >
      <span>🎓 Portfolio / Demo Project — Not a real real estate company.</span>
      <span className="hidden sm:inline"> Inquiries go to the developer&apos;s personal email for portfolio purposes.</span>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(() => {
            setDismissed(true)
            localStorage.setItem('portfolio-banner-dismissed', 'true')
          }, 500)
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-amber-700/50 transition-colors"
        aria-label="Dismiss banner"
      >
        <HiX size={16} />
      </button>
    </div>
  )
}
