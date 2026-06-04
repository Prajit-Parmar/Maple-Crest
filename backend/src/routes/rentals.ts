import { Router, Request, Response } from 'express'

const router = Router()

const rentals = [
  { id: 'r1', title: 'Modern 2BR Apartment - Maple Heights', price: 2200, bedrooms: 2, bathrooms: 1, city: 'Mississauga', province: 'ON' },
  { id: 'r2', title: 'Executive 3BR Townhome - Riverstone', price: 3200, bedrooms: 3, bathrooms: 2.5, city: 'Ottawa', province: 'ON' },
  { id: 'r3', title: 'Luxury 1BR Condo - Lakeview', price: 2600, bedrooms: 1, bathrooms: 1, city: 'Burlington', province: 'ON' },
  { id: 'r4', title: 'Family 4BR Home - Cedar Grove', price: 2800, bedrooms: 4, bathrooms: 3, city: 'London', province: 'ON' },
  { id: 'r5', title: '3BR Mountain View Home - Northern Pines', price: 3500, bedrooms: 3, bathrooms: 2.5, city: 'Calgary', province: 'AB' },
  { id: 'r6', title: '2BR Townhome - Aurora Hills', price: 1800, bedrooms: 2, bathrooms: 1.5, city: 'Edmonton', province: 'AB' },
]

router.get('/', (_req: Request, res: Response) => {
  res.json(rentals)
})

router.get('/:id', (req: Request, res: Response) => {
  const rental = rentals.find((r) => r.id === req.params.id)
  if (!rental) return res.status(404).json({ error: 'Rental not found' })
  res.json(rental)
})

export default router
