'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChat, HiX } from 'react-icons/hi'

interface Message {
  text: string
  isUser: boolean
}

const quickReplies = [
  'Tell me about your projects',
  'What floor plans are available?',
  'I want to schedule a viewing',
  'How can I contact you?',
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Welcome to Maple Crest Developments! I\'m Maple Assistant. How can I help you today?', isUser: false },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text: string) => {
    const message = text || input
    if (!message.trim()) return
    setInput('')
    setMessages((prev) => [...prev, { text: message, isUser: true }])
    setLoading(true)

    const lower = message.toLowerCase()
    let reply = 'I\'m Maple Assistant, your virtual guide. I can help with information about our projects, floor plans, pricing, and scheduling viewings. What would you like to know?'
    if (lower.includes('project') || lower.includes('community')) reply = 'We have 6 premium communities across Canada: Maple Heights (Mississauga), Northern Pines Estates (Calgary), Riverstone Residences (Ottawa), Cedar Grove Townhomes (London), Lakeview Luxury Condominiums (Burlington), and Aurora Hills Community (Edmonton). Which interests you?'
    else if (lower.includes('floor') || lower.includes('plan')) reply = 'Our floor plans range from 1-bedroom condos to 4-bedroom executive homes, featuring open-concept layouts and premium finishes. You can view them on each project\'s detail page.'
    else if (lower.includes('viewing') || lower.includes('tour') || lower.includes('schedule')) reply = 'I\'d be happy to help you schedule a viewing! Please visit our Book A Viewing page at /viewing to select your preferred date and time.'
    else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('address')) reply = 'You can reach us at (416) 555-8900 or email info@maplecrestdevelopments.ca. Our head office is at 120 King Street West, Suite 1800, Toronto, Ontario.'
    else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) reply = 'Our property prices vary by location, size, and type. Please visit our Buy page or contact our sales team for personalized pricing information.'
    else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) reply = 'Hello! Welcome to Maple Crest Developments. How can I assist you today?'

    await new Promise((r) => setTimeout(r, 500))
    setMessages((prev) => [...prev, { text: reply, isUser: false }])
    setLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-50 bg-gold text-dark p-4 rounded-full shadow-lg shadow-gold/30 hover:bg-gold-light transition-all duration-300"
        aria-label="Chat with Maple Assistant"
      >
        {open ? <HiX size={24} /> : <HiChat size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-50 w-80 sm:w-96 glass border border-gold/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-gold/20 to-gold/5 p-4 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Maple Assistant</h3>
                  <p className="text-gray-400 text-xs">Online</p>
                </div>
              </div>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.isUser
                      ? 'bg-gold text-dark rounded-br-none'
                      : 'bg-dark-3 text-gray-200 rounded-bl-none border border-gold/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-dark-3 border border-gold/10 p-3 rounded-xl rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gold/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="text-xs px-3 py-1 rounded-full bg-dark-3 border border-gold/10 text-gray-400 hover:text-gold hover:border-gold/30 transition-all"
                  >
                    {qr}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-dark border border-gold/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 bg-gold text-dark rounded-lg font-medium text-sm hover:bg-gold-light transition-all disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
