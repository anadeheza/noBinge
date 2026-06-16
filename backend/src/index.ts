import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import notesRoutes from './routes/notes.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`)
})