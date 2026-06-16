import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import projectRoutes from './routes/projects'
import rentalRoutes from './routes/rentals'
import leadRoutes from './routes/leads'
import viewingRoutes from './routes/viewings'
import contactRoutes from './routes/contact'
import statsRoutes from './routes/stats'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/rentals', rentalRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/viewings', viewingRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/stats', statsRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
