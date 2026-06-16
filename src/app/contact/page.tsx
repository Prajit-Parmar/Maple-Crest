'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Input, { TextArea } from '@/components/ui/Input';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { submitContactForm } from '@/lib/api';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
    } catch { setErrors({ form: 'Something went wrong.' }); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}><HiCheckCircle className="w-20 h-20 text-gold mx-auto mb-6" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">Message Sent!</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-8">Thank you for reaching out. Our team will respond within 24 hours.</motion.p>
          <Button href="/">Return Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Get In Touch</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact <span className="gradient-gold">Us</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">We&apos;d love to hear from you. Reach out to discuss your next project.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                  {errors.form && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{errors.form}</div>}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="name" name="name" label="Full Name" placeholder="John Smith" value={formData.name} onChange={handleChange} error={errors.name} />
                    <Input id="email" name="email" type="email" label="Email Address" placeholder="john@example.com" value={formData.email} onChange={handleChange} error={errors.email} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="phone" name="phone" type="tel" label="Phone Number" placeholder="(416) 555-0123" value={formData.phone} onChange={handleChange} />
                    <Input id="subject" name="subject" label="Subject" placeholder="How can we help?" value={formData.subject} onChange={handleChange} error={errors.subject} />
                  </div>
                  <TextArea id="message" name="message" label="Message" placeholder="Tell us about your project..." rows={5} value={formData.message} onChange={handleChange} error={errors.message} />
                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
                </form>
              </AnimatedSection>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection delay={0.1} direction="right">
                <div className="glass rounded-2xl p-6 space-y-6">
                  <h3 className="text-xl font-bold text-gold">Head Office</h3>
                  <div className="space-y-4">
                    {[
                      { icon: HiLocationMarker, label: 'Address', value: '120 King Street West\nSuite 1800\nToronto, Ontario\nCanada' },
                      { icon: HiPhone, label: 'Phone', value: '(416) 555-8900' },
                      { icon: HiMail, label: 'Email', value: 'info@maplecrestdevelopments.ca' },
                      { icon: HiClock, label: 'Hours', value: 'Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM' },
                    ].map((item) => (<div key={item.label} className="flex space-x-3"><item.icon className="w-5 h-5 text-gold mt-1 shrink-0" /><div><p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p><p className="text-sm text-gray-300 whitespace-pre-line">{item.value}</p></div></div>))}
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div className="glass rounded-2xl overflow-hidden h-[250px]">
                  <MapView
                    markers={[{ lat: 43.6489, lng: -79.3805, title: 'Maple Crest Developments', subtitle: '120 King Street West, Toronto' }]}
                    zoom={15}
                    height="250px"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
