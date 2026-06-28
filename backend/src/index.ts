import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.routes'
import notesRoutes from './routes/notes.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(staticPath, 'index.html'))
  } else {
    res.status(404).json({ error: 'Not Found' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})