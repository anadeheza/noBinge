import type { Response } from 'express'
import type { AuthRequest } from '../middlewares/auth.middleware'
import prisma from '../lib/prisma'

export const upsertNote = async (req: AuthRequest, res: Response): Promise<void> => {
  const { date, content, mood } = req.body

  if (!date || !content || mood === undefined) {
    res.status(400).json({ error: 'Complete all fields!' })
    return
  }

  try {
    const note = await prisma.dailyNote.upsert({
      where: { userId_date: { userId: req.userId!, date } },
      update: { content, mood },
      create: { userId: req.userId!, date, content, mood },
    })
    res.json(note)
  } catch {
    res.status(500).json({ error: 'Server error :(' })
  }
}

export const getNoteByDate = async (req: AuthRequest, res: Response): Promise<void> => {
  const date = req.params.date as string

  try {
    const note = await prisma.dailyNote.findUnique({
      where: { userId_date: { userId: req.userId!, date } },
    })
    res.json(note ?? null)
  } catch {
    res.status(500).json({ error: 'Server error :(' })
  }
}

export const getNotesByMonth = async (req: AuthRequest, res: Response): Promise<void> => {
  const year = req.params.year as string
  const month = req.params.month as string
  const prefix = `${year}-${month.padStart(2, '0')}`

  try {
    const notes = await prisma.dailyNote.findMany({
      where: {
        userId: req.userId!,
        date: { startsWith: prefix },
      },
      select: { date: true, mood: true },
    })
    res.json(notes)
  } catch {
    res.status(500).json({ error: 'Server error :(' })
  }
}