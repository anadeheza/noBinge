import { Router } from "express";
import { upsertNote, getNoteByDate, getNotesByMonth } from "../controllers/notes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.use(authMiddleware)

router.post('/', upsertNote)
router.get('/date/:date', getNoteByDate)
router.get('/month/:year/:month', getNotesByMonth)

export default router