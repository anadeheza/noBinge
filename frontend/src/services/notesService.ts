import { api } from "./api";
import type { DailyNote, MonthSummary } from "../types/notes";

export const notesService = {
    getByDate: (date: string): Promise<DailyNote | null> =>
        api.get(`/notes/date/${date}`),

    getByMonth: (year: number, month: number): Promise<MonthSummary[]> => 
        api.get(`/notes/month/${year}/${month}`),

    save: (date: string, content: string, mood: number): Promise<DailyNote> =>
        api.post('/notes', { date, content, mood }, true),
}
