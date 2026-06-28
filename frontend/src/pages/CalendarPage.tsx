import { useState, useEffect, useCallback } from 'react'
import { notesService } from '../services/notesService'
import type { DailyNote, MonthSummary } from '../types/notes'
import '../styles/calendar.css'
import { Link } from 'react-router-dom'

const MOODS = [
  { value: 1, emoji: '🍂', label: 'Horribly' },
  { value: 2, emoji: '🥀', label: 'Bad' },
  { value: 3, emoji: '🌷', label: 'Ok' },
  { value: 4, emoji: '🪷', label: 'Good' },
  { value: 5, emoji: '💐', label: 'Exceptional' },
]

const toDateString = (d: Date) => d.toISOString().split('T')[0]

const getDaysInMonth = (year: number, month: number) => {
  const days = []
  const firstDay = new Date(year, month - 1, 1).getDay()
  const totalDays = new Date(year, month, 0).getDate()
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= totalDays; i++) days.push(i)
  return days
}

export default function CalendarPage() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(toDateString(today))
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [note, setNote] = useState<DailyNote | null>(null)
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(3)
  const [monthSummary, setMonthSummary] = useState<MonthSummary[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const loadMonthSummary = useCallback(async () => {
    try {
      const data = await notesService.getByMonth(currentYear, currentMonth)
      setMonthSummary(data)
    } catch (e) {
    }
  }, [currentYear, currentMonth])

  const loadNote = useCallback(async () => {
    try {
      const data = await notesService.getByDate(selectedDate)
      setNote(data)
      setContent(data?.content ?? '')
      setMood(data?.mood ?? 3)
      setSaved(false)
    } catch (e) {
    }
  }, [selectedDate])
  useEffect(() => { loadMonthSummary() }, [loadMonthSummary])
  useEffect(() => { loadNote() }, [loadNote])

  const handleSave = async () => {
    if (!content.trim()) return
    setSaving(true)
    try {
      const updated = await notesService.save(selectedDate, content, mood)
      setNote(updated)
      setSaved(true)
      loadMonthSummary()
    } finally {
      setSaving(false)
    }
  }

  const getMoodForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return monthSummary.find(n => n.date === dateStr)?.mood
  }

  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(dateStr)
  }

  const prevMonth = () => {
    if (currentMonth === 1) { setCurrentMonth(12); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 12) { setCurrentMonth(1); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString('en', { month: 'long' })
  const days = getDaysInMonth(currentYear, currentMonth)
  const isToday = (day: number) => toDateString(today) === `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const isSelected = (day: number) => selectedDate === `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  return (
    <div className="calendar-page">
      <h2 className="calendar-title">Diaryᝰ🖊</h2>
      <Link to="/dashboard" className="home-btn" aria-label="Home">
        🏠︎
      </Link>
      
      <div className="calendar-layout">

        <div className="mini-calendar">
          <div className="cal-nav">
            <button onClick={prevMonth}>‹</button>
            <span>{monthName} {currentYear}</span>
            <button onClick={nextMonth}>›</button>
          </div>

          <div className="cal-grid">
            {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(d => (
              <div key={d} className="cal-weekday">{d}</div>
            ))}
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />
              const moodVal = getMoodForDate(day)
              const moodEmoji = moodVal ? MOODS[moodVal - 1].emoji : ''
              return (
                <button
                  key={day}
                  className={`cal-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="cal-day-num">{day}</span>
                  {moodEmoji && <span className="cal-mood-dot">{moodEmoji}</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="note-panel">
          <h3 className="note-date">
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', {
              weekday: 'long', day: 'numeric', month: 'long'
            })}
          </h3>

          <div className="mood-selector">
            <p>How do you feel today?</p>
            <div className="mood-options">
              {MOODS.map(m => (
                <button
                  key={m.value}
                  className={`mood-btn ${mood === m.value ? 'active' : ''}`}
                  onClick={() => setMood(m.value)}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
            <p className="mood-label">{MOODS[mood - 1].label}</p>
          </div>

          <textarea
            className="note-textarea"
            placeholder="How was your day? How did you feel?..."
            value={content}
            onChange={e => { setContent(e.target.value); setSaved(false) }}
          />

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving || !content.trim()}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save note'}
          </button>
        </div>
      </div>
    </div>
  )
}