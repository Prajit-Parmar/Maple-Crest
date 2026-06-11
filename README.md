# Maple Crest Developments

**Premium Residential, Commercial and Mixed-Use Developments Across Canada** — a full-stack web application for a Canadian real estate development company.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, TypeScript, Tailwind CSS v4 |
| **Maps** | Leaflet, react-leaflet (OpenStreetMap tiles) |
| **Animation** | Framer Motion |
| **3D** | Three.js / React Three Fiber |
| **Backend** | Express.js (Next.js API routes + standalone backend) |
| **Database** | PostgreSQL + Prisma ORM |
| **Auth** | JWT + bcryptjs |
| **Containerization** | Docker + Docker Compose |

## Features

### Public Pages
- **Home** — Hero section, animated stats, featured projects, community map, testimonials
- **Projects** — 6 residential communities across Ontario and Alberta with detailed pages
- **Rent** — Browse & filter rental properties with detailed listings
- **Buy** — Purchase inquiry form
- **Book Viewing** — Multi-step scheduling form
- **About** — Company story, team, values, sustainability
- **Contact** — Contact form with interactive map

### Map Integration
- **Interactive Community Map** on the homepage showing all project locations with popups
- **Location maps** on each project detail page
- **Location maps** on each rental property page
- **Office location map** on the contact page
- Uses **Leaflet** with **OpenStreetMap** tiles (free, no API key required)
- Custom-styled map markers matching the brand's gold theme

### Admin Dashboard
- Secure login with JWT authentication
- Stats overview (leads, viewings, purchases)
- Leads management table
- Viewings management
- Projects and rentals management

### Other Features
- Responsive dark theme with glassmorphism UI
- Animated counters and scroll-triggered animations
- Floating chatbot assistant ("Maple Assistant")
- SEO-friendly with dynamic sitemap and robots.txt
- Docker Compose for full-stack deployment

## Getting Started

### Prerequisites
- Node.js >= 20
- Docker (optional, for PostgreSQL + backend)

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### Development

```bash
# Start the Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker (Full Stack)

```bash
docker-compose up --build
```

This starts:
- Frontend on port 3000
- Backend API on port 5000
- PostgreSQL on port 5432

### Backend Setup (Standalone)

```bash
cd backend
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Homepage
│   ├── projects/       # Project listing & details
│   ├── rent/           # Rental listings & details
│   ├── buy/            # Purchase inquiry
│   ├── viewing/        # Booking form
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── admin/          # Admin dashboard
│   └── api/            # API routes
├── components/
│   ├── home/           # Homepage components (Hero, CommunityMap, etc.)
│   ├── map/            # Leaflet map component
│   ├── layout/         # Navbar, Footer
│   ├── project/        # Project-related components
│   ├── ui/             # Reusable UI components
│   └── chatbot/        # Chatbot component
├── lib/                # Utilities, data, API helpers
└── types/              # TypeScript interfaces
```

## License

Private — Maple Crest Developments
