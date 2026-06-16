'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiCalendar, HiClock } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Input, { TextArea, Select } from '@/components/ui/Input';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { submitViewing } from '@/lib/api';

const projects = [
  { value: 'maple-heights-community', label: 'Maple Heights Community - Mississauga, ON' },
  { value: 'northern-pines-estates', label: 'Northern Pines Estates - Calgary, AB' },
  { value: 'riverstone-residences', label: 'Riverstone Residences - Ottawa, ON' },
  { value: 'cedar-grove-townhomes', label: 'Cedar Grove Townhomes - London, ON' },
  { value: 'lakeview-luxury-condominiums', label: 'Lakeview Luxury Condos - Burlington, ON' },
  { value: 'aurora-hills-community', label: 'Aurora Hills Community - Edmonton, AB' },
];

const timeSlots = [
  { value: '9:00', label: '9:00 AM' }, { value: '10:00', label: '10:00 AM' }, { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' }, { value: '13:00', label: '1:00 PM' }, { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' }, { value: '16:00', label: '4:00 PM' }, { value: '17:00', label: '5:00 PM' },
];

export default function ViewingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '', preferredDate: '', preferredTime: '', notes: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    if (!formData.project) errs.project = 'Please select a project';
    if (!formData.preferredDate) errs.preferredDate = 'Please select a date';
    if (!formData.preferredTime) errs.preferredTime = 'Please select a time';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await submitViewing(formData);
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
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">Viewing Request Confirmed!</motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 mb-8 text-left space-y-2">
            <p className="text-gray-300"><span className="text-gold font-medium">Project:</span> {projects.find(p => p.value === formData.project)?.label}</p>
            <p className="text-gray-300"><span className="text-gold font-medium">Date:</span> {new Date(formData.preferredDate).toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-gray-300"><span className="text-gold font-medium">Time:</span> {timeSlots.find(t => t.value === formData.preferredTime)?.label}</p>
          </motion.div>
          <Button href="/">Return Home</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Schedule a Visit</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Book a <span className="gradient-gold">Viewing</span></h1>
            <p className="text-gray-400">Tour our properties and experience luxury living firsthand.</p>
          </motion.div>
          <div className="flex justify-center mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-gold text-dark' : 'glass text-gray-400'}`}>{s}</div>
                {s < 2 && <div className={`w-16 h-1 ${step > s ? 'bg-gold' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              {errors.form && <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{errors.form}</div>}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h2 className="text-xl font-bold text-gold flex items-center"><HiCalendar className="mr-2" /> Select Project & Schedule</h2>
                    <Select id="project" name="project" label="Select Project" placeholder="Choose a project to visit" options={projects} value={formData.project} onChange={handleChange} error={errors.project} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input id="preferredDate" name="preferredDate" type="date" label="Preferred Date" min={today} value={formData.preferredDate} onChange={handleChange} error={errors.preferredDate} />
                      <Select id="preferredTime" name="preferredTime" label="Preferred Time" placeholder="Select a time" options={timeSlots} value={formData.preferredTime} onChange={handleChange} error={errors.preferredTime} />
                    </div>
                    <div className="flex justify-end"><button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-gold text-dark font-semibold rounded-xl hover:bg-gold-light transition-all cursor-pointer">Next Step</button></div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h2 className="text-xl font-bold text-gold flex items-center"><HiClock className="mr-2" /> Your Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input id="name" name="name" label="Full Name" placeholder="John Smith" value={formData.name} onChange={handleChange} error={errors.name} />
                      <Input id="email" name="email" type="email" label="Email Address" placeholder="john@example.com" value={formData.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <Input id="phone" name="phone" type="tel" label="Phone Number" placeholder="(416) 555-0123" value={formData.phone} onChange={handleChange} error={errors.phone} />
                    <TextArea id="notes" name="notes" label="Additional Notes (Optional)" placeholder="Any specific requirements or questions..." rows={3} value={formData.notes} onChange={handleChange} />
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="px-6 py-3 glass text-gray-300 font-semibold rounded-xl hover:text-gold transition-all cursor-pointer">Back</button>
                      <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={loading}>{loading ? 'Submitting...' : 'Confirm Booking'}</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
