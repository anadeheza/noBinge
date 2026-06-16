export type DailyNote = {
    id: number
    date: string
    content: string
    mood: number
    createdAt: string 
}

export type MonthSummary = {
    date: string
    mood: number
}