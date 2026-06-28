import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.routes'
import notesRoutes from './routes/notes.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const allowedOrigins = [
  'http://localhost:5173', 
  'https://no-binge.vercel.app' 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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