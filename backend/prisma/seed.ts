import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 10);

  await prisma.adminUser.upsert({
    where: { email: 'admin@maplecrestdevelopments.ca' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@maplecrestdevelopments.ca',
      passwordHash: adminPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created');

  const projectData = [
    {
      slug: 'maple-heights-community',
      title: 'Maple Heights Community',
      tagline: 'Modern Living in the Heart of Mississauga',
      description: 'A master-planned community featuring modern detached homes, semi-detached homes, and townhouses.',
      longDescription: 'Maple Heights Community represents the pinnacle of modern suburban living in Mississauga. This master-planned development spans over 50 acres and features a harmonious blend of architectural styles.',
      address: '1450 Maple Ridge Drive',
      city: 'Mississauga',
      province: 'Ontario',
      postalCode: 'L4W 1A5',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
      ],
      units: 245,
      status: 'Under Construction',
      completionDate: '2027',
      amenities: ['Rooftop Terrace', 'Fitness Center', 'Yoga Studio', 'Children\'s Play Area', 'Pet Spa', 'Visitor Parking', 'Bike Storage', '24/7 Concierge'],
      schools: ['Maple Ridge Public School', 'St. Joseph\'s Secondary School', 'University of Toronto Mississauga'],
      shopping: ['Square One Shopping Centre', 'Heartland Town Centre', 'Dixie Outlet Mall'],
      transit: ['Mississauga Transitway', 'Hurontario LRT', 'GO Transit - Cooksville Station'],
      features: ['Floor-to-ceiling windows', 'European-inspired kitchens', 'In-suite laundry', 'Balcony/terrace', 'Smart home technology', 'Energy-efficient appliances'],
      lat: 43.5890,
      lng: -79.6441,
      type: 'Condominium',
    },
    {
      slug: 'northern-pines-estates',
      title: 'Northern Pines Estates',
      tagline: 'Luxury Townhomes in Calgary\'s Prestigious Northwest',
      description: '180 executive townhomes in a serene natural setting.',
      longDescription: 'Northern Pines Estates is an exclusive collection of 180 executive townhomes nestled against the natural beauty of Calgary\'s northwest.',
      address: '785 Evergreen Trail',
      city: 'Calgary',
      province: 'Alberta',
      postalCode: 'T3R 1K5',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      units: 180,
      status: 'Completed',
      completionDate: '2025',
      amenities: ['Clubhouse', 'Swimming Pool', 'Fitness Center', 'Tennis Courts', 'Walking Trails', 'Playground', 'Visitor Parking'],
      schools: ['Evergreen Elementary School', 'Robert Thirsk High School', 'University of Calgary'],
      shopping: ['Market Mall', 'Beacon Hill Shopping Centre', 'Crowfoot Crossing'],
      transit: ['Calgary Transit Route 20', 'Crowfoot C-Train Station', 'Stoney Trail'],
      features: ['Private yard', 'Attached garage', 'Hardwood floors', 'Granite countertops', 'Gas fireplace', 'Central air conditioning'],
      lat: 51.1083,
      lng: -114.2185,
      type: 'Townhome',
    },
    {
      slug: 'riverstone-residences',
      title: 'Riverstone Residences',
      tagline: 'Waterfront Living in Ottawa\'s ByWard District',
      description: 'A striking 320-unit condominium tower on the Ottawa River.',
      longDescription: 'Riverstone Residences redefines urban luxury with its stunning 35-story tower overlooking the Ottawa River.',
      address: '222 Riverfront Boulevard',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: 'K1P 1A1',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
      ],
      units: 320,
      status: 'Pre-Construction',
      completionDate: '2028',
      amenities: ['Rooftop Infinity Pool', 'Private Cinema', 'Wine Cellar', 'Fitness Center & Spa', 'Rooftop Garden', 'Pet Grooming', 'Guest Suites', '24/7 Concierge'],
      schools: ['Lisgar Collegiate Institute', 'University of Ottawa', 'Carleton University'],
      shopping: ['ByWard Market', 'Rideau Centre', 'Sparks Street'],
      transit: ['OC Transpo', 'Rideau LRT Station', 'Ottawa Station (VIA Rail)'],
      features: ['Waterfront views', 'Floor-to-ceiling windows', 'Miele appliances', 'Smart home automation', 'Engineered hardwood floors', 'Heated bathroom floors'],
      lat: 45.4215,
      lng: -75.6972,
      type: 'Condominium',
    },
    {
      slug: 'cedar-grove-townhomes',
      title: 'Cedar Grove Townhomes',
      tagline: 'Family Living in London\'s Most Desirable Neighborhood',
      description: '120 charming townhomes designed for growing families.',
      longDescription: 'Cedar Grove Townhomes offers 120 beautifully designed family homes in London\'s most sought-after community.',
      address: '114 Cedar Park Lane',
      city: 'London',
      province: 'Ontario',
      postalCode: 'N6G 4K2',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      ],
      units: 120,
      status: 'Coming Soon',
      completionDate: '2027',
      amenities: ['Central Park', 'Playground', 'Walking Trails', 'Community Garden', 'Visitor Parking'],
      schools: ['Cedar Park Public School', 'A.B. Lucas Secondary School', 'Western University'],
      shopping: ['Masonville Place', 'London Shopping Centre', 'Cherryhill Village Mall'],
      transit: ['London Transit Route 13', 'London Transit Route 27', 'VIA Rail London Station'],
      features: ['Private fenced yard', 'Attached garage', 'Open-concept layout', 'Modern kitchen', 'Hardwood flooring', 'Energy Star certified'],
      lat: 43.0195,
      lng: -81.2826,
      type: 'Townhome',
    },
    {
      slug: 'lakeview-luxury-condominiums',
      title: 'Lakeview Luxury Condominiums',
      tagline: 'Premium Lake Ontario Living in Burlington',
      description: '280 exclusive condominium suites with panoramic lake views.',
      longDescription: 'Lakeview Luxury Condominiums stands as a landmark of sophisticated living on Burlington\'s prestigious lakefront.',
      address: '95 Lakeshore Avenue',
      city: 'Burlington',
      province: 'Ontario',
      postalCode: 'L7R 1A1',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18f6bae40?w=1200&q=80',
      ],
      units: 280,
      status: 'Under Construction',
      completionDate: '2027',
      amenities: ['Rooftop Pool & Lounge', 'Full-service Spa', 'Private Dining Room', 'Marina with Boat Slips', 'Wine Tasting Room', 'Library', 'Fitness Center', 'Yoga Studio'],
      schools: ['Nelson High School', 'Burlington Central High School', 'McMaster University'],
      shopping: ['Mapleview Shopping Centre', 'Burlington Downtown', 'Appleby Place'],
      transit: ['Burlington GO Station', 'Appleby GO Station', 'Burlington Transit'],
      features: ['Panoramic lake views', 'Italian marble flooring', 'Sub-zero appliances', 'Custom millwork', 'Smart home integration', 'Private balcony'],
      lat: 43.3255,
      lng: -79.7990,
      type: 'Condominium',
    },
    {
      slug: 'aurora-hills-community',
      title: 'Aurora Hills Community',
      tagline: 'Sustainable Living in Edmonton\'s Brightest New Community',
      description: '200 eco-conscious homes in a master-planned community.',
      longDescription: 'Aurora Hills Community is Edmonton\'s premier sustainable residential development, featuring 200 eco-conscious homes built to the highest environmental standards.',
      address: '401 Aurora Crescent',
      city: 'Edmonton',
      province: 'Alberta',
      postalCode: 'T5T 6K1',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      ],
      units: 200,
      status: 'Pre-Construction',
      completionDate: '2028',
      amenities: ['Community Gardens', 'Electric Vehicle Charging', 'Solar-Ready Infrastructure', 'Walking & Biking Trails', 'Natural Playground', 'Community Pavilion', 'Greenhouse'],
      schools: ['Aurora Elementary School', 'West Edmonton High School', 'University of Alberta'],
      shopping: ['West Edmonton Mall', 'South Edmonton Common', 'Mayfield Common'],
      transit: ['Edmonton Transit Route 4', 'Edmonton Transit Route 106', 'West Edmonton Transit Centre'],
      features: ['Solar-ready', 'Smart home technology', 'EV charger pre-wiring', 'Energy Star appliances', 'Triple-pane windows', 'Rainwater harvesting system'],
      lat: 53.5461,
      lng: -113.6207,
      type: 'Townhome',
    },
  ];

  for (const project of projectData) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  console.log('Projects seeded');
  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
