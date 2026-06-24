# Maple Crest Developments

> **Fictional portfolio project. All company, listing, project, resident, and property data is simulated.**

A fictional Canadian real-estate developer portfolio site built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Designed to demonstrate modern web stack skills, responsive component architecture, and customer-facing UX design for a premium brand context.

**Live site:** https://prajit-parmar.github.io/Maple-Crest/

---

## Why I Built This

Real-estate developer websites have clear UX goals: communicate premium brand positioning, surface project inventory clearly, and guide visitors from browsing to booking. I wanted to practice those conversion-focused design patterns using a modern React stack while building something polished enough to serve as a portfolio showcase.

---

## Tech Decisions

| Choice | Reason |
|---|---|
| **Next.js (App Router)** | File-based routing, static export for GitHub Pages, React Server Components |
| **TypeScript** | Type-safe component props and data models throughout |
| **Tailwind CSS** | Rapid utility-first styling with consistent design tokens |
| **Framer Motion** | Smooth page transitions, scroll-triggered reveals, and hover interactions |
| **React components** | Reusable, composable UI pieces across listings, cards, and layout sections |

---

## Key Features

- **Community listings** — simulated residential and mixed-use development projects with status badges (Under Construction, Completed, Pre-Construction)
- **Project discovery pages** — individual project detail pages with descriptions, features, and location context
- **Booking and inquiry flows** — visitor-facing forms for scheduling viewings and contacting the sales team
- **Responsive design system** — mobile-first layouts that scale cleanly from 375px to 1440px
- **Framer Motion animations** — scroll-triggered section reveals, card hover states, and page transitions
- **Consistent brand language** — typography scale, colour system, and spacing tokens applied across all pages

---

## Component Architecture

```
app/
  layout.tsx         # Root layout, nav, footer
  page.tsx           # Homepage: hero, featured developments, CTA
  developments/      # Community listings index and detail pages
  contact/           # Inquiry and booking forms
components/
  ui/                # Base components: Button, Card, Badge, Input
  sections/          # Page sections: Hero, ProjectGrid, ContactForm
  layout/            # Nav, Footer, PageWrapper
```

---

## Responsive Design Approach

Built mobile-first with Tailwind's responsive prefix system:

- **375px** — single-column stacked layout, touch-friendly tap targets
- **768px** — two-column project grid, side-by-side hero layout
- **1024px** — full nav, three-column grids, expanded feature sections
- **1440px** — max-width container with generous whitespace

Animations respect `prefers-reduced-motion` — transitions are disabled for users who request it.

---

## What Is Simulated

All data in this project is fictional:

- Company name, logo, and brand identity — invented for the project
- Community names, locations, and project descriptions — entirely made up
- Pricing, availability, and sales status — fictional demo data
- Contact form submissions — not delivered to a real team

---

## What I Would Do Differently

- Add a CMS (Sanity or Contentful) to manage development listings without code changes
- Implement real form delivery via Resend or Formspree for contact and booking flows
- Add end-to-end tests for inquiry and booking flows
- Add proper SEO metadata per development page

---

## Project Context

Built as a portfolio project to demonstrate Next.js, TypeScript, and Tailwind CSS in a real-estate UX context. Focus was on visual polish, responsive component architecture, and conversion-focused information structure.

**Stack:** Next.js · React · TypeScript · Tailwind CSS · Framer Motion
