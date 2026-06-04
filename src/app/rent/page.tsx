'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiLocationMarker, HiHome, HiUser, HiCalendar, HiSearch } from 'react-icons/hi';

const rentalData = [
  { id: 'r1', title: 'Modern 2 Bedroom Suite', address: '1450 Maple Ridge Dr, Mississauga', price: 2800, bedrooms: 2, bathrooms: 2, parking: 1, sqft: 1050, availability: '2026-07-01', project: 'Maple Heights Community', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { id: 'r2', title: 'Luxury 3 Bedroom Townhome', address: '785 Evergreen Tr, Calgary', price: 3500, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1500, availability: '2026-06-15', project: 'Northern Pines Estates', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80' },
  { id: 'r3', title: 'Stunning 1 Bedroom Condo', address: '222 Riverfront Blvd, Ottawa', price: 2200, bedrooms: 1, bathrooms: 1, parking: 1, sqft: 650, availability: '2026-08-01', project: 'Riverstone Residences', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80' },
  { id: 'r4', title: 'Spacious 2 Bedroom Townhome', address: '114 Cedar Park Ln, London', price: 2400, bedrooms: 2, bathrooms: 1.5, parking: 1, sqft: 1100, availability: '2026-06-01', project: 'Cedar Grove Townhomes', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80' },
  { id: 'r5', title: 'Lakeview 2 Bedroom Suite', address: '95 Lakeshore Ave, Burlington', price: 3200, bedrooms: 2, bathrooms: 2, parking: 2, sqft: 950, availability: '2026-09-01', project: 'Lakeview Luxury Condominiums', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80' },
  { id: 'r6', title: 'Eco-Friendly 3 Bedroom Home', address: '401 Aurora Cres, Edmonton', price: 2700, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1600, availability: '2026-07-15', project: 'Aurora Hills Community', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80' },
  { id: 'r7', title: 'Premium 3 Bedroom Suite', address: '1450 Maple Ridge Dr, Mississauga', price: 3600, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1450, availability: '2026-08-15', project: 'Maple Heights Community', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { id: 'r8', title: 'Executive Penthouse Suite', address: '95 Lakeshore Ave, Burlington', price: 5500, bedrooms: 3, bathrooms: 3, parking: 2, sqft: 2000, availability: '2026-10-01', project: 'Lakeview Luxury Condominiums', image: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae40?w=600&q=80' },
];

const bedroomFilters = ['Any', '1', '2', '3', '4+'];
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

export default function RentPage() {
  const [search, setSearch] = useState('');
  const [bedFilter, setBedFilter] = useState('Any');
  const [sort, setSort] = useState('price-asc');

  const filtered = rentalData
    .filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.address.toLowerCase().includes(search.toLowerCase()) || r.project.toLowerCase().includes(search.toLowerCase());
      const matchesBed = bedFilter === 'Any' ? true : bedFilter === '4+' ? r.bedrooms >= 4 : r.bedrooms === parseInt(bedFilter);
      return matchesSearch && matchesBed;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return new Date(b.availability).getTime() - new Date(a.availability).getTime();
    });

  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-2 block">Rental Properties</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your <span className="gradient-gold">Rental</span></h1>
          </motion.div>
          <div className="max-w-6xl mx-auto">
            <div className="glass rounded-2xl p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-dark-3 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>
                <div className="flex gap-2">{bedroomFilters.map((b) => (<button key={b} onClick={() => setBedFilter(b)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${bedFilter === b ? 'bg-gold text-dark' : 'bg-dark-3 text-gray-400 hover:text-gold border border-gray-700'}`}>{b} {b === 'Any' ? '' : 'Bed'}</button>))}</div>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-3 bg-dark-3 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold">{sortOptions.map((o) => (<option key={o.value} value={o.value} className="bg-dark-3">{o.label}</option>))}</select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((rental, index) => (
                <motion.div key={rental.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <Link href={`/rent/${rental.id}`} className="group block">
                    <div className="glass rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-500 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${rental.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3"><span className="px-3 py-1 text-xs font-semibold bg-gold/20 text-gold border border-gold/30 rounded-full">${rental.price.toLocaleString()}/mo</span></div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors mb-2">{rental.title}</h3>
                        <p className="text-sm text-gray-400 flex items-center mb-3"><HiLocationMarker className="w-4 h-4 mr-1 text-gold shrink-0" />{rental.address}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-3">
                          <span className="flex items-center"><HiHome className="w-3 h-3 mr-1 text-gold" />{rental.bedrooms} Bed</span>
                          <span className="flex items-center"><HiUser className="w-3 h-3 mr-1 text-gold" />{rental.bathrooms} Bath</span>
                          <span className="flex items-center"><HiCalendar className="w-3 h-3 mr-1 text-gold" />{new Date(rental.availability).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
