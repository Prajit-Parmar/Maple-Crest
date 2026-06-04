'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Input, { TextArea, Select } from '@/components/ui/Input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const projects = [
  { value: 'maple-heights-community', label: 'Maple Heights Community' },
  { value: 'northern-pines-estates', label: 'Northern Pines Estates' },
  { value: 'riverstone-residences', label: 'Riverstone Residences' },
  { value: 'cedar-grove-townhomes', label: 'Cedar Grove Townhomes' },
  { value: 'lakeview-luxury-condominiums', label: 'Lakeview Luxury Condominiums' },
  { value: 'aurora-hills-community', label: 'Aurora Hills Community' },
  { value: 'not-sure', label: 'Not Sure Yet' },
];

const budgets = [
  { value: 'under-500k', label: 'Under $500,000' },
  { value: '500k-750k', label: '$500,000 - $750,000' },
  { value: '750k-1m', label: '$750,000 - $1,000,000' },
  { value: '1m-1.5m', label: '$1,000,000 - $1,500,000' },
  { value: '1.5m-2m', label: '$1,500,000 - $2,000,000' },
  { value: 'over-2m', label: 'Over $2,000,000' },
];

const propertyTypes = [
  { value: 'detached-home', label: 'Detached Home' },
  { value: 'semi-detached', label: 'Semi-Detached Home' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'condominium', label: 'Condominium' },
  { value: 'multi-family', label: 'Multi-Family' },
  { value: 'investment', label: 'Investment Property' },
];

export default function BuyPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '', budget: '', propertyType: '', moveInDate: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, type: 'purchase' }) });
      setSubmitted(true);
    } catch { setErrors({ form: 'Something went wrong.' }); }
    finally { setLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}><HiCheckCircle className="w-20 h-20 text-gold mx-auto mb-6" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">Thank You!</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-8">Your consultation request has been received. One of our property advisors will contact you within 24 hours.</motion.p>
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
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Purchase a Property</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your <span className="gradient-gold">Dream Home</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto">Fill out the form below and one of our property consultants will help you find the perfect home.</p>
          </motion.div>
          <AnimatedSection className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              {errors.form && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{errors.form}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input id="name" name="name" label="Full Name" placeholder="John Smith" value={formData.name} onChange={handleChange} error={errors.name} />
                <Input id="email" name="email" type="email" label="Email Address" placeholder="john@example.com" value={formData.email} onChange={handleChange} error={errors.email} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input id="phone" name="phone" type="tel" label="Phone Number" placeholder="(416) 555-0123" value={formData.phone} onChange={handleChange} error={errors.phone} />
                <Select id="project" name="project" label="Preferred Project" placeholder="Select a project" options={projects} value={formData.project} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select id="budget" name="budget" label="Budget Range" placeholder="Select your budget" options={budgets} value={formData.budget} onChange={handleChange} />
                <Select id="propertyType" name="propertyType" label="Property Type" placeholder="Select property type" options={propertyTypes} value={formData.propertyType} onChange={handleChange} />
              </div>
              <Input id="moveInDate" name="moveInDate" type="date" label="Preferred Move-In Date" value={formData.moveInDate} onChange={handleChange} />
              <TextArea id="notes" name="notes" label="Additional Notes" placeholder="Tell us about your requirements..." rows={4} value={formData.notes} onChange={handleChange} />
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? 'Submitting...' : 'Request Property Consultation'}</Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
