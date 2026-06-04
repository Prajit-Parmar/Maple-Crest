import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export default function statsRoutes(prisma: PrismaClient) {
  const router = Router();

  router.get('/', async (_req, res) => {
    try {
      const [totalProjects, totalLeads, totalViewings, totalRentals] = await Promise.all([
        prisma.project.count(),
        prisma.lead.count(),
        prisma.viewingRequest.count(),
        prisma.rentalProperty.count(),
      ]);

      res.json({ totalProjects, totalLeads, totalViewings, totalRentals });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch stats' });
    }
  });

  return router;
}
