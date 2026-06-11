'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { HiLocationMarker, HiHome, HiUser, HiCalendar, HiCheck, HiX as HiXIcon } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';

const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false });

const rentalData: Record<string, any> = {
  r1: { title: 'Modern 2 Bedroom Suite', address: '1450 Maple Ridge Dr, Mississauga', price: 2800, bedrooms: 2, bathrooms: 2, parking: 1, sqft: 1050, availability: '2026-07-01', project: 'Maple Heights Community', description: 'Beautifully appointed 2-bedroom suite in the heart of Maple Heights Community. Features an open-concept layout with modern kitchen, stainless steel appliances, in-suite laundry, and a private balcony with community views.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', furnished: true, petFriendly: true, utilitiesIncluded: true, lat: 43.5890, lng: -79.6441 },
  r2: { title: 'Luxury 3 Bedroom Townhome', address: '785 Evergreen Tr, Calgary', price: 3500, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1500, availability: '2026-06-15', project: 'Northern Pines Estates', description: 'Stunning 3-bedroom townhome in prestigious Northern Pines Estates. Features premium hardwood floors, gourmet kitchen with quartz countertops, private backyard, and attached double garage.', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', furnished: false, petFriendly: true, utilitiesIncluded: false, lat: 50.9423, lng: -114.1033 },
  r3: { title: 'Stunning 1 Bedroom Condo', address: '222 Riverfront Blvd, Ottawa', price: 2200, bedrooms: 1, bathrooms: 1, parking: 1, sqft: 650, availability: '2026-08-01', project: 'Riverstone Residences', description: 'Modern 1-bedroom condo with breathtaking river views. Floor-to-ceiling windows, European kitchen, in-suite laundry, and access to world-class amenities including pool and fitness center.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', furnished: true, petFriendly: false, utilitiesIncluded: true, lat: 45.4215, lng: -75.6993 },
  r4: { title: 'Spacious 2 Bedroom Townhome', address: '114 Cedar Park Ln, London', price: 2400, bedrooms: 2, bathrooms: 1.5, parking: 1, sqft: 1100, availability: '2026-06-01', project: 'Cedar Grove Townhomes', description: 'Charming 2-bedroom townhome in family-friendly Cedar Grove. Open living area, updated kitchen, private patio, and close to parks, schools, and shopping.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', furnished: false, petFriendly: true, utilitiesIncluded: false, lat: 43.0108, lng: -81.2720 },
  r5: { title: 'Lakeview 2 Bedroom Suite', address: '95 Lakeshore Ave, Burlington', price: 3200, bedrooms: 2, bathrooms: 2, parking: 2, sqft: 950, availability: '2026-09-01', project: 'Lakeview Luxury Condominiums', description: 'Luxurious 2-bedroom suite with panoramic Lake Ontario views. Premium finishes, chef-inspired kitchen, spa-like bathroom, and building amenities including rooftop pool and marina access.', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80', furnished: true, petFriendly: false, utilitiesIncluded: true, lat: 43.3255, lng: -79.7990 },
  r6: { title: 'Eco-Friendly 3 Bedroom Home', address: '401 Aurora Cres, Edmonton', price: 2700, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1600, availability: '2026-07-15', project: 'Aurora Hills Community', description: 'Energy-efficient 3-bedroom home in Edmonton\'s premier sustainable community. Solar-ready, smart home technology, electric vehicle charger, and access to community gardens and green spaces.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', furnished: false, petFriendly: true, utilitiesIncluded: false, lat: 53.5362, lng: -113.6274 },
  r7: { title: 'Premium 3 Bedroom Suite', address: '1450 Maple Ridge Dr, Mississauga', price: 3600, bedrooms: 3, bathrooms: 2.5, parking: 2, sqft: 1450, availability: '2026-08-15', project: 'Maple Heights Community', description: 'Premium 3-bedroom suite with spacious living areas, gourmet kitchen, and large private terrace. Located in the heart of Maple Heights with access to all community amenities.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', furnished: false, petFriendly: true, utilitiesIncluded: true, lat: 43.5890, lng: -79.6441 },
  r8: { title: 'Executive Penthouse Suite', address: '95 Lakeshore Ave, Burlington', price: 5500, bedrooms: 3, bathrooms: 3, parking: 2, sqft: 2000, availability: '2026-10-01', project: 'Lakeview Luxury Condominiums', description: 'Magnificent penthouse suite with 360-degree views of Lake Ontario and the Burlington skyline. Designer finishes, private rooftop terrace, and exclusive access to penthouse lounge.', image: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae40?w=1200&q=80', furnished: true, petFriendly: false, utilitiesIncluded: true, lat: 43.3255, lng: -79.7990 },
};

export default function RentalDetailPage() {
  const params = useParams();
  const rental = rentalData[params.id as string];

  if (!rental) {
    return (<main className="min-h-screen pt-24 flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Property Not Found</h1><Button href="/rent">Back to Rentals</Button></div></main>);
  }

  return (
    <main className="min-h-screen pt-24">
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
                <div className="h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${rental.image})` }} />
              </motion.div>
            </div>
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <p className="text-3xl font-bold text-gold">${rental.price.toLocaleString()}<span className="text-sm text-gray-400 font-normal">/month</span></p>
                  <h1 className="text-2xl font-bold mt-2">{rental.title}</h1>
                  <p className="text-gray-400 flex items-center mt-2"><HiLocationMarker className="w-4 h-4 mr-1 text-gold" />{rental.address}</p>
                  <p className="text-sm text-gold mt-1">{rental.project}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: HiHome, label: 'Bedrooms', value: rental.bedrooms },
                    { icon: HiUser, label: 'Bathrooms', value: rental.bathrooms },
                    { icon: HiHome, label: 'SQFT', value: rental.sqft.toLocaleString() },
                    { icon: HiCalendar, label: 'Available', value: new Date(rental.availability).toLocaleDateString() },
                  ].map((s) => (<div key={s.label} className="glass rounded-xl p-3 text-center"><s.icon className="w-5 h-5 text-gold mx-auto mb-1" /><p className="text-lg font-bold">{s.value}</p><p className="text-xs text-gray-400">{s.label}</p></div>))}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-400">Parking</span><span className="text-white font-medium">{rental.parking}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-400">Furnished</span>{rental.furnished ? <HiCheck className="text-green-400" /> : <HiXIcon className="text-red-400" />}</div>
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-400">Pet Friendly</span>{rental.petFriendly ? <HiCheck className="text-green-400" /> : <HiXIcon className="text-red-400" />}</div>
                  <div className="flex items-center justify-between text-sm"><span className="text-gray-400">Utilities Included</span>{rental.utilitiesIncluded ? <HiCheck className="text-green-400" /> : <HiXIcon className="text-red-400" />}</div>
                </div>
                <div className="space-y-3">
                  <Button href="/viewing" variant="primary" className="w-full">Schedule Viewing</Button>
                  <Button href={`/buy?project=${encodeURIComponent(rental.project)}`} variant="outline" className="w-full">Inquire About This Property</Button>
                </div>
              </motion.div>
            </div>
          </div>
          <AnimatedSection className="mt-8">
            <div className="glass rounded-2xl p-6 max-w-3xl"><h2 className="text-xl font-bold text-gold mb-4">About This Property</h2><p className="text-gray-400 leading-relaxed">{rental.description}</p></div>
          </AnimatedSection>
          <AnimatedSection className="mt-8">
            <div className="glass rounded-2xl p-6 max-w-3xl">
              <h2 className="text-xl font-bold text-gold mb-4">Location</h2>
              <p className="text-gray-400 text-sm mb-4">{rental.address}</p>
              <div className="h-64 rounded-lg overflow-hidden">
                <MapView
                  markers={[{ lat: rental.lat, lng: rental.lng, title: rental.title, subtitle: rental.address }]}
                  zoom={14}
                  height="256px"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
